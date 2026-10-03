import { ContactShadow, f } from './PhotoSvg';

// A tapered round pot seen from slightly above. `children` render inside the
// opening (behind the front rim); `front` renders over the pot body.
export default function Pot({ id, top, bottom, ry, lip = 0, palette, shade = 0, children, front }) {
  const cx = f((top.l + top.r) / 2);
  const rx = f((top.r - top.l) / 2);
  const bcx = f((bottom.l + bottom.r) / 2);
  const body =
    `M${top.l},${top.y} A${rx},${ry} 0 0 0 ${top.r},${top.y} ` +
    `L${bottom.r},${f(bottom.y - 3)} Q${f(bottom.r - 0.3)},${f(bottom.y + 0.3)} ${f(bottom.r - 4)},${f(bottom.y + 0.8)} ` +
    `Q${bcx},${f(bottom.y + 2.4)} ${f(bottom.l + 4)},${f(bottom.y + 0.8)} ` +
    `Q${f(bottom.l + 0.3)},${f(bottom.y + 0.3)} ${bottom.l},${f(bottom.y - 3)}Z`;

  const taperL = (bottom.l - top.l) / (bottom.y - top.y);
  const taperR = (top.r - bottom.r) / (bottom.y - top.y);
  const lipL = f(top.l + taperL * lip);
  const lipR = f(top.r - taperR * lip);
  const lipRx = f((lipR - lipL) / 2);
  const lipD =
    `M${f(top.l - 0.7)},${top.y} A${f(rx + 0.7)},${ry} 0 0 0 ${f(top.r + 0.7)},${top.y} ` +
    `L${f(lipR + 0.6)},${f(top.y + lip)} A${f(lipRx + 0.6)},${ry} 0 0 1 ${f(lipL - 0.6)},${f(top.y + lip)}Z`;
  const p = (s) => `acc-${id}-${s}`;

  return (
    <>
      <defs>
        <linearGradient id={p('body')} gradientUnits="userSpaceOnUse" x1={top.l} y1="0" x2={top.r} y2="0">
          <stop offset="0" stopColor={palette.edgeL} />
          <stop offset="0.09" stopColor={palette.light} />
          <stop offset="0.35" stopColor={palette.light} />
          <stop offset="0.66" stopColor={palette.mid} />
          <stop offset="0.9" stopColor={palette.dark} />
          <stop offset="1" stopColor={palette.edgeR} />
        </linearGradient>
        <linearGradient id={p('ao')} gradientUnits="userSpaceOnUse" x1="0" y1={top.y} x2="0" y2={bottom.y + 2}>
          <stop offset="0" stopColor="#0d1310" stopOpacity={shade} />
          <stop offset="0.28" stopColor="#0d1310" stopOpacity="0" />
          <stop offset="0.82" stopColor="#0d1310" stopOpacity="0" />
          <stop offset="1" stopColor="#0d1310" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <ContactShadow id={p('shadow')} cx={bcx + 3} cy={bottom.y + 1} rx={f((bottom.r - bottom.l) * 0.62)} ry={5} opacity={0.5} />
      <ContactShadow id={p('cshadow')} cx={bcx + 1} cy={bottom.y + 0.8} rx={f((bottom.r - bottom.l) * 0.5)} ry={2.2} opacity={0.5} />

      <ellipse cx={cx} cy={top.y} rx={rx} ry={ry} fill={palette.soil} />
      <path
        d={`M${top.l},${top.y} A${rx},${ry} 0 0 1 ${top.r},${top.y}`}
        stroke={palette.rim}
        strokeWidth="0.9"
        strokeOpacity="0.8"
        fill="none"
      />
      {children}

      <path d={body} fill={`url(#${p('body')})`} />
      <path d={body} fill={`url(#${p('ao')})`} />
      {lip > 0 && (
        <>
          <path d={lipD} fill={`url(#${p('body')})`} />
          <path d={lipD} fill={`url(#${p('ao')})`} />
          <path
            d={`M${lipL},${f(top.y + lip + 0.5)} A${lipRx},${ry} 0 0 0 ${lipR},${f(top.y + lip + 0.5)}`}
            stroke="#1a201d"
            strokeOpacity="0.22"
            strokeWidth="1.1"
            fill="none"
          />
          <path
            d={`M${f(lipL - 0.5)},${f(top.y + lip - 0.4)} A${lipRx},${ry} 0 0 0 ${f(lipR + 0.5)},${f(top.y + lip - 0.4)}`}
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="0.6"
            fill="none"
          />
        </>
      )}
      <path
        d={`M${top.l},${top.y} A${rx},${ry} 0 0 0 ${top.r},${top.y}`}
        stroke={palette.rim}
        strokeWidth="0.8"
        strokeOpacity="0.9"
        fill="none"
      />
      {front}
    </>
  );
}
