'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { animate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { MAX_RAISE, RAISE_SPEED, liftToCm } from './sceneLayout';

const DeskContext = createContext(null);

const clampRaise = (value) => Math.min(MAX_RAISE, Math.max(0, value));

// Low-end devices get a lighter scene (no backdrop blur, no leaf physics).
// Decided from hardware hints, then from a short frame-rate probe after load.
function useLiteMode() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      navigator.connection?.saveData ||
      cores <= 2 ||
      memory <= 2
    ) {
      setLite(true);
      return;
    }

    // Skip the hydration/first-paint frames, then average ~90 frame deltas.
    // Deltas over 250ms are the tab being hidden, not the device being slow.
    const deltas = [];
    let last = null;
    let frame = 0;
    const startAt = performance.now() + 800;
    const probe = (now) => {
      if (now >= startAt) {
        if (last !== null && now - last < 250) deltas.push(now - last);
        last = now;
      }
      if (deltas.length < 90) {
        frame = requestAnimationFrame(probe);
        return;
      }
      const average = deltas.reduce((sum, d) => sum + d, 0) / deltas.length;
      if (average > 24) setLite(true);
    };
    frame = requestAnimationFrame(probe);
    return () => cancelAnimationFrame(frame);
  }, []);

  return lite;
}

export function DeskProvider({ children }) {
  // `target` is where the motor is driving the desk; `lift` is the smoothed
  // value every part should render from, so starts and stops ease like a real motor.
  const target = useMotionValue(0);
  const lift = useSpring(target, { stiffness: 220, damping: 34, mass: 0.7 });
  const heightCm = useTransform(lift, liftToCm);

  const [direction, setDirection] = useState(0);
  const [focus, setFocus] = useState(null);
  const lite = useLiteMode();
  const frameRef = useRef(null);
  const presetRef = useRef(null);

  const stopMove = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (!presetRef.current) setDirection(0);
  }, []);

  const startMove = useCallback(
    (dir) => {
      presetRef.current?.stop();
      presetRef.current = null;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setDirection(dir);
      let last = null;
      const tick = (now) => {
        const dt = last === null ? 0 : Math.max(0, (now - last) / 1000);
        last = now;
        const next = clampRaise(target.get() + dir * RAISE_SPEED * dt);
        target.set(next);
        if ((dir > 0 && next === MAX_RAISE) || (dir < 0 && next === 0)) {
          frameRef.current = null;
          setDirection(0);
          return;
        }
        frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [target]
  );

  const moveTo = useCallback(
    (value) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      presetRef.current?.stop();
      const goal = clampRaise(value);
      const distance = Math.abs(goal - target.get());
      if (distance < 0.5) return;
      setDirection(goal > target.get() ? 1 : -1);
      presetRef.current = animate(target, goal, {
        duration: distance / RAISE_SPEED,
        ease: 'linear',
        onComplete: () => {
          presetRef.current = null;
          setDirection(0);
        },
      });
    },
    [target]
  );

  useEffect(() => {
    const isTyping = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFocus(null);
        return;
      }
      if (focus || e.repeat || isTyping(e.target)) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        startMove(1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        startMove(-1);
      }
    };
    const onKeyUp = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') stopMove();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('pointerup', stopMove);
    window.addEventListener('blur', stopMove);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('pointerup', stopMove);
      window.removeEventListener('blur', stopMove);
    };
  }, [focus, startMove, stopMove]);

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    presetRef.current?.stop();
  }, []);

  const value = useMemo(
    () => ({ lift, heightCm, direction, startMove, stopMove, moveTo, focus, setFocus, lite }),
    [lift, heightCm, direction, startMove, stopMove, moveTo, focus, lite]
  );

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>;
}

/**
 * Shared desk-scene state.
 * - lift: MotionValue<number>, 0..MAX_RAISE stage units above sitting height (smoothed).
 * - heightCm: MotionValue<number>, desk height for the controller display.
 * - direction: -1 | 0 | 1 while the motor is moving.
 * - startMove(dir) / stopMove(): hold-to-move, like the paddle on a real standing desk.
 * - moveTo(lift): drive to a preset height (0 = sit, MAX_RAISE = stand).
 * - focus / setFocus: 'left' | 'right' | null, which screen the camera is zoomed into.
 * - lite: true on low-end devices; skip expensive effects.
 */
export function useDesk() {
  const ctx = useContext(DeskContext);
  if (!ctx) throw new Error('useDesk must be used inside <DeskProvider>');
  return ctx;
}
