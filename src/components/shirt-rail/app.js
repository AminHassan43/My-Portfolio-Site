import { kits, initialIndex, RACK_COLUMNS } from './kits.mjs';
import { placeRackPoster } from './dither-reveal.js';

// Mounts the rack inside `root` (an element holding shirtRailMarkup()).
// Every lookup and class stays inside root, so it can live in any page.
// Returns destroy(), which removes all listeners, frames and the WebGL scene.
export function mountShirtRail(root, {assetBase=import.meta.url}={}){
  const STIFF=.062, DAMP=.70, SW_STIFF=.15, SW_DAMP=.70, SW_GAIN=.4, SW_MAX=2.8;
  const rackRoom=root.querySelector('.rack-room');
  const strip=root.querySelector('.rack-strip');
  const buttons=[...strip.querySelectorAll('.kit')];
  const slots=[...strip.querySelectorAll('.slot')];
  const dialog=root.querySelector('dialog');
  const closeButton=dialog.querySelector('.close');
  const logoImage=dialog.querySelector('.dialog-logo');
  const logoFallback=dialog.querySelector('.dialog-logo-fallback');
  const clubText=dialog.querySelector('.dialog-club');
  const yearText=dialog.querySelector('#shirt-rail-year');
  const kitTypeText=dialog.querySelector('#shirt-rail-kit-type');
  const mobile=matchMedia('(max-width:679px)');
  const hover=matchMedia('(hover:hover)');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let selectedIndex=initialIndex, spreadIndex=null, liftedIndex=null, returnTarget=null, pointerInside=false;
  let rack3d=null, destroyed=false, rackReady=false;
  let frame=0, previousTime=0, accumulator=0, observer=null, resizeFrame=0, loadTimeout=0, visibleSlots=new Set();
  let logoGeneration=0, scrollCloseFrame=0, scrollCloseArmed=false;
  const cleanups=[];
  const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);cleanups.push(()=>target.removeEventListener(type,fn,options));};
  const states=buttons.map((button,i)=>({button,swingEl:button.querySelector('.swing'),hemEl:button.querySelector('.hem'),x:0,v:0,swing:((i*7%17)-8)/5,sv:0,hem:0,hv:0,idle:((i*7%17)-8)/5}));
  const rowFor=i=>Math.floor(i/RACK_COLUMNS);
  const columnFor=i=>i%RACK_COLUMNS;
  const targetFor=i=>{
    if(spreadIndex===null||rowFor(i)!==rowFor(spreadIndex)||i===spreadIndex)return 0;
    const distance=columnFor(i)-columnFor(spreadIndex);
    return Math.sign(distance)*34*Math.exp(-Math.abs(distance)*.42);
  };

  function writeState(s){
    s.button.style.transform=`translate3d(${s.x.toFixed(3)}px,0,0)`;
    s.swingEl.style.transform=`rotate(${s.swing.toFixed(3)}deg)`;
    if(s.hemEl)s.hemEl.style.transform=`rotate(${(s.hem-s.swing*.42).toFixed(3)}deg)`;
    else {const photo=s.button.querySelector('.garment>img');if(photo)photo.style.transform=`skewY(${(s.hem-s.swing*.42).toFixed(3)}deg)`;}
  }
  function applyReduced(){
    states.forEach((s,i)=>{s.x=targetFor(i);s.v=s.sv=s.hv=0;s.swing=s.idle;s.hem=s.swing*.42;writeState(s);});
    rack3d?.update(states);
  }
  function step(){
    let moving=false;
    states.forEach((s,i)=>{
      const oldVelocity=s.v;
      s.v=(s.v+(targetFor(i)-s.x)*STIFF)*DAMP;
      s.x+=s.v;
      const acceleration=s.v-oldVelocity;
      s.sv=(s.sv+(s.idle-s.swing)*SW_STIFF-acceleration*SW_GAIN)*SW_DAMP;
      s.swing+=s.sv;
      if(Math.abs(s.swing)>SW_MAX){s.swing=Math.sign(s.swing)*SW_MAX;s.sv*=.3;}
      // Slower fabric inertia: shoulders stay supported while the lower shell
      // follows the movement, passes through once, and gently comes to rest.
      s.hv=(s.hv+(s.swing*.5-s.hem)*.028-acceleration*.055)*.90;s.hem+=s.hv;
      if(Math.abs(s.hem)>3.2){s.hem=Math.sign(s.hem)*3.2;s.hv*=.3;}
      if(Math.abs(s.v)+Math.abs(targetFor(i)-s.x)+Math.abs(s.sv)+Math.abs(s.swing-s.idle)+Math.abs(s.hv)+Math.abs(s.hem-s.swing*.5)>.008)moving=true;
    });
    return moving;
  }
  function tick(time){
    if(reduced.matches){frame=0;return;}
    accumulator+=Math.min(time-(previousTime||time-16.667),50);previousTime=time;
    let moving=true;
    while(accumulator>=1000/60){moving=step();accumulator-=1000/60;}
    states.forEach(writeState);
    rack3d?.update(states);
    frame=moving?requestAnimationFrame(tick):0;
    if(!frame){previousTime=0;accumulator=0;}
  }
  function wake(){if(destroyed)return;if(reduced.matches){applyReduced();return;}if(!frame){previousTime=0;frame=requestAnimationFrame(tick);}}
  function select(index,{focus=false,center=false,spread=true}={}){
    index=Math.max(0,Math.min(kits.length-1,index));
    selectedIndex=index;
    if(spread)spreadIndex=index;
    buttons.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;button.style.zIndex=String(i===index?kits.length+1:i+1);});
    if(focus)buttons[index].focus({preventScroll:true});
    if(center&&mobile.matches)centerSlot(index);
    wake();
  }
  function neutralizeSpread(){spreadIndex=null;wake();}
  function centerSlot(index){const slot=slots[index];strip.scrollTo({left:slot.offsetLeft+slot.offsetWidth/2-strip.clientWidth/2,behavior:'instant'});}
  function notifyDialog(open){root.dispatchEvent(new CustomEvent('shirt-rail-dialog-change',{bubbles:true,detail:{open}}));}
  // The intro overlay waits on this before it will dismiss, so it has to fire on
  // every path that settles the rack, including the fallbacks. The flag covers the
  // overlay having not yet attached its listener when the rack settles early.
  function notifyRackReady(){window.shirtRailReady=true;document.dispatchEvent(new CustomEvent('shirt-rail-ready'));}
  function showLogo(kit){
    const generation=++logoGeneration;
    logoImage.hidden=true;
    logoFallback.hidden=false;
    logoFallback.textContent=kit.club
      .split(/[\s-]+/)
      .filter(Boolean)
      .map(word=>word[0])
      .join('')
      .slice(0,3)
      .toUpperCase();
    logoImage.removeAttribute('src');
    let source;
    try{
      source=new URL(kit.logo,new URL(assetBase,location.href));
      if(!['http:','https:'].includes(source.protocol))throw new Error('Unsupported logo URL');
    }catch{
      logoFallback.textContent='Logo unavailable';
      return;
    }
    logoImage.onload=()=>{
      if(generation!==logoGeneration)return;
      logoImage.hidden=false;
      logoFallback.hidden=true;
    };
    logoImage.onerror=()=>{
      if(generation!==logoGeneration)return;
      logoImage.hidden=true;
      logoFallback.hidden=false;
      logoFallback.textContent='Logo unavailable';
    };
    logoImage.src=source.href;
  }
  function lift(index){
    if(dialog.open)return;
    select(index);
    liftedIndex=index;returnTarget=buttons[index];returnTarget.classList.add('is-lifted');
    const kit=kits[index];
    showLogo(kit);
    clubText.textContent=kit.club;
    yearText.textContent=kit.year;
    kitTypeText.textContent=kit.kitType;
    dialog.showModal();document.body.style.overflow='hidden';notifyDialog(true);closeButton.focus();
    cancelAnimationFrame(scrollCloseFrame);
    scrollCloseArmed=false;
    scrollCloseFrame=requestAnimationFrame(()=>{scrollCloseArmed=dialog.open;});
    rack3d?.lifted(index,true);
  }
  function close(){if(dialog.open)dialog.close();}
  function closeOnScroll(){
    if(!dialog.open||!scrollCloseArmed)return;
    scrollCloseArmed=false;
    close();
  }
  listen(closeButton,'click',close);
  listen(window,'wheel',closeOnScroll,{capture:true,passive:true});
  listen(window,'touchmove',closeOnScroll,{capture:true,passive:true});
  listen(window,'scroll',closeOnScroll,{capture:true,passive:true});
  let backdropDown=false;
  listen(dialog,'pointerdown',event=>{backdropDown=event.target===dialog;});
  listen(dialog,'click',event=>{if(event.target===dialog&&backdropDown)close();});
  // Escape is handled here too: some embedded browsers skip the native cancel.
  listen(dialog,'keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();return;}if(event.key==='Tab'){const list=[...dialog.querySelectorAll('button:not([disabled])')];const first=list[0],last=list.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
  listen(dialog,'close',()=>{scrollCloseArmed=false;cancelAnimationFrame(scrollCloseFrame);document.body.style.overflow='';notifyDialog(false);if(liftedIndex!==null){buttons[liftedIndex].classList.remove('is-lifted');rack3d?.lifted(liftedIndex,false);}liftedIndex=null;if(!destroyed){returnTarget?.focus({preventScroll:true});if(!pointerInside&&hover.matches&&!mobile.matches)neutralizeSpread();}});
  buttons.forEach((button,index)=>{
    // Moving garments can enter a stationary pointer. Only actual pointer motion
    // changes hover selection, so it cannot steal selection from the keyboard.
    listen(button,'pointermove',event=>{if((event.movementX||event.movementY)&&hover.matches&&!mobile.matches&&event.pointerType!=='touch'&&!dialog.open&&(selectedIndex!==index||spreadIndex!==index))select(index);});
    listen(button,'focus',()=>{if(!dialog.open&&(selectedIndex!==index||spreadIndex!==index))select(index);});
    listen(button,'click',()=>lift(index));
  });
  listen(rackRoom,'pointerenter',()=>{pointerInside=true;});
  listen(rackRoom,'pointerleave',()=>{pointerInside=false;if(!dialog.open&&hover.matches&&!mobile.matches)neutralizeSpread();});
  listen(strip,'keydown',event=>{
    let next=selectedIndex;
    const row=rowFor(selectedIndex),column=columnFor(selectedIndex);
    if(event.key==='ArrowRight'&&column<RACK_COLUMNS-1)next++;
    else if(event.key==='ArrowLeft'&&column>0)next--;
    else if(event.key==='ArrowDown'&&selectedIndex+RACK_COLUMNS<kits.length)next+=RACK_COLUMNS;
    else if(event.key==='ArrowUp'&&selectedIndex-RACK_COLUMNS>=0)next-=RACK_COLUMNS;
    else if(event.key==='Home')next=row*RACK_COLUMNS;
    else if(event.key==='End')next=Math.min(kits.length-1,row*RACK_COLUMNS+RACK_COLUMNS-1);
    else return;
    event.preventDefault();select(next,{focus:true,center:true});
  });
  function observeCenter(){
    observer?.disconnect();observer=null;visibleSlots=new Set();
    if(!mobile.matches)return;
    centerSlot(selectedIndex);
    // Observe fixed slots, never the spring-translated buttons. The narrow central
    // band selects the closest shirt without any scroll listener or layout loop.
    const inset=Math.max(0,(strip.clientWidth-2)/2);
    observer=new IntersectionObserver(entries=>{
      if(dialog.open)return;
      entries.forEach(entry=>entry.isIntersecting?visibleSlots.add(entry.target):visibleSlots.delete(entry.target));
      const selectedRow=rowFor(selectedIndex);
      const candidates=[...visibleSlots].filter(slot=>rowFor(Number(slot.dataset.index))===selectedRow);
      if(!candidates.length)return;
      const center=strip.getBoundingClientRect().left+strip.clientWidth/2;
      const nearest=candidates.sort((a,b)=>Math.abs(a.getBoundingClientRect().left+a.getBoundingClientRect().width/2-center)-Math.abs(b.getBoundingClientRect().left+b.getBoundingClientRect().width/2-center))[0];
      const index=Number(nearest.dataset.index);
      if(index!==selectedIndex)select(index);
    },{root:strip,rootMargin:`0px -${inset}px 0px -${inset}px`,threshold:0});
    slots.forEach(slot=>observer.observe(slot));
  }
  const track=root.querySelector('.rack-track');
  const loaderEl=root.querySelector('.rack-loader');
  const poster=root.querySelector('.rack-poster');
  // The poster stands in for the rack canvas, so it uses the same geometry.
  function placePoster(){placeRackPoster(loaderEl,poster,track);}
  const resizeObserver=new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{observeCenter();placePoster();rack3d?.resize();rack3d?.update(states);});});
  resizeObserver.observe(strip);
  listen(mobile,'change',()=>{if(!mobile.matches)strip.scrollLeft=0;observeCenter();wake();});
  listen(reduced,'change',()=>{cancelAnimationFrame(frame);frame=0;wake();});
  listen(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;previousTime=0;accumulator=0;}else wake();});
  // Preserve the server-rendered still pose on load. Motion starts with input.
  if(reduced.matches)applyReduced();
  observeCenter();
  // The pre-rendered poster is the still loading state; WebGL remains hidden
  // until every texture has settled.
  placePoster();
  const showFallback=error=>{
    if(rackReady||destroyed)return;
    rackReady=true;clearTimeout(loadTimeout);
    if(error)console.warn('3D unavailable; showing the rack poster.',error);
    rack3d?.dispose();rack3d=null;
    root.classList.remove('is-loading','is-revealing','webgl-ready');
    root.classList.add('webgl-unavailable','is-loaded');
    notifyRackReady();
  };
  // Building the rack is one long synchronous task — 32 shirts, shader compiles
  // and texture uploads — so it waits until the dither is on screen. Started any
  // earlier it starves the compositor and the first frames never get presented.
  let buildStarted=false;
  function buildRack(){
    if(destroyed||rackReady||buildStarted)return;
    buildStarted=true;
    // The texture timeout only starts once the build does. Started alongside the
    // wait above it could expire first and latch the fallback, leaving a tab that
    // loaded in the background stuck on the poster even after it is focused.
    loadTimeout=window.setTimeout(()=>showFallback(new Error('Shirt textures timed out.')),60000);
    import('./rack-3d.js').then(({ShirtRack3D})=>{
      if(destroyed)return;
      rack3d=new ShirtRack3D(track,slots,assetBase,()=>{
        if(destroyed||rackReady)return;
        rackReady=true;clearTimeout(loadTimeout);
        rack3d?.update(states);
        root.classList.remove('is-loading','is-revealing','webgl-unavailable');
        root.classList.add('webgl-ready','is-loaded');
        if(dialog.open&&liftedIndex!==null)rack3d?.lifted(liftedIndex,true);
        notifyRackReady();
      });
      rack3d.update(states);
    }).catch(showFallback);
  }
  // Yield once after the dissolve's first frame so that paint is not immediately
  // pre-empted by shader compiles. The overlay no longer waits on the rack.
  function buildAfterIntroPaint(){
    const startBuild=()=>{
      if(destroyed||buildStarted)return;
      window.requestAnimationFrame(()=>{window.setTimeout(buildRack,120);});
    };
    if(!document.documentElement.classList.contains('intro-active')||window.introFirstFrame||document.hidden){
      startBuild();return;
    }
    const begin=()=>{
      document.removeEventListener('intro-first-frame',begin);
      document.removeEventListener('visibilitychange',onVisibility);
      startBuild();
    };
    const onVisibility=()=>{if(document.hidden)begin();};
    document.addEventListener('intro-first-frame',begin,{once:true});
    document.addEventListener('visibilitychange',onVisibility);
    cleanups.push(()=>{
      document.removeEventListener('intro-first-frame',begin);
      document.removeEventListener('visibilitychange',onVisibility);
    });
  }
  buildAfterIntroPaint();

  return function destroy(){
    if(destroyed)return;
    destroyed=true;
    notifyDialog(false);
    close();
    cancelAnimationFrame(frame);cancelAnimationFrame(resizeFrame);cancelAnimationFrame(scrollCloseFrame);frame=0;clearTimeout(loadTimeout);
    observer?.disconnect();resizeObserver.disconnect();
    cleanups.forEach(fn=>fn());
    logoGeneration++;
    logoImage.onload=null;
    logoImage.onerror=null;
    document.body.style.overflow='';
    rack3d?.dispose();rack3d=null;
    root.classList.remove('webgl-ready','webgl-unavailable');
  };
}
