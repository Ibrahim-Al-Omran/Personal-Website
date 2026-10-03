'use client';

import { useRef } from 'react';
import PhotoSvg, { f } from './PhotoSvg';
import Pot from './Pot';
import useLeafSway from './useLeafSway';

// Narrow, variegated snake plant (pale edges, dark centres) in a slate pot.
const POT = {
  top: { l: 480, r: 519.5, y: 372.5 },
  bottom: { l: 485.5, r: 517.5, y: 411.5 },
  ry: 2.4,
  lip: 3,
  palette: {
    edgeL: '#4e5a66',
    light: '#7a8a99',
    mid: '#687887',
    dark: '#55616d',
    edgeR: '#434d57',
    rim: '#a2aeb9',
    soil: '#1d1d1b',
  },
};

// [base, control, tip] quadratic centrelines in photo px; back to front.
const LEAVES = [
  { pts: [[487, 373], [476, 366], [465, 362]], w: 3.4 },
  { pts: [[508, 373], [516, 366], [523, 361]], w: 3.2 },
  { pts: [[486, 373], [477, 360], [467, 349]], w: 3.7 },
  { pts: [[489, 373], [483, 345], [472, 327]], w: 3.9 },
  { pts: [[502, 373], [509, 350], [516, 326]], w: 3.8 },
  { pts: [[504, 373], [507, 356], [512.5, 336]], w: 3.5 },
  { pts: [[506, 373], [512, 361], [518, 350]], w: 3.3 },
  { pts: [[488, 373], [481, 340], [475, 312]], w: 4.1 },
  { pts: [[490, 373], [486, 352], [480, 333]], w: 4 },
  { pts: [[499, 373], [507, 342], [522, 309]], w: 3.9 },
  { pts: [[496, 373], [497, 352], [493, 326]], w: 4 },
  { pts: [[492, 373], [494, 340], [498, 312]], w: 4.1 },
  { pts: [[495, 373], [490, 356], [484, 340]], w: 3.5 },
  { pts: [[497, 373], [500, 346], [506, 317]], w: 3.9 },
  { pts: [[501, 373], [503, 362], [501, 347]], w: 3.3 },
].map((leaf) => {
  const [, c, t] = leaf.pts;
  return {
    ...leaf,
    pivot: leaf.pts[0],
    center: [f((c[0] + t[0]) / 2), f((c[1] + t[1]) / 2)],
    weight: 0.8,
  };
});

// Tapered strap along a quadratic curve, full width for most of its length.
function strapPath([[x0, y0], [x1, y1], [x2, y2]], width) {
  const n = 16;
  const left = [];
  const right = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2;
    const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2;
    const dx = 2 * (1 - t) * (x1 - x0) + 2 * t * (x2 - x1);
    const dy = 2 * (1 - t) * (y1 - y0) + 2 * t * (y2 - y1);
    const len = Math.hypot(dx, dy) || 1;
    const half = (width / 2) * Math.min(1, (1 - t) * 2.6) ** 0.8 * (1 - 0.2 * t);
    left.push(`${f(x - (dy / len) * half)},${f(y + (dx / len) * half)}`);
    right.push(`${f(x + (dy / len) * half)},${f(y - (dx / len) * half)}`);
  }
  return `M${left.join(' L')} L${right.reverse().join(' L')}Z`;
}

const PATHS = LEAVES.map((l) => ({
  outer: strapPath(l.pts, l.w),
  inner: strapPath(l.pts, l.w * 0.66),
}));

// Leaves further back sit in the shade of the ones in front.
const depthShade = (i) => f(0.28 * (1 - i / (LEAVES.length - 1)));

export default function SnakePlant() {
  const svgRef = useRef(null);
  const leafRefs = useLeafSway(svgRef, LEAVES, { radius: 26 });

  return (
    <PhotoSvg ref={svgRef} box={[462, 305, 528, 416]}>
      <defs>
        {/* lit from the left: each strap is brighter on its left side */}
        <linearGradient id="acc-snake-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8c9a68" />
          <stop offset="1" stopColor="#5f6e48" />
        </linearGradient>
        <linearGradient id="acc-snake-core" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d5c3f" />
          <stop offset="0.55" stopColor="#2c4a31" />
          <stop offset="1" stopColor="#1f3824" />
        </linearGradient>
      </defs>
      <Pot id="pot-s" {...POT} shade={0.15}>
        {LEAVES.map((l, i) => (
          <g
            key={l.pts.join()}
            ref={(el) => {
              leafRefs.current[i] = el;
            }}
          >
            <path d={PATHS[i].outer} fill="#061006" fillOpacity="0.22" transform="translate(0.8 1.1)" />
            <path d={PATHS[i].outer} fill="url(#acc-snake-edge)" />
            <path d={PATHS[i].inner} fill="url(#acc-snake-core)" />
            <path d={PATHS[i].outer} fill="#061006" fillOpacity={depthShade(i)} />
          </g>
        ))}
      </Pot>
    </PhotoSvg>
  );
}
