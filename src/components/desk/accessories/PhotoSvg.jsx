import { prect } from '../sceneLayout';

// Rounded so server and client render identical attribute strings.
export const f = (n) => Math.round(n * 100) / 100;

// An SVG placed over `box` (photo px: x1, y1, x2, y2) whose user units ARE
// photo pixels, so shapes can be drawn with coordinates read off the photo.
// Overflow is visible: shadows and leaves may extend past the box.
export default function PhotoSvg({ box, children, style, ref }) {
  const [x1, y1, x2, y2] = box;
  const r = prect(x1, y1, x2, y2);
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={`${x1} ${y1} ${x2 - x1} ${y2 - y1}`}
      style={{
        position: 'absolute',
        left: f(r.x),
        top: f(r.y),
        width: f(r.width),
        height: f(r.height),
        overflow: 'visible',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </svg>
  );
}

// Soft elliptical shadow where an object meets the oak desk top.
export function ContactShadow({ id, cx, cy, rx, ry, opacity = 0.45, color = '#2b1c0d' }) {
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset="0.5" stopColor={color} stopOpacity={f(opacity * 0.5)} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
    </>
  );
}
