// Geometry shared by the static loading poster and the live WebGL rack.
// The former dither reveal was removed; the page-level dissolve now owns the
// loading transition.

// The rack canvas spans the track plus a symmetric pad, and the loader covers
// the whole rack room. Offset math keeps this correct under the 0.9 hero scale.
export function rackRect(loader, track) {
  const pad = matchMedia("(min-width:900px)").matches ? 42 : 0;
  const origin = loader.offsetParent;
  let x = 0;
  let y = 0;

  for (let node = track; node && node !== origin; node = node.offsetParent) {
    x += node.offsetLeft - node.scrollLeft;
    y += node.offsetTop - node.scrollTop;
  }

  return {
    x: x - pad,
    y,
    width: Math.max(1, track.offsetWidth + pad * 2),
    height: Math.max(1, track.offsetHeight),
  };
}

// While WebGL and its textures load, the finished poster occupies exactly the
// same box. It also remains the permanent fallback when WebGL is unavailable.
export function placeRackPoster(loader, poster, track) {
  if (!loader || !poster || !track) {
    return;
  }

  const rect = rackRect(loader, track);
  poster.style.left = `${rect.x}px`;
  poster.style.top = `${rect.y}px`;
  poster.style.width = `${rect.width}px`;
  poster.style.height = `${rect.height}px`;
}
