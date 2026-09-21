export interface RackRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function rackRect(loader: HTMLElement, track: HTMLElement): RackRect;

export function placeRackPoster(
  loader: HTMLElement | null,
  poster: HTMLImageElement | null,
  track: HTMLElement | null,
): void;
