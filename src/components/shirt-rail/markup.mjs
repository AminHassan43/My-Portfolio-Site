// The rack and its selection summary as one HTML string. build.mjs writes it into
// the standalone page; the Next.js wrapper renders it server-side. Both then
// call mountShirtRail() on the .shirt-rail element.
import { kits, initialIndex, RACK_COLUMNS, RACK_ROWS, rackSVG, escapeHTML as esc } from './kits.mjs';

export function shirtRailMarkup(assetBase='/shirt-rail/'){
  const posterSrc = `${assetBase}rack-poster.webp`;
  const rows = Array.from({length:RACK_ROWS},(_,row)=>{
    const start=row*RACK_COLUMNS;
    const buttons=kits.slice(start,start+RACK_COLUMNS).map((k,column)=>{
      const i=start+column;
      return `<div class="slot" data-index="${i}" data-row="${row}" data-column="${column}"><button class="kit" type="button" role="option" aria-selected="${i===initialIndex}" aria-label="Shirt ${i+1}, ${esc(k.club)}, ${esc(k.season)}${k.player?`, ${esc(k.player)}, number ${k.number}`:''}" tabindex="${i===initialIndex?0:-1}" data-index="${i}" style="z-index:${i===initialIndex?kits.length+1:i+1}">${rackSVG(k,i)}</button></div>`;
    }).join('');
    return `<div class="rack-row" role="group" aria-label="${row===0?'Top':'Bottom'} rack row" data-row="${row}"><div class="rail" aria-hidden="true"><i></i><i></i></div>${buttons}</div>`;
  }).join('');
  return `<div class="shirt-rail is-loading" style="--kit-count:${kits.length};--rack-cols:${RACK_COLUMNS};--rack-rows:${RACK_ROWS}"><section class="rack-room" aria-label="Football shirt collection"><div class="rack-rod" aria-hidden="true"></div><div class="rack-strip" role="listbox" aria-label="Football shirt collection"><div class="rack-track">${rows}</div></div><div class="rack-loader" aria-hidden="true"><div class="rack-loader-pattern"></div><img class="rack-poster" src="${posterSrc}" alt="" decoding="async" fetchpriority="high"></div></section><div class="shirt-rail-details"><img class="shirt-rail-logo" src="${esc(assetBase+kits[initialIndex].logo)}" alt="" width="48" height="48" decoding="async"><div class="shirt-rail-details-text" aria-live="polite"><p class="shirt-rail-position">${initialIndex+1}/${kits.length}</p><p class="shirt-rail-summary"><strong class="shirt-rail-summary-club">${kits[initialIndex].club}</strong><span class="shirt-rail-summary-meta">${kits[initialIndex].kitType} - ${kits[initialIndex].year}</span></p></div><p class="shirt-rail-idle">Hover over a shirt to see details</p></div></div>`;
}
