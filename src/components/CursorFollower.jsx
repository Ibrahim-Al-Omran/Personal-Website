'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

const TEXT_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LI', 'LABEL', 'STRONG', 'EM', 'SMALL', 'BLOCKQUOTE']);

const BUTTON_TAGS = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);

function isTextElement(el) {
  if (!el) return false;
  if (el.closest('button, a[href], [role="button"]')) return false;
  if (BUTTON_TAGS.has(el.tagName)) return false;
  if (TEXT_TAGS.has(el.tagName)) return true;
  const parent = el.parentElement;
  if (parent && TEXT_TAGS.has(parent.tagName)) return true;
  return false;
}

export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [onText, setOnText] = useState(false);
  const [onBrand, setOnBrand] = useState(false);
  const onTextRef = useRef(false);
  const onBrandRef = useRef(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || window.innerWidth <= 768;
    if (isTouch) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      const text = isTextElement(e.target);
      if (text !== onTextRef.current) {
        onTextRef.current = text;
        setOnText(text);
      }
      const brand = !!e.target.closest('.amd-logo, .ascendance-logo, .sandbox-logo');
      if (brand !== onBrandRef.current) {
        onBrandRef.current = brand;
        setOnBrand(brand);
      }
    };
    const hide = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const show = () => {
      visibleRef.current = true;
      setVisible(true);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    document.addEventListener('mousemove', move, { passive: true });
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
  }, [x, y]);

  if (!enabled) return null;

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
      animate={{ opacity: visible && !onBrand ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <motion.div
        style={{ backgroundColor: '#262727' }}
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
