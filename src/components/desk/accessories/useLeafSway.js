import { useEffect, useRef } from 'react';
import { useDesk } from '../DeskContext';

const STIFFNESS = 48; // spring back toward rest (per second squared)
const DAMPING = 5.6;
const MAX_ANGLE = 7; // degrees
const MAX_SPEED = 90; // degrees per second
const REST = 0.02;

// Leaves rustle when the cursor moves near them. Driven from a passive
// window pointermove listener (no hover targets, so nothing blocks the
// screens underneath) and a rAF spring loop that only runs while a leaf is
// moving. Each leaf is { pivot: [x, y], center: [x, y], weight? } in the
// SVG's user units; returns refs to attach to each leaf's <g>. Off in lite mode.
export default function useLeafSway(svgRef, leaves, { radius = 30, strength = 2.2 } = {}) {
  const leafRefs = useRef([]);
  const { lite } = useDesk();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || lite) return;

    const state = leaves.map(() => ({ a: 0, v: 0 }));
    const vb = svg.viewBox.baseVal;
    const bounds = {
      x1: vb.x - radius,
      y1: vb.y - radius,
      x2: vb.x + vb.width + radius,
      y2: vb.y + vb.height + radius,
    };
    const pt = svg.createSVGPoint();
    let last = null;
    let frame = 0;
    let prevTime = 0;

    const step = (time) => {
      const dt = Math.min(0.033, Math.max(0.001, (time - prevTime) / 1000));
      prevTime = time;
      let moving = false;
      state.forEach((s, i) => {
        s.v += (-STIFFNESS * s.a - DAMPING * s.v) * dt;
        s.a = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, s.a + s.v * dt));
        if (Math.abs(s.a) < REST && Math.abs(s.v) < REST * 10) {
          s.a = 0;
          s.v = 0;
        } else {
          moving = true;
        }
        const el = leafRefs.current[i];
        if (!el) return;
        const [px, py] = leaves[i].pivot;
        if (s.a) el.setAttribute('transform', `rotate(${s.a.toFixed(3)} ${px} ${py})`);
        else el.removeAttribute('transform');
      });
      frame = moving ? requestAnimationFrame(step) : 0;
    };

    // getScreenCTM() forces layout, so pointer samples are handled at most once per frame.
    let pending = null;
    let moveFrame = 0;
    const onPointerMove = (e) => {
      pending = { clientX: e.clientX, clientY: e.clientY };
      if (!moveFrame) {
        moveFrame = requestAnimationFrame(() => {
          moveFrame = 0;
          onMove(pending);
        });
      }
    };

    const onMove = (e) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      pt.x = e.clientX;
      pt.y = e.clientY;
      const p = pt.matrixTransform(ctm.inverse());
      const prev = last;
      last = p;
      if (!prev || p.x < bounds.x1 || p.x > bounds.x2 || p.y < bounds.y1 || p.y > bounds.y2) return;
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      if (Math.abs(dx) + Math.abs(dy) > radius * 2) return;

      let kicked = false;
      leaves.forEach((leaf, i) => {
        const d = Math.hypot(p.x - leaf.center[0], p.y - leaf.center[1]);
        if (d > radius) return;
        const falloff = (1 - d / radius) ** 2;
        const rx = leaf.center[0] - leaf.pivot[0];
        const ry = leaf.center[1] - leaf.pivot[1];
        const len = Math.hypot(rx, ry) || 1;
        // Torque from the cursor's motion around the leaf's base (clockwise +).
        const torque = (rx * dy - ry * dx) / len;
        const s = state[i];
        s.v = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, s.v + torque * falloff * strength * (leaf.weight ?? 1) * 6));
        kicked = true;
      });
      if (kicked && !frame) {
        prevTime = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame) cancelAnimationFrame(frame);
      if (moveFrame) cancelAnimationFrame(moveFrame);
    };
  }, [svgRef, leaves, radius, strength, lite]);

  return leafRefs;
}
