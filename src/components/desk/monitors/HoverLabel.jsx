'use client';

import { motion, useTransform } from 'motion/react';
import { useDesk } from '../DeskContext';
import { HOME_VIEW } from '../sceneLayout';

const LABEL_HEIGHT = 46;
const TOP_MARGIN = 14;

/**
 * Floating "Projects / click to open" tag above a monitor. `x`/`bottom` are
 * the anchor (desk-group coords); it slides down to stay inside the landing
 * camera's frame when the desk is raised high.
 */
export default function HoverLabel({ x, bottom, title, Icon, visible }) {
  const { lift } = useDesk();
  const top = useTransform(lift, (l) =>
    Math.max(bottom - LABEL_HEIGHT, HOME_VIEW.y + l * (1 - HOME_VIEW.follow) + TOP_MARGIN)
  );

  return (
    <motion.div aria-hidden className="pointer-events-none absolute" style={{ left: x, top }}>
      <motion.div
        className="flex -translate-x-1/2 flex-col items-center"
        initial={false}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
        transition={{ duration: visible ? 0.22 : 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center whitespace-nowrap rounded-full"
          style={{
            gap: 9,
            padding: '7px 16px 7px 13px',
            background: 'rgba(255, 252, 246, 0.94)',
            border: '1px solid rgba(32, 18, 1, 0.12)',
            boxShadow: '0 8px 22px -6px rgba(32, 18, 1, 0.35), 0 1px 2px rgba(32, 18, 1, 0.12)',
            color: '#201201',
            backdropFilter: 'blur(6px)',
          }}
        >
          {Icon && <Icon style={{ width: 16, height: 16 }} strokeWidth={1.8} />}
          <span style={{ fontSize: 17, fontWeight: 700, lineHeight: 1 }}>{title}</span>
          <span style={{ fontSize: 13, lineHeight: 1, color: 'rgba(32, 18, 1, 0.55)' }}>click to open</span>
        </div>
        <div
          style={{
            width: 10,
            height: 10,
            marginTop: -6,
            transform: 'rotate(45deg)',
            background: 'rgba(255, 252, 246, 0.94)',
            borderRight: '1px solid rgba(32, 18, 1, 0.12)',
            borderBottom: '1px solid rgba(32, 18, 1, 0.12)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
