import PhotoSvg from './PhotoSvg';

// Black cables running behind the objects at the back of the desk. Drawn first
// so the PS5, Echo Dot, pots and monitors cover their ends.
const CABLES = [
  // Echo Dot power cable, curving in from behind the PS5
  { d: 'M184,345 C199,351 213,361 221,374 C225.5,381 228,388 229,395', w: 2.6 },
  // PS5 cable dropping behind the Echo Dot
  { d: 'M186,367 C194,370 199,377 200.3,386 L201,400', w: 2.1 },
];

export default function BackCables() {
  return (
    <PhotoSvg box={[180, 340, 235, 405]}>
      {CABLES.map(({ d, w }) => (
        <g key={d} fill="none" strokeLinecap="round">
          <path d={d} stroke="#0d0e11" strokeWidth={w} />
          <path d={d} stroke="#5a5d66" strokeOpacity="0.35" strokeWidth={w * 0.25} transform="translate(-0.45 -0.2)" />
        </g>
      ))}
    </PhotoSvg>
  );
}
