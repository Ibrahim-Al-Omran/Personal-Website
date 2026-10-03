'use client';

import { motion, useTransform } from 'motion/react';
import ScreenMount from '../ScreenMount';
import { SCREENS } from '../sceneLayout';
import { useDesk } from '../DeskContext';
import { useScreenTilt } from './useScreenTilt';

const GLASS =
  'linear-gradient(116deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 22%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 68%, rgba(255,255,255,0.035) 86%, rgba(255,255,255,0.06) 100%)';

/**
 * One monitor: frame + screen + glass, laid out flat at SCREENS[id] and
 * projected to match the photo's viewing angle (flattened while focused).
 */
export default function MonitorShell({ id, frame, overlay, onHoverChange, children }) {
  const { focus } = useDesk();
  const focused = focus === id;
  const { tilt, transform } = useScreenTilt(id, focused);
  const glassOpacity = useTransform(tilt, [0, 1], [0, 1]);
  const { x, y, width, height } = SCREENS[id];

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width, height, transform, transformOrigin: '0 0' }}
      onPointerEnter={() => onHoverChange?.(id, true)}
      onPointerLeave={() => onHoverChange?.(id, false)}
    >
      {frame}
      <ScreenMount id={id}>{children}</ScreenMount>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glassOpacity,
          background: GLASS,
          boxShadow: 'inset 0 0 0 0.6px rgba(255,255,255,0.05), inset 0 6px 10px -6px rgba(0,0,0,0.45)',
        }}
      />
      {overlay && (
        // Stage-positioned parts attached to the monitor (e.g. the webcam), so they tilt with it.
        <div className="pointer-events-none absolute" style={{ left: -x, top: -y }}>
          {overlay}
        </div>
      )}
    </motion.div>
  );
}
