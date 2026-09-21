import { useLayoutEffect, useMemo, useRef } from 'react';
import { shirtRailMarkup } from './markup.mjs';
import './shirt-rail.css';

const defaultAssetBase = `${import.meta.env.BASE_URL}shirt-rail/`;

type Props = {
  /** Public URL of the folder holding textures/. */
  assetBase?: string;
  className?: string;
};

export default function ShirtRailHero({ assetBase = defaultAssetBase, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const markup = useMemo(() => shirtRailMarkup(assetBase), [assetBase]);

  useLayoutEffect(() => {
    const root = host.current?.querySelector<HTMLElement>('.shirt-rail');
    if (!root) return;

    let destroy: (() => void) | undefined;
    let cancelled = false;

    import('./app.js').then(({ mountShirtRail }) => {
      if (cancelled) return;
      destroy = mountShirtRail(root, { assetBase });
    }).catch((error) => {
      console.warn('Shirt rail unavailable; keeping the static fallback.', error);
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [assetBase]);

  return (
    <div
      ref={host}
      className={className}
      data-element="shirt-rail"
      style={{ height: '100%' }}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
