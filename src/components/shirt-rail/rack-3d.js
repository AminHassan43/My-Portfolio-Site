import * as THREE from 'three';
import {kits,RACK_COLUMNS} from './kits.mjs';
import {makeShirt,makeHanger,makeRailHook,bendMaterial,RAIL_RADIUS,SHIRT_DROP} from './shirt-model.js';

const PX=86;
export class ShirtRack3D {
  constructor(track,slots,assetBase,onReady){
    this.track=track;this.slots=slots;this.assetBase=assetBase;this.onReady=onReady;
    this.rows=[...track.querySelectorAll('.rack-row')];this.mobile=matchMedia('(max-width:899px)');this.renderer=this.createRenderer();
    this.renderer.domElement.className='rack-canvas';this.renderer.domElement.setAttribute('aria-hidden','true');track.prepend(this.renderer.domElement);
    this.scene=this.sceneWithLight();this.camera=new THREE.OrthographicCamera(-8,8,2,-2,.1,80);this.camera.position.set(0,0,30);
    this.pendingTextures=kits.reduce((count,kit)=>count+Number(Boolean(kit.texture?.front))+Number(Boolean(kit.texture?.back)),0);
    this.readyScheduled=false;this.buildIndex=0;this.buildFrame=0;
    this.items=new Array(slots.length).fill(null);
    const steel=new THREE.MeshStandardMaterial({color:0x929b9a,metalness:.7,roughness:.28,transparent:true,depthWrite:false});
    this.railFade={value:.07};
    steel.onBeforeCompile=shader=>{
      shader.uniforms.railFade=this.railFade;
      shader.vertexShader='varying float railPosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nrailPosition=position.y;');
      shader.fragmentShader='varying float railPosition;\nuniform float railFade;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= railFade > 0.0 ? smoothstep(0.0,railFade,0.5-abs(railPosition)) : 1.0;');
    };
    steel.customProgramCacheKey=()=> 'rail-end-fade';
    this.rails=this.rows.map(()=>{
      const rail=new THREE.Mesh(new THREE.CylinderGeometry(RAIL_RADIUS,RAIL_RADIUS,1,32,1,this.mobile.matches),steel);
      rail.rotation.z=Math.PI/2;rail.castShadow=true;this.scene.add(rail);return rail;
    });
    this.floors=this.rows.map(()=>{
      const floor=new THREE.Mesh(new THREE.PlaneGeometry(60,30),new THREE.ShadowMaterial({opacity:.13}));
      floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;this.scene.add(floor);return floor;
    });
    this.width=0;this.height=0;this.resize();this.render();
    track.classList.add('is-3d');
    this.renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();track.classList.remove('is-3d');});
    this.renderer.domElement.addEventListener('webglcontextrestored',()=>{track.classList.add('is-3d');this.render();});
    this.buildFrame=requestAnimationFrame(()=>this.pumpBuild());
  }
  tryReady(){
    if(this.disposed||this.readyScheduled)return;
    if(this.buildIndex<this.slots.length||this.pendingTextures>0)return;
    this.readyScheduled=true;this.render();this.onReady?.(this.renderer.domElement);
  }
  textureSettled(){
    this.queueRender();this.pendingTextures=Math.max(0,this.pendingTextures-1);this.tryReady();
  }
  addShirt(i){
    const pivot=new THREE.Group(),yaw=new THREE.Group(),shirt=makeShirt(i,kits[i],()=>this.textureSettled(),this.assetBase),hanger=makeHanger(shirt.userData.width),hook=makeRailHook();
    yaw.rotation.y=THREE.MathUtils.degToRad((this.slots.length>24?-73:-63)+((i%RACK_COLUMNS)%5-2)*1.4);
    yaw.position.y=-SHIRT_DROP;pivot.add(yaw,hook);yaw.add(shirt,hanger);this.scene.add(pivot);
    const direction=new THREE.Vector2(Math.cos(yaw.rotation.y),Math.sin(yaw.rotation.y));
    const drapes=shirt.userData.materials.map(material=>bendMaterial(material,direction));
    shirt.userData.shell.customDepthMaterial=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,side:THREE.DoubleSide});
    drapes.push(bendMaterial(shirt.userData.shell.customDepthMaterial,direction));
    this.items[i]={pivot,yaw,shirt,hook,drapes,direction};
  }
  pumpBuild(){
    if(this.disposed)return;
    const end=Math.min(this.buildIndex+6,this.slots.length);
    for(;this.buildIndex<end;this.buildIndex++)this.addShirt(this.buildIndex);
    this.resize();this.render();
    if(this.buildIndex<this.slots.length)this.buildFrame=requestAnimationFrame(()=>this.pumpBuild());
    else this.tryReady();
  }
  createRenderer(){const r=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power',preserveDrawingBuffer:true});r.setPixelRatio(Math.min(devicePixelRatio,1.5));r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFShadowMap;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=.85;r.outputColorSpace=THREE.SRGBColorSpace;return r;}
  sceneWithLight(detail=false){const s=new THREE.Scene();s.add(new THREE.HemisphereLight(0xffffff,0x89918c,2.6));const key=new THREE.DirectionalLight(0xfffcf7,2.7);key.position.set(-5,8,7);key.castShadow=true;key.shadow.mapSize.set(1024,1024);const spread=detail?2.7:14;Object.assign(key.shadow.camera,{left:-spread,right:spread,top:detail?2.7:8,bottom:detail?-2.7:-8,near:.5,far:35});key.shadow.bias=-.0012;key.shadow.normalBias=.045;key.shadow.radius=4;s.add(key);const fill=new THREE.DirectionalLight(0xe7edff,.8);fill.position.set(7,2,-4);s.add(fill);return s;}
  resize(){
    this.width=this.track.clientWidth;this.height=this.track.clientHeight;
    const pad=matchMedia('(min-width:900px)').matches?42:0;
    this.renderer.domElement.style.left=`-${pad}px`;
    this.renderer.setSize(this.width+pad*2,this.height,false);
    this.renderer.domElement.style.width=`${this.width+pad*2}px`;this.renderer.domElement.style.height=`${this.height}px`;
    this.camera.left=-(this.width+pad*2)/(PX*2);this.camera.right=-this.camera.left;this.camera.top=this.height/(PX*2);this.camera.bottom=-this.camera.top;this.camera.updateProjectionMatrix();
    const rowWorld=this.rows.map((row,index)=>{
      const railY=this.camera.top-(row.offsetTop+32)/PX;
      if(this.mobile.matches){
        const firstRow=this.rows[0],lastRow=this.rows[this.rows.length-1];
        const start=firstRow.offsetLeft;
        const end=lastRow.offsetLeft+lastRow.offsetWidth;
        if(index===0){
          const centerX=(start+end)/2-this.width/2;
          const railLength=Math.max(1,end-start+48);
          const rail=this.rails[0];rail.visible=true;rail.position.set(centerX,railY,0);rail.scale.y=railLength/PX;
          const floor=this.floors[0];floor.visible=true;floor.position.set(centerX,railY-3.08,0);
        }else{
          this.rails[index].visible=false;
          this.floors[index].visible=false;
        }
        return railY;
      }
      const centerX=(row.offsetLeft+row.offsetWidth/2-this.width/2)/PX;
      const railLength=Math.max(1,row.offsetWidth-48);
      const rail=this.rails[index];rail.visible=true;rail.position.set(centerX,railY,0);rail.scale.y=railLength/PX;
      const floor=this.floors[index];floor.visible=true;floor.position.set(centerX,railY-3.08,0);
      return railY;
    });
    const shortestRail=this.mobile.matches
      ? Math.max(1,this.rows[this.rows.length-1].offsetLeft+this.rows[this.rows.length-1].offsetWidth-this.rows[0].offsetLeft)
      : Math.min(...this.rows.map(row=>Math.max(1,row.offsetWidth-48)));
    this.railFade.value=this.mobile.matches?0:Math.min(.2,72/shortestRail);
    this.items.forEach((item,i)=>{
      if(!item)return;
      const slot=this.slots[i],rowIndex=Number(slot.dataset.row),row=this.rows[rowIndex];
      item.yaw.scale.z=Math.min(1,Math.max(.4,slot.offsetWidth/30));
      item.direction.set(Math.cos(item.yaw.rotation.y),Math.sin(item.yaw.rotation.y)/item.yaw.scale.z);
      item.baseX=(row.offsetLeft+slot.offsetLeft+slot.offsetWidth/2-this.width/2)/PX;item.baseY=rowWorld[rowIndex];
      item.pivot.position.set(item.baseX,item.baseY,0);
    });
    this.render();
  }
  update(states){states.forEach((s,i)=>{const item=this.items[i];if(!item||item.baseX===undefined)return;item.pivot.position.x=item.baseX+s.x/PX;item.pivot.rotation.z=-THREE.MathUtils.degToRad(s.swing);item.drapes.forEach(d=>d.value=THREE.MathUtils.clamp((s.hem-s.swing*.42)*.13,-.24,.24));});this.render();}
  lifted(index,on){const item=this.items[index];if(!item)return;for(const mat of item.shirt.userData.materials){mat.transparent=on;mat.opacity=on?.18:1;mat.depthWrite=!on;}item.shirt.userData.meshes.forEach(m=>m.castShadow=!on);this.render();}
  queueRender(){if(this.textureFrame)return;this.textureFrame=requestAnimationFrame(()=>{this.textureFrame=null;this.render();});}
  render(){if(!this.disposed)this.renderer.render(this.scene,this.camera);}
  dispose(){
    this.disposed=true;cancelAnimationFrame(this.textureFrame);cancelAnimationFrame(this.buildFrame);this.textureFrame=null;this.buildFrame=0;
    const textures=new Set();
    this.scene.traverse(object=>{
      object.geometry?.dispose();
      for(const material of [object.material,object.customDepthMaterial].flat().filter(Boolean)){if(material.map)textures.add(material.map);material.dispose();}
    });
    textures.forEach(texture=>texture.dispose());
    this.renderer.dispose();this.renderer.forceContextLoss();
    this.renderer.domElement.remove();this.track.classList.remove('is-3d');
  }
}
