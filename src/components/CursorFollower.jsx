'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const TEXT_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LI', 'LABEL', 'STRONG', 'EM', 'SMALL', 'BLOCKQUOTE']);

const BUTTON_TAGS = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);

function isTextElement(el) {
  if (!el) return false;
  // if inside a button-like element, treat as non-text
  if (el.closest('button, a[href], [role="button"]')) return false;
  if (BUTTON_TAGS.has(el.tagName)) return false;
  if (TEXT_TAGS.has(el.tagName)) return true;
  const parent = el.parentElement;
  if (parent && TEXT_TAGS.has(parent.tagName)) return true;
  return false;
}

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [onText, setOnText] = useState(false);
  const [onAmd, setOnAmd] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 1200, damping: 30, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 1200, damping: 30, mass: 0.1 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || window.innerWidth <= 768;
    if (isTouch) return;

    const move = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
      setOnText(isTextElement(e.target));
      setOnAmd(!!e.target.closest('.amd-logo'));
    };
    const hide = () => setVisible(false);
    const show = () => setVisible(true);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, [rawX, rawY, visible]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        top: 0,
        left: 0,
      }}
      animate={{ opacity: visible && !onAmd ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <motion.div
        style={{ backgroundColor: '#201201' }}
        animate={
          onText
            ? { width: pressed ? 2 : 5, height: 20, borderRadius: 2, scale: 1 }
            : { width: 10, height: 10, borderRadius: 5, scale: pressed ? 0.4 : 1 }
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
