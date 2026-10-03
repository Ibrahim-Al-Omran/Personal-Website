const DIGITS = {
  0: 'abcdef',
  1: 'bc',
  2: 'abged',
  3: 'abgcd',
  4: 'fgbc',
  5: 'afgcd',
  6: 'afgedc',
  7: 'abc',
  8: 'abcdefg',
  9: 'abcdfg',
  ' ': '',
};

const W = 8;
const H = 14;
const T = 1.7;
const GAP = 3;
const DOT = 2.6;

const SEGMENTS = {
  a: { x: T * 0.7, y: 0, w: W - T * 1.4, h: T },
  g: { x: T * 0.7, y: H / 2 - T / 2, w: W - T * 1.4, h: T },
  d: { x: T * 0.7, y: H - T, w: W - T * 1.4, h: T },
  f: { x: 0, y: T * 0.7, w: T, h: H / 2 - T * 1.2 },
  b: { x: W - T, y: T * 0.7, w: T, h: H / 2 - T * 1.2 },
  e: { x: 0, y: H / 2 + T * 0.5, w: T, h: H / 2 - T * 1.2 },
  c: { x: W - T, y: H / 2 + T * 0.5, w: T, h: H / 2 - T * 1.2 },
};

/** Renders e.g. "118.0" / " 72.0" as a 7-segment LED readout (3 digits, a point, 1 digit). */
export default function SevenSegment({ text, color, ghost }) {
  const [whole, frac = '0'] = text.split('.');
  const chars = [...whole.padStart(3, ' ').slice(-3), '.', frac[0]];
  let x = 0;
  const cells = chars.map((ch, i) => {
    if (ch === '.') {
      const cell = <rect key={i} x={x - 0.6} y={H - DOT * 0.85} width={DOT * 0.85} height={DOT * 0.85} rx={0.4} fill={color} />;
      x += DOT;
      return cell;
    }
    const on = DIGITS[ch] ?? '';
    const cellX = x;
    x += W + GAP;
    return (
      <g key={i} transform={`translate(${cellX} 0)`}>
        {Object.entries(SEGMENTS).map(([name, s]) => (
          <rect key={name} x={s.x} y={s.y} width={s.w} height={s.h} rx={T / 2} fill={on.includes(name) ? color : ghost} />
        ))}
      </g>
    );
  });
  const width = x - GAP;
  return (
    <svg viewBox={`-1 -0.5 ${width + 2} ${H + 1}`} style={{ width: width + 2, height: H + 1, overflow: 'visible' }}>
      <g transform="skewX(-7)">{cells}</g>
    </svg>
  );
}
