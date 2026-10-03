import PhotoSvg, { f } from './PhotoSvg';
import Pot from './Pot';

// Blue-grey echeveria in a cream pot with a rolled lip: a loose, slightly
// irregular rosette of thick spoon-shaped leaves.
const POT = {
  top: { l: 623.5, r: 695.5, y: 350.5 },
  bottom: { l: 631, r: 688.5, y: 410.5 },
  ry: 3.2,
  lip: 9,
  palette: {
    edgeL: '#a9b3b4',
    light: '#d9e2e2',
    mid: '#c5cfd0',
    dark: '#959d9e',
    edgeR: '#7d8486',
    rim: '#eef3f3',
    soil: '#2a2722',
  },
};

const CX = 659;
const CY = 348;

// [screen angle (deg, 0 = right, 90 = up, negative = toward the viewer), length, width, tone]
const SPEC = [
  [96, 30, 15, 0.5], [122, 28, 14, 0.7], [72, 29, 15, 0.6], [146, 31, 14, 0.4], [48, 31, 14, 0.8],
  [168, 36, 13, 0.55], [26, 34, 13, 0.35], [184, 37, 11, 0.45], [8, 38, 11, 0.6],
  [134, 21, 13, 0.9], [60, 22, 13, 0.75], [104, 20, 13, 0.95], [158, 24, 12, 0.8], [32, 24, 12, 0.7],
  [118, 13, 11, 1], [80, 13, 11, 0.9], [92, 8, 9, 1],
  [-150, 24, 12, 0.6], [-30, 23, 12, 0.5], [-118, 15, 12, 0.85], [-70, 15, 12, 0.7],
];

// Deterministic jitter so the rosette isn't perfectly regular.
const jitter = (i, amount) => f((((i * 2654435761) % 1000) / 500 - 1) * amount);

const LEAVES = SPEC.map(([deg, L, W, tone], i) => {
  const a = deg + jitter(i, 14);
  const rad = (a * Math.PI) / 180;
  const toward = deg < 0;
  // Leaves facing the viewer are foreshortened and droop over the rim.
  const dirY = toward ? -Math.sin(rad) * 0.42 : -Math.sin(rad) * (0.8 + Math.abs(jitter(i + 3, 0.25)));
  const len = f(L + jitter(i + 7, 4.5));
  return {
    key: `${deg}-${i}`,
    bx: f(CX + Math.cos(rad) * 3),
    by: f(CY - (L < 16 ? 4 : L < 26 ? 2 : 0) + (toward ? 1 : 0)),
    angle: f((Math.atan2(dirY, Math.cos(rad)) * 180) / Math.PI),
    L: toward ? f(len * 0.85) : len,
    W,
    tone,
    order: toward ? 1000 + i : -len,
  };
}).sort((a, b) => a.order - b.order);

const leafPath = (L, W) =>
  `M0,${f(-W * 0.18)} C${f(L * 0.3)},${f(-W * 0.3)} ${f(L * 0.56)},${f(-W * 0.54)} ${f(L * 0.8)},${f(-W * 0.4)} ` +
  `Q${f(L * 0.94)},${f(-W * 0.14)} ${L},0 Q${f(L * 0.94)},${f(W * 0.14)} ${f(L * 0.8)},${f(W * 0.4)} ` +
  `C${f(L * 0.56)},${f(W * 0.54)} ${f(L * 0.3)},${f(W * 0.3)} 0,${f(W * 0.18)}Z`;

const mix = (t) => {
  const a = [0x46, 0x54, 0x56];
  const b = [0x98, 0xad, 0xb1];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
};

export default function Succulent() {
  return (
    <PhotoSvg box={[615, 312, 702, 416]}>
      <defs>
        <radialGradient id="acc-succ-core">
          <stop offset="0" stopColor="#161d1d" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#161d1d" stopOpacity="0.6" />
          <stop offset="1" stopColor="#161d1d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="acc-succ-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141c1c" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#141c1c" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="acc-succ-fold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#0d1414" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <Pot
        id="pot-succ"
        {...POT}
        shade={0.2}
        front={LEAVES.filter((l) => l.order >= 1000).map((l) => (
          <SuccLeaf key={l.key} leaf={l} />
        ))}
      >
        <ellipse cx={CX} cy={CY - 6} rx="31" ry="11" fill="url(#acc-succ-core)" />
        {LEAVES.filter((l) => l.order < 1000).map((l) => (
          <SuccLeaf key={l.key} leaf={l} />
        ))}
      </Pot>
    </PhotoSvg>
  );
}

function SuccLeaf({ leaf }) {
  const d = leafPath(leaf.L, leaf.W);
  return (
    <>
      <path
        d={d}
        fill="#0d1414"
        fillOpacity="0.18"
        transform={`translate(${f(leaf.bx + 1)} ${f(leaf.by + 1.5)}) rotate(${leaf.angle})`}
      />
      <g transform={`translate(${leaf.bx} ${leaf.by}) rotate(${leaf.angle})`}>
        <path d={d} fill={mix(leaf.tone)} />
        <path d={d} fill="url(#acc-succ-shade)" />
        <path d={d} fill="url(#acc-succ-fold)" stroke="#1e2828" strokeOpacity="0.3" strokeWidth="0.45" />
      </g>
    </>
  );
}
