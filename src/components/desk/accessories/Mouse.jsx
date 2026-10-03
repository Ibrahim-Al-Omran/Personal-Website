import PhotoSvg, { ContactShadow, f } from './PhotoSvg';

// Logitech MX Master 4 (pale grey), right-handed, seen from above and behind
// at a 3/4 angle. Modelled in millimetres (x right, y toward the front of the
// mouse, z up, origin at the centre of its footprint) and projected
// orthographically onto the photo, so every curve stays consistent.
const K = 0.73; // photo px per mm
const YAW = (-20 * Math.PI) / 180; // front turned left, so the thumb side faces the viewer
// Camera elevation, matched to the rest of the desk (the keyboard reads ~24°)
// so the mouse sits flat on the oak instead of tipping up toward the viewer.
const ELEV = (24 * Math.PI) / 180;
const ORIGIN = [672, 461]; // level with the keyboard, just off its right end
const CY = Math.cos(YAW);
const SY = Math.sin(YAW);
const CE = Math.cos(ELEV);
const SE = Math.sin(ELEV);

const P = ([x, y, z]) => [
  f(ORIGIN[0] + K * (x * CY + y * SY)),
  f(ORIGIN[1] - K * ((-x * SY + y * CY) * SE + z * CE)),
];

// Smooth curve (Catmull-Rom as cubic Béziers) through projected points.
// A point with a 4th element 'c' is a sharp corner.
function curve(points, closed = true) {
  const pts = points.map((p) => ({ q: P(p), corner: p[3] === 'c' }));
  const n = pts.length;
  const at = (i) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${pts[0].q[0]},${pts[0].q[1]}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = at(i - 1).q;
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2).q;
    const c1 = p1.corner
      ? [p1.q[0] + (p2.q[0] - p1.q[0]) / 3, p1.q[1] + (p2.q[1] - p1.q[1]) / 3]
      : [p1.q[0] + (p2.q[0] - p0[0]) / 6, p1.q[1] + (p2.q[1] - p0[1]) / 6];
    const c2 = p2.corner
      ? [p2.q[0] - (p2.q[0] - p1.q[0]) / 3, p2.q[1] - (p2.q[1] - p1.q[1]) / 3]
      : [p2.q[0] - (p3[0] - p1.q[0]) / 6, p2.q[1] - (p3[1] - p1.q[1]) / 6];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${p2.q[0]},${p2.q[1]}`;
  }
  return closed ? `${d}Z` : d;
}

// Outer silhouette, from the left button's tip clockwise.
const SILHOUETTE = curve([
  [-17, 61, 21], [2, 62, 24], [21, 57, 21], [31, 41, 17], [35.5, 6, 19], [33, -28, 13],
  [24, -52, 4], [5, -63, 1.5], [-18, -59, 1.5], [-35, -47, 2.5], [-45, -27, 5], [-43, -5, 9],
  [-37, 17, 12], [-33, 38, 15], [-27, 54, 17],
]);

// Palm shell and the two main buttons.
const TOP = curve([
  [-17, 61, 22], [2, 62, 25], [21, 57, 22], [31, 41, 18], [35.5, 6, 20], [33, -28, 14],
  [24, -52, 5.5], [6, -61.5, 5], [-11, -57, 10], [-20, -44, 20], [-25, -20, 30], [-27.5, 6, 34],
  [-27, 30, 30], [-23, 50, 24],
]);

// Steep left flank under the shoulder, where the thumb wheel and buttons sit.
const SIDE = curve([
  [-23, 50, 24], [-27, 30, 30], [-27.5, 6, 34], [-25, -20, 30], [-20, -44, 20], [-25, -42, 13],
  [-31, -20, 12], [-35, 4, 12.5], [-35.5, 22, 13.5], [-32, 40, 15.5], [-27, 54, 17.5],
]);

// The flared thumb rest: its upper surface (the lip below it is the silhouette fill).
const THUMB_REST = curve([
  [-20, -55, 6], [-25, -42, 13], [-31, -20, 12], [-35, 4, 12.5], [-36, 17, 13.5], [-41.5, -4, 12.5],
  [-43.5, -26, 10.5], [-34.5, -45, 7.5],
]);

// Seams and details on the shell.
const BUTTON_SPLIT_FRONT = curve([[-1.5, 62, 25], [-1.5, 55, 28], [-1.5, 49, 31.5]], false);
const BUTTON_SPLIT_BACK = curve([[-1.5, 26.5, 39.5], [-1.5, 24, 40.5]], false);
const BUTTON_SEAM = curve([[-27, 14, 33], [-14, 13.5, 40.5], [-1.5, 13, 43], [14, 11, 41], [29, 8, 28]], false);
const SHOULDER_LIGHT = curve([[-22, 50, 24.5], [-26.5, 30, 30.5], [-27, 6, 34.5], [-24.5, -20, 30.5]], false);
const RIDGE_SHEEN = curve([[-14, -32, 47], [-9, -14, 49.5], [-6, 6, 46.5], [-5, 26, 39]], false);
// Wheel slot and MagSpeed wheel: a steel cylinder (axis along x) poking ~4mm
// out of the shell between the buttons.
const SLOT = curve([
  [-6, 49, 31.5], [-6, 38, 35.5], [-6, 27, 39], [3, 27, 39], [3, 38, 35.5], [3, 49, 31.5],
]);
const WHEEL_R = 12;
const WHEEL_C = [0, 38, 24.5];
const WHEEL_X = [-5, 2];
const wheelPoint = (x, t) => [x, WHEEL_C[1] + WHEEL_R * Math.cos(t), WHEEL_C[2] + WHEEL_R * Math.sin(t)];
const WHEEL_T = [0.62, 2.52]; // visible arc (radians from the +y axis toward +z)
const WHEEL_OUTLINE = (() => {
  const steps = 10;
  const arc = (x, from, to) =>
    Array.from({ length: steps + 1 }, (_, i) => wheelPoint(x, from + ((to - from) * i) / steps));
  const right = arc(WHEEL_X[1], WHEEL_T[0], WHEEL_T[1]).map(P);
  const left = arc(WHEEL_X[0], WHEEL_T[1], WHEEL_T[0]).map(P);
  return `M${[...right, ...left].map((p) => p.join(',')).join(' L')}Z`;
})();
const WHEEL_KNURL = (() => {
  const lines = [];
  for (let i = 1; i < 26; i++) {
    const t = WHEEL_T[0] + ((WHEEL_T[1] - WHEEL_T[0]) * i) / 26;
    const a = P(wheelPoint(WHEEL_X[0] + 0.4, t));
    const b = P(wheelPoint(WHEEL_X[1] - 0.4, t));
    lines.push(`M${a.join(',')} L${b.join(',')}`);
  }
  return lines.join(' ');
})();
const WHEEL_TOP = P(wheelPoint(-1.5, Math.PI / 2));

const MODE_BUTTON = curve([
  [-4.5, 23, 41], [1.5, 23, 41], [1.5, 18, 42.5, 'c'], [-4.5, 18, 42.5, 'c'],
]);

// Horizontal thumb wheel set into the flank, and the back/forward buttons below it.
const THUMB_WHEEL = curve([
  [-30.6, 22, 28.5], [-31.4, 12, 29.5], [-31, 3, 28.5], [-32.2, 2, 25.5], [-33, 12, 25], [-32.6, 22, 25.5],
]);
const THUMB_WHEEL_RIBS = (() => {
  const lines = [];
  for (let y = 4; y <= 21; y += 1.4) {
    const a = P([-31 - (Math.abs(y - 12) < 6 ? 0.4 : 0.1), y, 28.6]);
    const b = P([-32.6, y, 25.6]);
    lines.push(`M${a.join(',')} L${b.join(',')}`);
  }
  return lines.join(' ');
})();
const FORWARD_BUTTON = curve([
  [-32.6, 16.5, 22.8], [-33.2, 5.5, 23], [-34.6, 5.5, 17.6, 'c'], [-34.3, 16.5, 17.4, 'c'],
]);
const BACK_BUTTON = curve([
  [-33.1, 3.5, 23], [-33, -7, 22.6], [-34.3, -7, 17.3, 'c'], [-34.7, 3.5, 17.6, 'c'],
]);
// Haptic sense panel under the thumb (MX Master 4).
const HAPTIC = curve(
  Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [-38.5 + 4.2 * Math.cos(a), -9 + 5.6 * Math.sin(a), 12.2];
  })
);

// Plane of the palm rest's back slope, for the "logi" wordmark.
const LOGO_ORIGIN = P([2, -47, 37]);
const LOGO_X = P([3, -47, 37]);
const LOGO_Y = P([2, -47.7, 36.3]);
const LOGO_MATRIX = [
  f(LOGO_X[0] - LOGO_ORIGIN[0]),
  f(LOGO_X[1] - LOGO_ORIGIN[1]),
  f(LOGO_Y[0] - LOGO_ORIGIN[0]),
  f(LOGO_Y[1] - LOGO_ORIGIN[1]),
  LOGO_ORIGIN[0],
  LOGO_ORIGIN[1],
].join(' ');

const HUMP_LIGHT = P([-8, -16, 50]);
const RIGHT_DARK = P([34, -20, 12]);
const BACK_LOW = P([6, -62, 2]);
const SHADOW_C = P([-2, -10, 0]);
const SHOULDER_TOP = P([-27, 6, 34]);
const SHELF_LOW = P([-35, 4, 12]);

export default function Mouse() {
  return (
    <PhotoSvg box={[626, 418, 716, 489]}>
      <defs>
        <radialGradient id="acc-mx-top" gradientUnits="userSpaceOnUse" cx={HUMP_LIGHT[0]} cy={HUMP_LIGHT[1]} r="52">
          <stop offset="0" stopColor="#f6f7f8" />
          <stop offset="0.3" stopColor="#e9ebed" />
          <stop offset="0.62" stopColor="#d3d7db" />
          <stop offset="1" stopColor="#a9aeb4" />
        </radialGradient>
        <linearGradient
          id="acc-mx-top-shade"
          gradientUnits="userSpaceOnUse"
          x1={HUMP_LIGHT[0]}
          y1={HUMP_LIGHT[1]}
          x2={RIGHT_DARK[0]}
          y2={RIGHT_DARK[1]}
        >
          <stop offset="0.35" stopColor="#3d4652" stopOpacity="0" />
          <stop offset="1" stopColor="#3d4652" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="acc-mx-back-ao" gradientUnits="userSpaceOnUse" x1="0" y1={f(BACK_LOW[1] - 16)} x2="0" y2={BACK_LOW[1]}>
          <stop offset="0" stopColor="#2f3640" stopOpacity="0" />
          <stop offset="1" stopColor="#2f3640" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="acc-mx-side" gradientUnits="userSpaceOnUse" x1="0" y1={SHOULDER_TOP[1]} x2="0" y2={SHELF_LOW[1]}>
          <stop offset="0" stopColor="#c9ced3" />
          <stop offset="0.55" stopColor="#b3b9bf" />
          <stop offset="1" stopColor="#9aa1a8" />
        </linearGradient>
        <linearGradient id="acc-mx-rest" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#d8dce0" />
          <stop offset="1" stopColor="#bcc2c8" />
        </linearGradient>
        <linearGradient id="acc-mx-base" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#9ba2a9" />
          <stop offset="1" stopColor="#737a82" />
        </linearGradient>
        <linearGradient id="acc-mx-steel" gradientUnits="userSpaceOnUse" x1="0" y1={f(WHEEL_TOP[1] - 4)} x2="0" y2={f(WHEEL_TOP[1] + 6)}>
          <stop offset="0" stopColor="#f2f3f4" />
          <stop offset="0.35" stopColor="#b8bcc1" />
          <stop offset="0.7" stopColor="#7d8288" />
          <stop offset="1" stopColor="#5b6066" />
        </linearGradient>
        <linearGradient id="acc-mx-thumbwheel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a4a9ae" />
          <stop offset="1" stopColor="#5f646a" />
        </linearGradient>
        <linearGradient id="acc-mx-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="acc-mx-top-clip">
          <path d={TOP} />
        </clipPath>
      </defs>

      <ContactShadow id="acc-mx-shadow" cx={f(SHADOW_C[0] + 4)} cy={f(SHADOW_C[1] + 2)} rx={50} ry={14} opacity={0.42} />
      <ContactShadow id="acc-mx-ao" cx={f(SHADOW_C[0] + 1)} cy={f(SHADOW_C[1] + 3)} rx={38} ry={8} opacity={0.4} />

      <path d={SILHOUETTE} fill="url(#acc-mx-base)" />
      <path d={THUMB_REST} fill="url(#acc-mx-rest)" />
      <path d={HAPTIC} fill="#ffffff" fillOpacity="0.08" stroke="#9aa1a8" strokeOpacity="0.45" strokeWidth="0.35" />
      <path d={SIDE} fill="url(#acc-mx-side)" />

      <path d={THUMB_WHEEL} fill="#4d5258" transform="translate(0.25 0.35)" opacity="0.5" />
      <path d={THUMB_WHEEL} fill="url(#acc-mx-thumbwheel)" />
      <path d={THUMB_WHEEL_RIBS} stroke="#3e4247" strokeOpacity="0.55" strokeWidth="0.32" fill="none" />
      <path d={FORWARD_BUTTON} fill="#c3c8cd" stroke="#858c93" strokeWidth="0.35" />
      <path d={BACK_BUTTON} fill="#bcc1c7" stroke="#858c93" strokeWidth="0.35" />

      <path d={TOP} fill="url(#acc-mx-top)" />
      <g clipPath="url(#acc-mx-top-clip)">
        <path d={TOP} fill="url(#acc-mx-top-shade)" />
        <path d={TOP} fill="url(#acc-mx-back-ao)" />
        <path d={RIDGE_SHEEN} stroke="#ffffff" strokeOpacity="0.55" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d={RIDGE_SHEEN} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>
      <path d={SHOULDER_LIGHT} stroke="#ffffff" strokeOpacity="0.65" strokeWidth="0.6" strokeLinecap="round" fill="none" />

      <path d={BUTTON_SEAM} stroke="#8d949b" strokeOpacity="0.55" strokeWidth="0.4" fill="none" />
      <path d={BUTTON_SPLIT_FRONT} stroke="#7f868e" strokeOpacity="0.8" strokeWidth="0.45" fill="none" />
      <path d={BUTTON_SPLIT_BACK} stroke="#7f868e" strokeOpacity="0.7" strokeWidth="0.4" fill="none" />

      <path d={SLOT} fill="#3a3f45" />
      <path d={WHEEL_OUTLINE} fill="url(#acc-mx-steel)" />
      <path d={WHEEL_KNURL} stroke="#4a4f55" strokeOpacity="0.55" strokeWidth="0.22" fill="none" />
      <path d={WHEEL_OUTLINE} fill="none" stroke="#50555b" strokeWidth="0.3" />

      <path d={MODE_BUTTON} fill="#e1e4e7" stroke="#8a9198" strokeWidth="0.35" />

      <text
        transform={`matrix(${LOGO_MATRIX})`}
        x="0"
        y="0"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="4.6"
        textAnchor="middle"
        fill="#9ba2aa"
        fillOpacity="0.75"
      >
        logi
      </text>
    </PhotoSvg>
  );
}
