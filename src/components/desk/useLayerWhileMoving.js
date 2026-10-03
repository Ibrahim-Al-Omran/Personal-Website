import { useEffect } from 'react';

/**
 * Promotes `ref`'s element to its own compositor layer while any of `values`
 * (MotionValues translating it) are changing, so movement is a cheap GPU
 * translate instead of a full repaint every frame. The hint is dropped once
 * things settle. `values` must be a stable array.
 *
 * GPU Chrome rasterises a will-change layer at the scale it had when promoted
 * and keeps it, so while `scale` is changing (a zoom) the hint is withheld;
 * otherwise screens zoomed out of stay soft.
 */
export default function useLayerWhileMoving(ref, values, { scale, idleMs = 160 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let hintTimer = 0;
    let zoomTimer = 0;

    const dropHint = () => {
      clearTimeout(hintTimer);
      hintTimer = 0;
      el.style.willChange = '';
    };
    const onMove = () => {
      if (zoomTimer) return;
      if (!hintTimer) el.style.willChange = 'transform';
      clearTimeout(hintTimer);
      hintTimer = setTimeout(dropHint, idleMs);
    };
    const onZoom = () => {
      dropHint();
      clearTimeout(zoomTimer);
      zoomTimer = setTimeout(() => {
        zoomTimer = 0;
      }, idleMs);
    };

    const unsubscribers = values.map((value) => value.on('change', onMove));
    if (scale) unsubscribers.push(scale.on('change', onZoom));
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      clearTimeout(hintTimer);
      clearTimeout(zoomTimer);
      el.style.willChange = '';
    };
  }, [ref, values, scale, idleMs]);
}
