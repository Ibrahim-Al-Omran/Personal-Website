import PhotoSvg, { ContactShadow } from './PhotoSvg';

const CX = 229;
const TOP = 396;
const BOTTOM = 416.5;
const RX = 30;

export default function EchoDot() {
  return (
    <PhotoSvg box={[195, 385, 265, 428]}>
      <defs>
        <linearGradient id="acc-echo-side" gradientUnits="userSpaceOnUse" x1={CX - RX} y1="0" x2={CX + RX} y2="0">
          <stop offset="0" stopColor="#47505c" />
          <stop offset="0.25" stopColor="#535d6a" />
          <stop offset="0.6" stopColor="#3e4652" />
          <stop offset="1" stopColor="#2a3039" />
        </linearGradient>
        <linearGradient id="acc-echo-side-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="0.25" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
        <pattern id="acc-echo-fabric" patternUnits="userSpaceOnUse" width="1.1" height="1.1">
          <rect width="1.1" height="1.1" fill="#ffffff" fillOpacity="0.03" />
          <circle cx="0.55" cy="0.55" r="0.28" fill="#0b0e13" fillOpacity="0.45" />
        </pattern>
        <radialGradient id="acc-echo-top" cx="0.42" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#2e3440" />
          <stop offset="1" stopColor="#1b2028" />
        </radialGradient>
      </defs>

      <ContactShadow id="acc-echo-shadow" cx={CX + 2} cy={BOTTOM + 3.5} rx={36} ry={5.5} opacity={0.55} />

      <path
        d={`M${CX - RX},${TOP} L${CX - RX},${BOTTOM} A${RX},4.6 0 0 0 ${CX + RX},${BOTTOM} L${CX + RX},${TOP}Z`}
        fill="url(#acc-echo-side)"
      />
      <path
        d={`M${CX - RX},${TOP} L${CX - RX},${BOTTOM} A${RX},4.6 0 0 0 ${CX + RX},${BOTTOM} L${CX + RX},${TOP}Z`}
        fill="url(#acc-echo-fabric)"
      />
      <path
        d={`M${CX - RX},${TOP} L${CX - RX},${BOTTOM} A${RX},4.6 0 0 0 ${CX + RX},${BOTTOM} L${CX + RX},${TOP}Z`}
        fill="url(#acc-echo-side-v)"
      />

      <ellipse cx={CX} cy={TOP} rx={RX} ry={5} fill="#1d222b" />
      <ellipse cx={CX} cy={TOP - 0.3} rx={RX - 1.4} ry={4.3} fill="url(#acc-echo-top)" />
      <path
        d={`M${CX - RX + 0.3},${TOP + 0.4} A${RX - 0.3},4.7 0 0 0 ${CX + RX - 0.3},${TOP + 0.4}`}
        stroke="#6a7482"
        strokeOpacity="0.7"
        strokeWidth="0.6"
        fill="none"
      />
      {[
        [CX, TOP - 2.6],
        [CX - 11, TOP - 0.2],
        [CX + 11, TOP - 0.2],
        [CX, TOP + 2.3],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <ellipse cx={x} cy={y} rx="1.8" ry="0.6" fill="#3d4450" />
          <ellipse cx={x - 0.3} cy={y - 0.2} rx="1.1" ry="0.25" fill="#59626f" fillOpacity="0.6" />
        </g>
      ))}
    </PhotoSvg>
  );
}
