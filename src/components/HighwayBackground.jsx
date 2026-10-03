'use client';

import { useEffect, useRef } from 'react';

/**
 * Bird's-eye bendy highway: static road (line art only), cars moving both ways.
 */
export default function HighwayBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let running = true;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Static centerline along the vertical axis (progress s from 0 at top to 1 at bottom).
    const centerAt = (s, w) => {
      const x =
        w * 0.5 +
        Math.sin(s * Math.PI * 1.35) * w * 0.18 +
        Math.sin(s * Math.PI * 0.55 + 0.8) * w * 0.07;
      const y = s * window.innerHeight;
      return { x, y };
    };

    const tangentAt = (s, w) => {
      const a = centerAt(Math.max(0, s - 0.004), w);
      const b = centerAt(Math.min(1, s + 0.004), w);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      return { x: dx / len, y: dy / len };
    };

    const normalAt = (s, w) => {
      const t = tangentAt(s, w);
      return { x: -t.y, y: t.x };
    };

    const sampleRoad = (w, h) => {
      const steps = Math.max(80, Math.floor(h / 8));
      const center = [];
      const left = [];
      const right = [];
      // Two lanes total: outer edges + one dashed center line.
      const half = Math.min(42, w * 0.055);
      for (let i = 0; i <= steps; i++) {
        const s = i / steps;
        const c = centerAt(s, w);
        const n = normalAt(s, w);
        center.push(c);
        left.push({ x: c.x + n.x * half, y: c.y + n.y * half });
        right.push({ x: c.x - n.x * half, y: c.y - n.y * half });
      }
      return { center, left, right, half, steps };
    };

    const distToRoad = (x, y, w, half) => {
      let best = Infinity;
      for (let i = 0; i <= 40; i++) {
        const c = centerAt(i / 40, w);
        const d = Math.hypot(x - c.x, y - c.y);
        if (d < best) best = d;
      }
      return best - half;
    };

    // Deterministic scatter of little line-art trees in open space.
    const plantTrees = (w, h, half) => {
      const trees = [];
      let seed = (w * 73856093) ^ (h * 19349663);
      const rnd = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      const count = Math.round(28 + (w * h) / 90000);
      const minGap = 36;
      for (let attempt = 0; attempt < count * 8 && trees.length < count; attempt++) {
        const x = 18 + rnd() * (w - 36);
        const y = 18 + rnd() * (h - 36);
        if (distToRoad(x, y, w, half) < 28 + rnd() * 18) continue;
        let ok = true;
        for (const t of trees) {
          if (Math.hypot(x - t.x, y - t.y) < minGap) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        trees.push({
          x,
          y,
          size: 12 + rnd() * 14,
          kind: rnd() > 0.45 ? 'pine' : 'round',
        });
      }
      return trees;
    };

    const drawTree = (t) => {
      const { x, y, size, kind } = t;
      if (kind === 'pine') {
        // Tiny side-view pine: trunk + stacked triangles
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.35);
        ctx.lineTo(x, y + size * 0.75);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
          const top = y - size * 0.55 + i * size * 0.28;
          const mid = top + size * 0.38;
          const halfW = size * (0.32 + i * 0.12);
          ctx.beginPath();
          ctx.moveTo(x, top);
          ctx.lineTo(x - halfW, mid);
          ctx.lineTo(x + halfW, mid);
          ctx.closePath();
          ctx.stroke();
        }
      } else {
        // Bird's-eye canopy: circle + short trunk tick
        ctx.beginPath();
        ctx.arc(x, y - size * 0.1, size * 0.42, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.28);
        ctx.lineTo(x, y + size * 0.55);
        ctx.stroke();
      }
    };

    const strokePoly = (pts, dash) => {
      if (!pts.length) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      if (dash) ctx.setLineDash(dash);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Cars: progress along the road, side -1 left / +1 right, dir ±1 along the curve.
    const cars = [
      { s: 0.08, side: -1, speed: 0.045, len: 18 },
      { s: 0.32, side: -1, speed: 0.038, len: 22 },
      { s: 0.58, side: -1, speed: 0.05, len: 16 },
      { s: 0.78, side: -1, speed: 0.042, len: 20 },
      { s: 0.15, side: 1, speed: -0.044, len: 19 },
      { s: 0.4, side: 1, speed: -0.036, len: 24 },
      { s: 0.62, side: 1, speed: -0.048, len: 17 },
      { s: 0.88, side: 1, speed: -0.04, len: 21 },
    ];

    let last = performance.now();
    let road = null;
    let trees = null;

    const drawCar = (s, side, len, w) => {
      const c = centerAt(s, w);
      const t = tangentAt(s, w);
      const n = normalAt(s, w);
      const half = Math.min(42, w * 0.055);
      const offset = side * half * 0.48;
      const cx = c.x + n.x * offset;
      const cy = c.y + n.y * offset;
      const hw = 5;
      const hl = len / 2;
      const corners = [
        { x: cx + t.x * hl + n.x * hw, y: cy + t.y * hl + n.y * hw },
        { x: cx + t.x * hl - n.x * hw, y: cy + t.y * hl - n.y * hw },
        { x: cx - t.x * hl - n.x * hw, y: cy - t.y * hl - n.y * hw },
        { x: cx - t.x * hl + n.x * hw, y: cy - t.y * hl + n.y * hw },
      ];
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(corners[i].x, corners[i].y);
      ctx.closePath();
      ctx.stroke();
    };

    const draw = (now) => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!road || road.w !== w || road.h !== h) {
        road = { ...sampleRoad(w, h), w, h };
        trees = plantTrees(w, h, road.half);
      }

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(38, 39, 39, 0.22)';
      ctx.lineWidth = 1.1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      for (const t of trees) drawTree(t);

      ctx.strokeStyle = 'rgba(38, 39, 39, 0.28)';
      ctx.lineWidth = 1.25;

      // Static road: two edges + one dashed center divider (2 lanes)
      strokePoly(road.left);
      strokePoly(road.right);
      strokePoly(road.center, [10, 14]);

      if (!reduceMotion) {
        for (const car of cars) {
          car.s += car.speed * dt;
          if (car.s > 1.05) car.s = -0.05;
          if (car.s < -0.05) car.s = 1.05;
        }
      }

      ctx.strokeStyle = 'rgba(38, 39, 39, 0.45)';
      ctx.lineWidth = 1.35;
      for (const car of cars) {
        if (car.s < -0.02 || car.s > 1.02) continue;
        drawCar(car.s, car.side, car.len, w);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="highway-bg" aria-hidden />;
}
