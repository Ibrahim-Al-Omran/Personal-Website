import PhotoSvg, { ContactShadow } from './PhotoSvg';

// Vertical PS5 Digital Edition, seen from its left side (mirror of Sony's
// product shot). The near white plate is the big face on the right and runs
// up behind the left monitor. Beyond it, the glossy black core and a sliver of
// the far plate: wide at the top, pinching in toward the bottom, so the whole
// console narrows down to the round stand.
const BOTTOM_SLOPE = -0.2; // near plate's bottom edge, receding to the right
const BOTTOM_TILT = (Math.atan(BOTTOM_SLOPE) * 180) / Math.PI;
// The stand lies flat on the desk, so its outline is a level ellipse foreshortened
// by the viewing elevation, centred under the console's footprint.
const DISC = { cx: 114, cy: 407, rx: 46, ry: 15, h: 5 };

// Thin sliver on the left. The top still runs behind the core's curve so the
// wall never shows through. The core fills down to the plates; its bottom
// edge goes across to the near plate rather than following the far plate.
const FAR_PLATE =
  'M20,171 Q20,166.8 24,166.9 L66,169 L66,418 L40,418 L29,419.6 Q26.6,420 26.4,417.6 Z';
const CORE = 'M34,190 C34,178 42,172 56,171 L66,170.4 L66,418 L40,418 Z';
const NEAR_PLATE =
  'M66,165.2 Q66,161.7 69.6,161.9 L200,169.6 L199,300 L199,392 Q199,395.2 196,395.8 ' +
  'L66.4,421.6 Q63,422.2 63,418.8 Z';

export default function PS5() {
  const { cx, cy, rx, ry, h } = DISC;
  return (
    <PhotoSvg box={[10, 155, 215, 440]}>
      <defs>
        <linearGradient id="acc-ps5-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f8e93" />
          <stop offset="0.35" stopColor="#77767b" />
          <stop offset="0.75" stopColor="#5f5e63" />
          <stop offset="1" stopColor="#4e4d52" />
        </linearGradient>
        <linearGradient id="acc-ps5-core" gradientUnits="userSpaceOnUse" x1="34" y1="0" x2="66" y2="0">
          <stop offset="0" stopColor="#0a0d15" />
          <stop offset="0.35" stopColor="#1c2333" />
          <stop offset="0.7" stopColor="#111722" />
          <stop offset="1" stopColor="#080b11" />
        </linearGradient>
        <linearGradient id="acc-ps5-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#959593" />
          <stop offset="0.5" stopColor="#8b8b89" />
          <stop offset="1" stopColor="#7a7b7d" />
        </linearGradient>
        <linearGradient id="acc-ps5-front-h" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="200" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="0.2" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="0.75" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="acc-ps5-disc-top" gradientUnits="userSpaceOnUse" x1="0" y1={cy - ry} x2="0" y2={cy + ry}>
          <stop offset="0" stopColor="#0c0f16" />
          <stop offset="0.6" stopColor="#1a1f2b" />
          <stop offset="1" stopColor="#2a3140" />
        </linearGradient>
        <linearGradient id="acc-ps5-disc-side" gradientUnits="userSpaceOnUse" x1={cx - rx} y1="0" x2={cx + rx} y2="0">
          <stop offset="0" stopColor="#1d2230" />
          <stop offset="0.35" stopColor="#0d1017" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        {/* soft shadow the overhanging console casts onto the oak */}
        <radialGradient id="acc-ps5-hover">
          <stop offset="0" stopColor="#2b1c0d" stopOpacity="0.4" />
          <stop offset="0.6" stopColor="#2b1c0d" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2b1c0d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadows under the ends of the console that overhang the stand */}
      <ellipse
        cx="140"
        cy="414"
        rx="74"
        ry="7"
        fill="url(#acc-ps5-hover)"
        transform={`rotate(${BOTTOM_TILT.toFixed(2)} 140 414)`}
      />
      <ellipse
        cx="44"
        cy="424"
        rx="26"
        ry="4.5"
        fill="url(#acc-ps5-hover)"
        transform={`rotate(${BOTTOM_TILT.toFixed(2)} 44 424)`}
      />

      <g>
        <ContactShadow id="acc-ps5-shadow" cx={cx + 2} cy={cy + h + 1.5} rx={rx + 9} ry={ry + 4} opacity={0.6} />
        <path
          d={`M${cx - rx},${cy} L${cx - rx},${cy + h} A${rx},${ry} 0 0 0 ${cx + rx},${cy + h} L${cx + rx},${cy}Z`}
          fill="url(#acc-ps5-disc-side)"
        />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#acc-ps5-disc-top)" />
        <path
          d={`M${cx - rx + 1},${cy + 0.4} A${rx - 1},${ry - 0.4} 0 0 0 ${cx + rx - 1},${cy + 0.4}`}
          stroke="#7d879c"
          strokeOpacity="0.5"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d={`M${cx - rx},${cy + h} A${rx},${ry} 0 0 0 ${cx + rx},${cy + h}`}
          stroke="#000"
          strokeOpacity="0.5"
          strokeWidth="0.6"
          fill="none"
        />
      </g>

      {/* far plate: a thin sliver beyond the core, slanting in toward the bottom */}
      <path d={FAR_PLATE} fill="url(#acc-ps5-back)" />
      <path d="M20.8,171 L26.8,416.8" stroke="#b9b8bd" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
      <path d="M24,167.1 L64,169.5" stroke="#c6c5c9" strokeOpacity="0.6" strokeWidth="0.7" fill="none" />

      {/* glossy black core, rounded over at the top and narrowing toward the bottom */}
      <path d={CORE} fill="url(#acc-ps5-core)" />
      <path d="M34.6,190 C34.6,178.6 42.4,172.8 56,171.8 L64,171.2" stroke="#9a99a0" strokeOpacity="0.45" strokeWidth="0.7" fill="none" />
      <path d="M41,198 L43.2,412" stroke="#8f9bb4" strokeOpacity="0.16" strokeWidth="2.2" fill="none" />
      <path d="M40,418 L66,418" stroke="#000" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />

      {/* near plate (continues under the monitor) */}
      <path d={NEAR_PLATE} fill="url(#acc-ps5-front)" />
      <path d={NEAR_PLATE} fill="url(#acc-ps5-front-h)" />
      <path d="M66.5,165 L63.6,418.6" stroke="#d6d6d4" strokeOpacity="0.65" strokeWidth="0.9" fill="none" />
      <path d="M69.6,162.5 L130,166" stroke="#dcdcda" strokeOpacity="0.65" strokeWidth="0.8" fill="none" />
      <path d="M198.6,300 L198.6,392" stroke="#b9b9b7" strokeOpacity="0.45" strokeWidth="0.8" fill="none" />
      <path
        d={`M66.6,421 L195.8,${(421 + BOTTOM_SLOPE * (195.8 - 66.6)).toFixed(2)}`}
        stroke="#3e3f44"
        strokeOpacity="0.55"
        strokeWidth="0.8"
        fill="none"
      />
    </PhotoSvg>
  );
}
