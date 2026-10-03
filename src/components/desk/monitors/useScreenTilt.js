'use client';

import { useEffect } from 'react';
import { animate, useMotionValue, useTransform } from 'motion/react';
import { SCREENS } from '../sceneLayout';
import { SCREEN_QUADS } from './geometry';
import { quadTransform } from './quadTransform';

const TILT_SPRING = { type: 'spring', stiffness: 120, damping: 24, mass: 0.9 };

/**
 * `tilt` runs 1 (angled in toward the viewer) -> 0 (flat at SCREENS[id]) while
 * the camera is zoomed into this screen. At 0 the transform is 'none' so the
 * focused content rasterises crisply.
 */
export function useScreenTilt(id, focused) {
  const tilt = useMotionValue(focused ? 0 : 1);

  useEffect(() => {
    const controls = animate(tilt, focused ? 0 : 1, TILT_SPRING);
    return () => controls.stop();
  }, [focused, tilt]);

  const { x, y, width, height } = SCREENS[id];
  const flat = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ];
  const target = SCREEN_QUADS[id]?.map(([qx, qy]) => [qx - x, qy - y]);

  const transform = useTransform(tilt, (t) => {
    if (!target || t < 0.002) return 'none';
    const k = Math.min(1, t);
    const quad = flat.map(([fx, fy], i) => [fx + (target[i][0] - fx) * k, fy + (target[i][1] - fy) * k]);
    return quadTransform(width, height, quad);
  });

  return { tilt, transform };
}
