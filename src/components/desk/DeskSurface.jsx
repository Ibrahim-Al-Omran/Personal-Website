import { DESK } from './sceneLayout';

// Rounded so server and client render identical attribute strings.
const round = (n) => Math.round(n * 100) / 100;

const BACK = round(DESK.backEdgeY);
const FRONT = DESK.frontEdgeY;
const EDGE = DESK.edgeThickness;
const DEPTH = FRONT - BACK;

const L_BACK = DESK.leftX;
const L_FRONT = DESK.leftX - DESK.endFlare;
const R_BACK = DESK.rightX;
const R_FRONT = DESK.rightX + DESK.endFlare;

const ST = { x: round(DESK.seamTop.x), y: round(DESK.seamTop.y) };
const SB = { x: round(DESK.seamBottom.x), y: round(DESK.seamBottom.y) };
const seamXAt = (y) => ST.x + ((SB.x - ST.x) * (y - BACK)) / DEPTH;

const LEFT_TOP = `${L_BACK},${BACK} ${ST.x},${BACK} ${SB.x},${FRONT} ${L_FRONT},${FRONT}`;
const RIGHT_TOP = `${ST.x},${BACK} ${R_BACK},${BACK} ${R_FRONT},${FRONT} ${SB.x},${FRONT}`;
const LEFT_EDGE = `${L_FRONT},${FRONT} ${SB.x},${FRONT} ${SB.x},${FRONT + EDGE} ${L_FRONT + 3},${FRONT + EDGE}`;
const RIGHT_EDGE = `${SB.x},${FRONT} ${R_FRONT},${FRONT} ${R_FRONT - 3},${FRONT + EDGE} ${SB.x},${FRONT + EDGE}`;

function makeGrain(seed, x1, x2, count) {
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const lines = [];
  for (let i = 0; i < count; i++) {
    const t = rand();
    const depth = t ** 1.35;
    const y = BACK + 3 + depth * (DEPTH - 6);
    const span = (x2 - x1) * (0.35 + rand() * 0.75);
    const start = x1 + rand() * (x2 - x1 - span * 0.6) - span * 0.2;
    const end = start + span;
    const amp = (0.6 + rand() * 2.4) * (0.4 + depth);
    const segs = 3 + Math.floor(rand() * 3);
    let d = `M${start.toFixed(1)} ${y.toFixed(1)}`;
    for (let s = 1; s <= segs; s++) {
      const sx = start + (span * s) / segs;
      const cx = sx - span / segs / 2;
      const dy = (rand() - 0.5) * amp;
      d += ` Q${cx.toFixed(1)} ${(y + (rand() - 0.5) * amp * 2).toFixed(1)} ${sx.toFixed(1)} ${(y + dy).toFixed(1)}`;
    }
    const broad = rand() < 0.1;
    lines.push({
      d,
      width: round((0.4 + depth * 1.1) * (broad ? 5 : 1)),
      opacity: round((0.02 + rand() * 0.055) * (broad ? 0.5 : 1)),
      light: rand() < 0.25,
    });
  }
  return lines;
}

const LEFT_GRAIN = makeGrain(11, L_FRONT, ST.x + 10, 120);
const RIGHT_GRAIN = makeGrain(29, SB.x - 10, R_FRONT, 150);

function Grain({ lines, dark }) {
  return (
    <g fill="none" strokeLinecap="round">
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          stroke={l.light ? '#fff4e2' : dark}
          strokeOpacity={l.light ? l.opacity * 0.9 : l.opacity}
          strokeWidth={l.width}
        />
      ))}
    </g>
  );
}

export default function DeskSurface() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      style={{ width: 1600, height: 1000, overflow: 'visible' }}
      viewBox="0 0 1600 1000"
    >
      <defs>
        <linearGradient id="dsk-left-v" gradientUnits="userSpaceOnUse" x1={0} y1={BACK} x2={0} y2={FRONT}>
          <stop offset="0" stopColor="#a08669" />
          <stop offset="0.1" stopColor="#af9576" />
          <stop offset="0.42" stopColor="#c6aa86" />
          <stop offset="0.78" stopColor="#d2b590" />
          <stop offset="1" stopColor="#d6b993" />
        </linearGradient>
        <radialGradient id="dsk-left-light" gradientUnits="userSpaceOnUse" cx={L_FRONT + 40} cy={FRONT + 30} r={880}>
          <stop offset="0" stopColor="#fff1d6" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff1d6" stopOpacity="0.2" />
          <stop offset="1" stopColor="#fff1d6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dsk-right-v" gradientUnits="userSpaceOnUse" x1={0} y1={BACK} x2={0} y2={FRONT}>
          <stop offset="0" stopColor="#9a8164" />
          <stop offset="0.1" stopColor="#a98e6e" />
          <stop offset="0.42" stopColor="#bda17c" />
          <stop offset="0.78" stopColor="#c9ad86" />
          <stop offset="1" stopColor="#ceb28b" />
        </linearGradient>
        <linearGradient id="dsk-right-h" gradientUnits="userSpaceOnUse" x1={SB.x} y1={0} x2={R_FRONT} y2={0}>
          <stop offset="0" stopColor="#3a2a18" stopOpacity="0.04" />
          <stop offset="0.25" stopColor="#3a2a18" stopOpacity="0" />
          <stop offset="1" stopColor="#3a2a18" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="dsk-contact" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={34}>
          <stop offset="0" stopColor="#1e160e" stopOpacity="0.5" />
          <stop offset="0.25" stopColor="#1e160e" stopOpacity="0.2" />
          <stop offset="1" stopColor="#1e160e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dsk-wall-shadow" gradientUnits="userSpaceOnUse" x1={0} y1={-60} x2={0} y2={0}>
          <stop offset="0" stopColor="#141210" stopOpacity="0" />
          <stop offset="0.55" stopColor="#141210" stopOpacity="0.04" />
          <stop offset="0.85" stopColor="#141210" stopOpacity="0.1" />
          <stop offset="1" stopColor="#141210" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="dsk-edge-left" gradientUnits="userSpaceOnUse" x1={0} y1={FRONT} x2={0} y2={FRONT + EDGE}>
          <stop offset="0" stopColor="#f3dfbf" />
          <stop offset="0.12" stopColor="#d0b08a" />
          <stop offset="0.3" stopColor="#b8956f" />
          <stop offset="1" stopColor="#8f6f52" />
        </linearGradient>
        <linearGradient id="dsk-edge-right" gradientUnits="userSpaceOnUse" x1={0} y1={FRONT} x2={0} y2={FRONT + EDGE}>
          <stop offset="0" stopColor="#ecd6b3" />
          <stop offset="0.12" stopColor="#c4a37c" />
          <stop offset="0.3" stopColor="#ab8964" />
          <stop offset="1" stopColor="#82634a" />
        </linearGradient>
        <linearGradient id="dsk-front-lip" gradientUnits="userSpaceOnUse" x1={0} y1={FRONT - 10} x2={0} y2={FRONT}>
          <stop offset="0" stopColor="#3a2a18" stopOpacity="0" />
          <stop offset="1" stopColor="#3a2a18" stopOpacity="0.08" />
        </linearGradient>
        <clipPath id="dsk-left-clip">
          <polygon points={LEFT_TOP} />
        </clipPath>
        <clipPath id="dsk-right-clip">
          <polygon points={RIGHT_TOP} />
        </clipPath>
      </defs>

      <rect
        x={L_BACK}
        y={-60}
        width={R_BACK - L_BACK}
        height={60}
        fill="url(#dsk-wall-shadow)"
        transform={`translate(0 ${BACK})`}
      />

      <g clipPath="url(#dsk-left-clip)">
        <polygon points={LEFT_TOP} fill="url(#dsk-left-v)" />
        <polygon points={LEFT_TOP} fill="url(#dsk-left-light)" />
        <Grain lines={LEFT_GRAIN} dark="#6e4f30" />
      </g>
      <g clipPath="url(#dsk-right-clip)">
        <polygon points={RIGHT_TOP} fill="url(#dsk-right-v)" />
        <polygon points={RIGHT_TOP} fill="url(#dsk-right-h)" />
        <Grain lines={RIGHT_GRAIN} dark="#674a2c" />
      </g>

      <g clipPath="url(#dsk-left-clip)">
        <rect x={L_BACK} y={0} width={ST.x - L_BACK} height={34} fill="url(#dsk-contact)" transform={`translate(0 ${BACK})`} />
      </g>
      <g clipPath="url(#dsk-right-clip)">
        <rect x={ST.x - 10} y={0} width={R_BACK - ST.x + 10} height={34} fill="url(#dsk-contact)" transform={`translate(0 ${BACK})`} />
      </g>
      <rect x={L_FRONT} y={FRONT - 10} width={R_FRONT - L_FRONT} height={10} fill="url(#dsk-front-lip)" />

      <line x1={L_BACK} y1={BACK} x2={L_FRONT} y2={FRONT} stroke="#fff4e2" strokeOpacity="0.6" strokeWidth="1.4" />
      <line x1={R_BACK} y1={BACK} x2={R_FRONT} y2={FRONT} stroke="#3a2a18" strokeOpacity="0.35" strokeWidth="1.4" />

      <path
        d={`M${ST.x} ${BACK} L${SB.x} ${FRONT}`}
        stroke="#5e452b"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      <path
        d={`M${ST.x + 1.6} ${BACK} L${SB.x + 1.8} ${FRONT}`}
        stroke="#fbeedb"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <path
        d={`M${seamXAt(BACK) - 2} ${BACK} L${SB.x - 2.5} ${FRONT}`}
        stroke="#3a2a18"
        strokeOpacity="0.08"
        strokeWidth="4"
      />

      <polygon points={LEFT_EDGE} fill="url(#dsk-edge-left)" />
      <polygon points={RIGHT_EDGE} fill="url(#dsk-edge-right)" />
      <line x1={SB.x} y1={FRONT} x2={SB.x} y2={FRONT + EDGE} stroke="#4a3520" strokeOpacity="0.6" strokeWidth="1.2" />
      <line x1={L_FRONT} y1={FRONT + 0.6} x2={R_FRONT} y2={FRONT + 0.6} stroke="#fff6e6" strokeOpacity="0.55" strokeWidth="1.2" />
      <line
        x1={L_FRONT + 3}
        y1={FRONT + EDGE - 0.5}
        x2={R_FRONT - 3}
        y2={FRONT + EDGE - 0.5}
        stroke="#2e2014"
        strokeOpacity="0.7"
        strokeWidth="1"
      />
    </svg>
  );
}
