'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useSpring, useTransform } from 'motion/react';
import { INK, SYSTEM_FONT, frosted, plainLink } from './os';

const BASE = 52;
const MAX = 80;
const RANGE = 150; // screen px from an icon's center where magnification fades out
const PAD = 7;

function DockItem({ item, mouseX }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const bounce = useAnimationControls();

  // The screen sits under several CSS scales, so pointer distances are
  // converted back into this screen's own px before applying RANGE.
  const distance = useTransform(mouseX, (x) => {
    const el = ref.current;
    if (!el || !Number.isFinite(x)) return Infinity;
    const r = el.getBoundingClientRect();
    const scale = r.width / el.offsetWidth || 1;
    return (x - (r.left + r.width / 2)) / scale;
  });
  const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 190, damping: 15 });

  const onClick = () => {
    if (item.bounce) bounce.start({ y: [0, -22, 0, -9, 0], transition: { duration: 0.7, ease: 'easeOut' } });
    item.onClick?.();
  };

  const content = (
    <motion.div animate={bounce} className="h-full w-full">
      {item.icon}
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      className="relative shrink-0"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute left-1/2 whitespace-nowrap"
            style={{
              x: '-50%',
              bottom: 'calc(100% + 14px)',
              padding: '4px 11px',
              borderRadius: 7,
              fontSize: 13,
              color: INK,
              ...frosted(0.82, 20),
              boxShadow: '0 0 0 0.5px rgba(32,18,1,0.18), 0 6px 16px rgba(20,10,0,0.22)',
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {item.href ? (
        <a
          href={item.href}
          aria-label={item.label}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="block h-full w-full rounded-[23%] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d43]"
          style={{ ...plainLink, display: 'block' }}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          aria-label={item.label}
          onClick={onClick}
          className="block h-full w-full rounded-[23%] p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d43]"
        >
          {content}
        </button>
      )}

      {item.running && (
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: -PAD + 1, width: 4, height: 4, background: 'rgba(32,18,1,0.62)' }}
        />
      )}
    </motion.div>
  );
}

/**
 * macOS dock pinned to the bottom of a screen. Items:
 * { id, label, icon, href?, external?, onClick?, running?, bounce? } or { id, separator: true }.
 */
export default function Dock({ items }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav aria-label="Dock" className="pointer-events-none absolute inset-x-0 bottom-[8px] z-30 flex justify-center">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end"
        style={{
          height: BASE + PAD * 2,
          gap: 7,
          padding: `${PAD}px 9px`,
          borderRadius: 22,
          fontFamily: SYSTEM_FONT,
          ...frosted(0.36, 26),
          boxShadow:
            'inset 0 0 0 0.5px rgba(255,255,255,0.55), 0 0 0 0.5px rgba(32,18,1,0.16), 0 14px 34px -10px rgba(20,10,0,0.45)',
        }}
      >
        {items.map((item) =>
          item.separator ? (
            <span
              key={item.id}
              aria-hidden
              className="mx-[3px] w-px shrink-0 self-center"
              style={{ height: BASE - 8, background: 'rgba(32,18,1,0.2)' }}
            />
          ) : (
            <DockItem key={item.id} item={item} mouseX={mouseX} />
          )
        )}
      </div>
    </nav>
  );
}
