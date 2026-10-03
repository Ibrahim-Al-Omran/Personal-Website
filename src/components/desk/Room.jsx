import { BASEBOARD_HEIGHT, VANISH, WALL_BASE_Y } from './room/roomGeometry';

// Just enough room to cover the contain-fit stage on 32:9 and tall portrait viewports.
const L = -1100;
const T = -1000;
const R = 2700;
const B = 2000;

const BASE_TOP = WALL_BASE_Y - BASEBOARD_HEIGHT;

const PLANK_LINES = (() => {
  const lines = [];
  for (let x0 = L + 4; x0 <= R; x0 += 64) {
    const k = (B - VANISH.y) / (WALL_BASE_Y - VANISH.y);
    lines.push({ x1: x0, y1: WALL_BASE_Y, x2: VANISH.x + (x0 - VANISH.x) * k, y2: B });
  }
  return lines;
})();

const xAt = (l, y) => l.x1 + ((l.x2 - l.x1) * (y - l.y1)) / (l.y2 - l.y1);
const r1 = (n) => Math.round(n * 10) / 10;

// Dark oak boards: each board between two seams gets its own tone, so the floor
// reads as individual planks rather than one flat colour.
const { PLANK_JOINTS, BOARDS, GRAIN } = (() => {
  const joints = [];
  const boards = [];
  const grain = [];
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  PLANK_LINES.forEach((line, i) => {
    const next = PLANK_LINES[i + 1];
    if (!next) return;
    const cuts = [WALL_BASE_Y];
    for (let t = 0.03 + rand() * 0.3; t < 1; t += 0.3 + rand() * 0.35) {
      const y = WALL_BASE_Y + (B - WALL_BASE_Y) * t * t;
      cuts.push(y);
      joints.push({ x1: xAt(line, y), x2: xAt(next, y), y });
    }
    cuts.push(B);
    for (let c = 0; c < cuts.length - 1; c++) {
      const [y0, y1] = [cuts[c], cuts[c + 1]];
      const tone = rand() * 2 - 1;
      boards.push({
        points: [xAt(line, y0), y0, xAt(next, y0), y0, xAt(next, y1), y1, xAt(line, y1), y1].map(r1).join(' '),
        fill: tone > 0 ? '#9a6e45' : '#0d0704',
        opacity: r1(Math.abs(tone) * (tone > 0 ? 0.16 : 0.3) * 100) / 100,
      });
    }
    for (let g = 0; g < 2; g++) {
      const f = 0.2 + rand() * 0.6;
      const mix = (y) => xAt(line, y) + (xAt(next, y) - xAt(line, y)) * f;
      grain.push({ x1: r1(mix(WALL_BASE_Y)), y1: WALL_BASE_Y, x2: r1(mix(B)), y2: B, o: r1((0.04 + rand() * 0.06) * 100) / 100 });
    }
  });
  return { PLANK_JOINTS: joints, BOARDS: boards, GRAIN: grain };
})();

export default function Room() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ left: L, top: T, width: R - L, height: B - T }}
      viewBox={`${L} ${T} ${R - L} ${B - T}`}
    >
      <defs>
        <linearGradient id="room-wall-h" gradientUnits="userSpaceOnUse" x1={-900} y1={0} x2={2500} y2={0}>
          <stop offset="0" stopColor="#a6a39c" />
          <stop offset="1" stopColor="#a6a39c" />
        </linearGradient>
        <linearGradient id="room-wall-v" gradientUnits="userSpaceOnUse" x1={0} y1={-500} x2={0} y2={WALL_BASE_Y}>
          <stop offset="0" stopColor="#1d1b18" stopOpacity="0.04" />
          <stop offset="1" stopColor="#1d1b18" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="room-floor" gradientUnits="userSpaceOnUse" x1={0} y1={WALL_BASE_Y} x2={0} y2={1700}>
          <stop offset="0" stopColor="#342316" />
          <stop offset="0.25" stopColor="#45301e" />
          <stop offset="1" stopColor="#5a3d26" />
        </linearGradient>
        <radialGradient id="room-floor-sheen" gradientUnits="userSpaceOnUse" cx={800} cy={1150} r={900}>
          <stop offset="0" stopColor="#f3d9b5" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#f3d9b5" stopOpacity="0.035" />
          <stop offset="1" stopColor="#f3d9b5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="room-floor-ao" gradientUnits="userSpaceOnUse" x1={0} y1={WALL_BASE_Y} x2={0} y2={WALL_BASE_Y + 40}>
          <stop offset="0" stopColor="#1a160f" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1a160f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="room-baseboard" gradientUnits="userSpaceOnUse" x1={0} y1={BASE_TOP} x2={0} y2={WALL_BASE_Y}>
          <stop offset="0" stopColor="#e6e2da" />
          <stop offset="0.14" stopColor="#d3cfc6" />
          <stop offset="0.22" stopColor="#c2beb5" />
          <stop offset="1" stopColor="#b9b5ac" />
        </linearGradient>
      </defs>

      <rect x={L} y={WALL_BASE_Y} width={R - L} height={B - WALL_BASE_Y} fill="url(#room-floor)" />
      {BOARDS.map((b, i) => (
        <polygon key={i} points={b.points} fill={b.fill} opacity={b.opacity} />
      ))}
      <g stroke="#c49a6c" strokeWidth="1">
        {GRAIN.map((g, i) => (
          <line key={i} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} strokeOpacity={g.o} />
        ))}
      </g>
      <rect x={L} y={WALL_BASE_Y} width={R - L} height={B - WALL_BASE_Y} fill="url(#room-floor-sheen)" />
      <g stroke="#0a0503" strokeOpacity="0.55" strokeWidth="1.2">
        {PLANK_LINES.map((l) => (
          <line key={l.x1} {...l} />
        ))}
      </g>
      <g stroke="#0a0503" strokeOpacity="0.45" strokeWidth="1">
        {PLANK_JOINTS.map((j, i) => (
          <line key={i} x1={j.x1} y1={j.y} x2={j.x2} y2={j.y} />
        ))}
      </g>
      <rect x={L} y={WALL_BASE_Y} width={R - L} height={40} fill="url(#room-floor-ao)" />

      <rect x={L} y={T} width={R - L} height={BASE_TOP - T} fill="url(#room-wall-h)" />
      <rect x={L} y={T} width={R - L} height={BASE_TOP - T} fill="url(#room-wall-v)" />
      <rect x={L} y={BASE_TOP} width={R - L} height={BASEBOARD_HEIGHT} fill="url(#room-baseboard)" />
      <line x1={L} y1={BASE_TOP + 0.5} x2={R} y2={BASE_TOP + 0.5} stroke="#f4f1ea" strokeOpacity="0.8" />
    </svg>
  );
}
