'use client';

import { useRef } from 'react';
import PhotoSvg, { f } from './PhotoSvg';
import Pot from './Pot';
import useLeafSway from './useLeafSway';

// Peperomia (baby rubber plant): round, glossy, slightly cupped leaves with a
// pale rim, on thin stems, in a cream ceramic pot.
const POT = {
  top: { l: 362.5, r: 433.5, y: 351.5 },
  bottom: { l: 372.5, r: 427.5, y: 412 },
  ry: 3.4,
  lip: 8,
  palette: {
    edgeL: '#b9c2c1',
    light: '#dde5e3',
    mid: '#c8d1cf',
    dark: '#959c99',
    edgeR: '#7b817e',
    rim: '#eef3f1',
    soil: '#221f1a',
  },
};

// base/tip in photo px; w = visible width; stem = soil point the stem rises from.
const LEAVES = [
  { base: [395, 338], tip: [398, 305], w: 20, tone: 'dark', stem: [393, 352], back: true },
  { base: [383, 301], tip: [359, 285], w: 17, tone: 'mid', stem: [390, 352], bend: [383, 326], back: true, gloss: 0.3 },
  { base: [389, 319], tip: [354, 310], w: 15.5, tone: 'mid', stem: [389, 352], back: true, side: -1 },
  { base: [392, 332], tip: [376, 316], w: 15, tone: 'dark', stem: [391, 352], back: true },
  { base: [397, 336], tip: [386, 311], w: 19, tone: 'mid', stem: [394, 352], back: true, side: -1 },
  { base: [404, 338], tip: [421, 318], w: 19, tone: 'dark', stem: [399, 352], back: true, gloss: 0.2 },
  { base: [413, 340], tip: [443, 313], w: 30, tone: 'dark', stem: [401, 352], bend: [409, 346], back: true, side: -1, gloss: 0.25 },
  { base: [410, 345], tip: [457, 337], w: 20, tone: 'dark', stem: [399, 352], back: true, side: -1, gloss: 0.15 },
  { base: [401, 311], tip: [409, 283.5], w: 24, tone: 'light', stem: [395, 352], bend: [391, 330], gloss: 0.6 },
  { base: [381, 342], tip: [342.5, 327], w: 31, tone: 'mid', stem: [387, 352], gloss: 0.35 },
  { base: [403, 351], tip: [417, 338], w: 15, tone: 'mid', stem: [402, 352], front: true, gloss: 0.3 },
  { base: [400, 347], tip: [372, 358.5], w: 23, tone: 'light', stem: [396, 352], front: true, side: -1, gloss: 0.4 },
].map((leaf) => {
  const [bx, by] = leaf.base;
  const [tx, ty] = leaf.tip;
  return {
    ...leaf,
    length: f(Math.hypot(tx - bx, ty - by)),
    angle: f((Math.atan2(ty - by, tx - bx) * 180) / Math.PI),
    pivot: leaf.base,
    center: [f(bx + (tx - bx) * 0.6), f(by + (ty - by) * 0.6)],
    weight: 22 / Math.max(14, leaf.w),
  };
});

const TONES = {
  dark: ['#1d331d', '#2a4a2d', '#33573a'],
  mid: ['#223d24', '#355e3b', '#43704a'],
  light: ['#29482c', '#41704a', '#548463'],
};

// Obovate leaf from its stalk (0,0) to a broad, blunt tip at (L,0).
const leafPath = (L, W) =>
  `M0,0 C${f(L * 0.1)},${f(-W * 0.36)} ${f(L * 0.26)},${f(-W * 0.5)} ${f(L * 0.52)},${f(-W * 0.5)} ` +
  `C${f(L * 0.8)},${f(-W * 0.5)} ${L},${f(-W * 0.32)} ${L},0 ` +
  `C${L},${f(W * 0.32)} ${f(L * 0.8)},${f(W * 0.5)} ${f(L * 0.52)},${f(W * 0.5)} ` +
  `C${f(L * 0.26)},${f(W * 0.5)} ${f(L * 0.1)},${f(W * 0.36)} 0,0Z`;

const halfPath = (L, W) =>
  `M0,0 C${f(L * 0.1)},${f(-W * 0.36)} ${f(L * 0.26)},${f(-W * 0.5)} ${f(L * 0.52)},${f(-W * 0.5)} ` +
  `C${f(L * 0.8)},${f(-W * 0.5)} ${L},${f(-W * 0.32)} ${L},0 ` +
  `Q${f(L * 0.5)},${f(W * 0.04)} 0,0Z`;

// Light comes from the window on the left, so each leaf drops a soft shadow
// down and to the right onto whatever is behind it.
const SHADOW_OFFSETS = [
  [0.9, 1.3, 0.2],
  [2, 2.8, 0.12],
];

function Leaf({ leaf, gRef }) {
  const { length: L, w: W, side = 1, gloss = 0.2 } = leaf;
  const [bx, by] = leaf.base;
  const d = leafPath(L, W);
  return (
    <g ref={gRef}>
      {SHADOW_OFFSETS.map(([dx, dy, opacity]) => (
        <path
          key={dx}
          d={d}
          fill="#061006"
          fillOpacity={opacity}
          transform={`translate(${f(bx + dx)} ${f(by + dy)}) rotate(${leaf.angle})`}
        />
      ))}
      <g transform={`translate(${bx} ${by}) rotate(${leaf.angle})`}>
        <path d={d} fill={`url(#acc-pep-${leaf.tone})`} />
        <path d={halfPath(L, W)} fill="#081208" fillOpacity="0.26" transform={side < 0 ? 'scale(1 -1)' : undefined} />
        <path
          d={`M${f(L * 0.04)},0 Q${f(L * 0.5)},${f(W * 0.05)} ${f(L * 0.86)},0`}
          stroke="#8fae84"
          strokeOpacity="0.14"
          strokeWidth="0.5"
          fill="none"
        />
        <ellipse
          cx={f(L * 0.58)}
          cy={f(W * 0.2 * side)}
          rx={f(L * 0.26)}
          ry={f(W * 0.16)}
          fill="url(#acc-pep-gloss)"
          opacity={f(gloss * 0.55)}
        />
        {/* cupped leaf: edges curl away from the light and darken */}
        <path d={d} fill="url(#acc-pep-cup)" />
        {leaf.back && <path d={d} fill="#040a04" fillOpacity="0.2" />}
        <path d={d} fill="none" stroke="#0b160b" strokeOpacity="0.3" strokeWidth="0.35" />
      </g>
    </g>
  );
}

function Stem({ leaf }) {
  const [sx, sy] = leaf.stem;
  const [bx, by] = leaf.base;
  const [cx, cy] = leaf.bend ?? [f((sx + bx) / 2), f((sy + by) / 2)];
  return (
    <path
      d={`M${sx},${sy} Q${cx},${cy} ${bx},${by}`}
      stroke="#557a45"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  );
}

export default function CenterPlant() {
  const svgRef = useRef(null);
  const leafRefs = useLeafSway(svgRef, LEAVES);
  const leaf = (l) => (
    <Leaf
      key={l.base.join()}
      leaf={l}
      gRef={(el) => {
        leafRefs.current[LEAVES.indexOf(l)] = el;
      }}
    />
  );

  return (
    <PhotoSvg ref={svgRef} box={[338, 278, 462, 418]}>
      <defs>
        {Object.entries(TONES).map(([tone, [a, b, c]]) => (
          <linearGradient key={tone} id={`acc-pep-${tone}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={a} />
            <stop offset="0.5" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </linearGradient>
        ))}
        <radialGradient id="acc-pep-gloss">
          <stop offset="0" stopColor="#d6ead6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d6ead6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="acc-pep-cup" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0.55" stopColor="#061006" stopOpacity="0" />
          <stop offset="0.85" stopColor="#061006" stopOpacity="0.22" />
          <stop offset="1" stopColor="#061006" stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <Pot
        id="pot-c"
        {...POT}
        shade={0.28}
        front={LEAVES.filter((l) => l.front).map(leaf)}
      >
        {LEAVES.map((l) => (
          <Stem key={l.base.join()} leaf={l} />
        ))}
        {LEAVES.filter((l) => l.back).map(leaf)}
        {LEAVES.filter((l) => !l.back && !l.front).map(leaf)}
      </Pot>
    </PhotoSvg>
  );
}
