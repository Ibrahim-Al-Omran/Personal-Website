import PhotoSvg, { ContactShadow } from './PhotoSvg';
import { f } from './PhotoSvg';

// Creative Pebble style speaker: a white sphere with an angled flat face cut
// into its top, the driver set into that face, sitting on a flattened base.
export default function PebbleSpeaker({ id, cx, cy, r, bottomY, face, driver, knob }) {
  const box = [cx - r - 6, cy - r - 4, cx + r + 8, bottomY + 6];
  const p = (s) => `acc-${id}-${s}`;
  const u = (s) => `url(#${p(s)})`;

  return (
    <PhotoSvg box={box}>
      <defs>
        <clipPath id={p('clip')}>
          <rect x={cx - r - 1} y={cy - r - 1} width={r * 2 + 2} height={f(bottomY - (cy - r - 1))} />
        </clipPath>
        <radialGradient id={p('body')} gradientUnits="userSpaceOnUse" cx={f(cx - r * 0.42)} cy={f(cy + r * 0.12)} r={f(r * 1.5)}>
          <stop offset="0" stopColor="#eef6fc" />
          <stop offset="0.35" stopColor="#dfeaf4" />
          <stop offset="0.65" stopColor="#ccd9e6" />
          <stop offset="0.86" stopColor="#b3c0cf" />
          <stop offset="1" stopColor="#97a3b3" />
        </radialGradient>
        <linearGradient id={p('base')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#1c2430" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={p('face')} gradientUnits="userSpaceOnUse" x1="0" y1={face.cy - face.ry} x2="0" y2={face.cy + face.ry}>
          <stop offset="0" stopColor="#8995a4" />
          <stop offset="0.3" stopColor="#b2bfcd" />
          <stop offset="1" stopColor="#ccd8e4" />
        </linearGradient>
        <radialGradient id={p('cone')} cx="0.4" cy="0.38" r="0.65">
          <stop offset="0" stopColor="#c2b8ac" />
          <stop offset="0.45" stopColor="#968a7f" />
          <stop offset="1" stopColor="#5b524c" />
        </radialGradient>
        <radialGradient id={p('cap')} cx="0.38" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#d4cbc0" />
          <stop offset="1" stopColor="#8c8279" />
        </radialGradient>
      </defs>

      <ContactShadow id={p('shadow')} cx={cx + 4} cy={bottomY + 0.5} rx={r * 1.05} ry={5.5} opacity={0.5} />
      <ContactShadow id={p('ao')} cx={cx + 1} cy={bottomY} rx={r * 0.7} ry={2.2} opacity={0.55} />

      <g clipPath={u('clip')}>
        <circle cx={cx} cy={cy} r={r} fill={u('body')} />
        <circle cx={cx} cy={cy} r={r} fill={u('base')} />
      </g>
      <ellipse cx={cx} cy={bottomY - 0.6} rx={f(r * 0.6)} ry="1.2" fill="#6d7785" fillOpacity="0.5" />

      {/* angled face */}
      <ellipse cx={face.cx} cy={face.cy} rx={face.rx} ry={face.ry} fill={u('face')} />
      <path
        d={`M${face.cx - face.rx},${face.cy} A${face.rx},${face.ry} 0 0 0 ${face.cx + face.rx},${face.cy}`}
        stroke="#eef5fb"
        strokeOpacity="0.75"
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d={`M${face.cx - face.rx + 1},${face.cy - 1} A${face.rx - 1},${face.ry - 1} 0 0 1 ${face.cx + face.rx - 1},${face.cy - 1}`}
        stroke="#5d6878"
        strokeOpacity="0.35"
        strokeWidth="0.8"
        fill="none"
      />

      {/* driver */}
      <ellipse cx={driver.cx} cy={driver.cy + 0.6} rx={driver.rx + 0.8} ry={driver.ry + 0.8} fill="#e6eef6" fillOpacity="0.55" />
      <ellipse cx={driver.cx} cy={driver.cy} rx={driver.rx} ry={driver.ry} fill="#25272b" />
      <ellipse cx={driver.cx} cy={driver.cy} rx={driver.rx} ry={driver.ry} fill="none" stroke="#727986" strokeWidth="0.6" />
      <ellipse cx={driver.cx + 0.3} cy={driver.cy + 0.2} rx={f(driver.rx * 0.76)} ry={f(driver.ry * 0.76)} fill={u('cone')} />
      <ellipse cx={driver.cx + 0.4} cy={driver.cy + 0.3} rx={f(driver.rx * 0.38)} ry={f(driver.ry * 0.38)} fill={u('cap')} />
      <ellipse
        cx={f(driver.cx - driver.rx * 0.45)}
        cy={f(driver.cy - driver.ry * 0.55)}
        rx={f(driver.rx * 0.32)}
        ry={f(driver.ry * 0.14)}
        fill="#ffffff"
        fillOpacity="0.22"
        transform={`rotate(-22 ${f(driver.cx - driver.rx * 0.45)} ${f(driver.cy - driver.ry * 0.55)})`}
      />

      {knob && (
        <g>
          <ellipse cx={knob.cx + 1.3} cy={knob.cy + 0.9} rx="4.6" ry="3.4" fill="#4c535e" fillOpacity="0.75" />
          <ellipse cx={knob.cx} cy={knob.cy} rx="4.6" ry="3.4" fill="#d7e2ec" />
          <ellipse cx={knob.cx - 0.6} cy={knob.cy - 0.8} rx="3" ry="1.6" fill="#f2f7fb" fillOpacity="0.8" />
        </g>
      )}
    </PhotoSvg>
  );
}
