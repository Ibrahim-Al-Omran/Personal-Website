import { prect } from '../sceneLayout';

// Drawn directly in photo px: each SVG's viewBox is its photo-space box.
function PhotoSvg({ box, children }) {
  const [x1, y1, x2, y2] = box;
  const r = prect(x1, y1, x2, y2);
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute"
      style={{ left: r.x, top: r.y, width: r.width, height: r.height, overflow: 'visible' }}
      viewBox={`${x1} ${y1} ${x2 - x1} ${y2 - y1}`}
    >
      {children}
    </svg>
  );
}

// Blurred-looking contact shadows as radial gradients (no SVG filter passes).
function SoftShadowGradients({ id }) {
  return (
    <>
      <radialGradient id={`${id}-shadow-wide`}>
        <stop offset="0" stopColor="#4a3018" stopOpacity="0.22" />
        <stop offset="0.6" stopColor="#4a3018" stopOpacity="0.12" />
        <stop offset="1" stopColor="#4a3018" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-shadow-core`}>
        <stop offset="0" stopColor="#2a1a0c" stopOpacity="0.6" />
        <stop offset="0.55" stopColor="#2a1a0c" stopOpacity="0.4" />
        <stop offset="1" stopColor="#2a1a0c" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

// Soft darkening the monitors throw on the wall: under each chin and beside
// the right monitor's right edge.
export function WallShadows() {
  return (
    <PhotoSvg box={[90, 20, 1024, 370]}>
      <defs>
        <linearGradient id="mon-wall-under" gradientUnits="userSpaceOnUse" x1="0" y1="314" x2="0" y2="350">
          <stop offset="0" stopColor="#1e1710" stopOpacity="0.13" />
          <stop offset="0.45" stopColor="#1e1710" stopOpacity="0.07" />
          <stop offset="1" stopColor="#1e1710" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mon-wall-under-fade" gradientUnits="userSpaceOnUse" x1="90" y1="0" x2="990" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.05" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.95" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="mon-wall-under-mask">
          <rect x="90" y="314" width="900" height="36" fill="url(#mon-wall-under-fade)" />
        </mask>
        <linearGradient id="mon-wall-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1e1710" stopOpacity="0.11" />
          <stop offset="1" stopColor="#1e1710" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="90" y="314" width="900" height="36" fill="url(#mon-wall-under)" mask="url(#mon-wall-under-mask)" />
      <polygon points="978,54 992,58 992,322 978,322" fill="url(#mon-wall-side)" />
    </PhotoSvg>
  );
}

export function LeftStand() {
  return (
    <PhotoSvg box={[415, 296, 500, 420]}>
      <defs>
        <linearGradient id="lst-col" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#262b30" />
          <stop offset="0.12" stopColor="#14181b" />
          <stop offset="0.6" stopColor="#0c0f12" />
          <stop offset="1" stopColor="#171a1f" />
        </linearGradient>
        <linearGradient id="lst-col2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14181d" />
          <stop offset="0.18" stopColor="#2b3238" />
          <stop offset="0.32" stopColor="#191d23" />
          <stop offset="1" stopColor="#0f1216" />
        </linearGradient>
        <linearGradient id="lst-colShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lst-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141820" />
          <stop offset="0.6" stopColor="#1d222a" />
          <stop offset="1" stopColor="#2a3039" />
        </linearGradient>
        <linearGradient id="lst-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#292c33" />
          <stop offset="1" stopColor="#1c1e23" />
        </linearGradient>
        <SoftShadowGradients id="lst" />
      </defs>

      {/* contact shadow on the oak */}
      <ellipse cx="458" cy="410.5" rx="50" ry="11" fill="url(#lst-shadow-wide)" />
      <ellipse cx="458" cy="411.6" rx="34" ry="4.4" fill="url(#lst-shadow-core)" />

      {/* cable running down behind the column, out past its narrower lower
          section and in behind the base */}
      <path d="M466 336 L466.6 356 C 467.4 368, 471 380, 475.6 394" fill="none" stroke="#0d0f12" strokeWidth="1.4" strokeLinecap="round" />

      {/* base */}
      <polygon points="441.5,388.6 478.5,388.6 485.6,401.8 430.2,401.8" fill="url(#lst-top)" stroke="#1a1e25" strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M430.2 401.8 H485.6 V410.2 Q485.6 411.5 484.3 411.5 H431.5 Q430.2 411.5 430.2 410.2 Z" fill="url(#lst-front)" />
      <line x1="430.8" y1="402" x2="485" y2="402" stroke="#c9d3e0" strokeOpacity="0.3" strokeWidth="0.5" />
      <line x1="442" y1="388.8" x2="478" y2="388.8" stroke="#8a95a5" strokeOpacity="0.18" strokeWidth="0.4" />
      <ellipse cx="458.5" cy="391" rx="10" ry="1.9" fill="#090b0e" />

      {/* column: dark upper body, lighter telescoping lower section */}
      <rect x="449" y="298" width="19" height="58" fill="url(#lst-col)" />
      <rect x="449" y="298" width="19" height="58" fill="url(#lst-colShade)" />
      <rect x="451.6" y="355" width="14.4" height="36" rx="0.8" fill="url(#lst-col2)" />
      <line x1="449.3" y1="355.6" x2="467.7" y2="355.6" stroke="#06080a" strokeWidth="0.9" />
      <circle cx="457.6" cy="372.6" r="1" fill="#07090b" />
      <line x1="449.3" y1="298" x2="449.3" y2="355" stroke="#fff" strokeOpacity="0.07" strokeWidth="0.5" />
    </PhotoSvg>
  );
}

export function RightStand() {
  return (
    <PhotoSvg box={[520, 300, 640, 426]}>
      <defs>
        <linearGradient id="rst-col" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a0d11" />
          <stop offset="0.1" stopColor="#2e363e" />
          <stop offset="0.2" stopColor="#161a20" />
          <stop offset="0.65" stopColor="#1d2127" />
          <stop offset="1" stopColor="#0c0f13" />
        </linearGradient>
        <linearGradient id="rst-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1f25" />
          <stop offset="0.3" stopColor="#2c343c" />
          <stop offset="0.75" stopColor="#262d34" />
          <stop offset="1" stopColor="#1b2026" />
        </linearGradient>
        <linearGradient id="rst-topSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="0.25" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="rst-reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1015" stopOpacity="0.85" />
          <stop offset="1" stopColor="#0d1015" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="rst-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24262e" />
          <stop offset="1" stopColor="#15161c" />
        </linearGradient>
        <linearGradient id="cable-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9c7c2" />
          <stop offset="0.4" stopColor="#f7f6f3" />
          <stop offset="1" stopColor="#d6d4cf" />
        </linearGradient>
        <SoftShadowGradients id="rst" />
      </defs>

      {/* contact shadow on the oak */}
      <ellipse cx="574" cy="417" rx="65" ry="12" fill="url(#rst-shadow-wide)" />
      <ellipse cx="574" cy="418.6" rx="50" ry="4.6" fill="url(#rst-shadow-core)" />

      {/* cables hanging from the monitor's ports, disappearing behind the base and pot */}
      <path d="M622.8 312 C 623.6 330, 626.6 346, 628.4 362 L 630.4 402" fill="none" stroke="#14161a" strokeWidth="2.2" strokeLinecap="round" />
      <g fill="none" strokeLinecap="round">
        <path d="M605 325 C 605.6 350, 608 372, 610.6 394" stroke="#a9a7a2" strokeWidth="1.9" />
        <path d="M604.8 325 C 605.4 350, 607.8 372, 610.4 394" stroke="#f1f0ec" strokeWidth="1.1" />
        <path d="M614.3 339 C 615 352, 618.4 362, 620 372 S 621.8 388, 622.2 398" stroke="#a9a7a2" strokeWidth="2" />
        <path d="M614.1 339 C 614.8 352, 618.2 362, 619.8 372 S 621.6 388, 622 398" stroke="#f4f3ef" strokeWidth="1.2" />
      </g>
      <rect x="602.6" y="311" width="4.6" height="14.5" rx="1.2" fill="url(#cable-white)" />
      <rect x="610.2" y="311" width="7.8" height="24.5" rx="1.6" fill="url(#cable-white)" />
      <rect x="612.2" y="335" width="3.9" height="4.6" rx="1" fill="#dddbd6" />

      {/* rear support arm */}
      <path d="M552.6 312 C 551.5 338, 548.6 364, 545.6 388.5" fill="none" stroke="#090b0e" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M551.2 318 C 550.2 340, 547.6 364, 544.4 387" fill="none" stroke="#fff" strokeOpacity="0.06" strokeWidth="0.5" />

      {/* base */}
      <polygon points="528.6,389 612.6,389 619.4,409 528.2,409" fill="url(#rst-top)" stroke="#2c333a" strokeWidth="0.6" strokeLinejoin="round" />
      <polygon points="528.6,389 612.6,389 619.4,409 528.2,409" fill="url(#rst-topSheen)" />
      <polygon points="559.5,397 583,397 584,409 558.5,409" fill="url(#rst-reflect)" />
      <polygon points="586,391 611,391 616.6,407.6 590,407.6" fill="#c9d4df" opacity="0.08" />
      <path d="M528.2 409 H619.4 V417.2 Q619.4 418.6 618 418.6 H529.6 Q528.2 418.6 528.2 417.2 Z" fill="url(#rst-front)" />
      <line x1="528.8" y1="409.2" x2="618.8" y2="409.2" stroke="#dbe3ec" strokeOpacity="0.38" strokeWidth="0.55" />
      <line x1="612.8" y1="389.4" x2="619.2" y2="408.6" stroke="#dbe3ec" strokeOpacity="0.2" strokeWidth="0.45" />
      <line x1="529" y1="389.2" x2="612.4" y2="389.2" stroke="#c4ced8" strokeOpacity="0.22" strokeWidth="0.4" />
      <rect x="528.7" y="410" width="1.6" height="7.4" rx="0.6" fill="#fff" opacity="0.22" />
      <ellipse cx="545.6" cy="389.2" rx="2.6" ry="0.9" fill="#07090c" />

      {/* hub + column */}
      <ellipse cx="573" cy="395.6" rx="17" ry="2.7" fill="#0b0d11" stroke="#9aa6b2" strokeOpacity="0.18" strokeWidth="0.4" />
      <polygon points="550.4,309 583,309 583,336 561,337.5 551.6,316" fill="#07090c" />
      <rect x="560.6" y="334" width="22.2" height="61.6" fill="url(#rst-col)" />
      <path d="M560.6 337.4 L582.8 333.6" stroke="#fff" strokeOpacity="0.13" strokeWidth="0.6" />
      <line x1="560.8" y1="366.8" x2="582.6" y2="366.8" stroke="#05060a" strokeWidth="0.9" />
      <line x1="560.8" y1="367.8" x2="582.6" y2="367.8" stroke="#fff" strokeOpacity="0.07" strokeWidth="0.5" />
      <ellipse cx="571.7" cy="395.4" rx="11.2" ry="1.4" fill="#05070a" opacity="0.8" />
    </PhotoSvg>
  );
}

// Webcam clipped over the left monitor's top bezel.
export function Webcam() {
  return (
    <PhotoSvg box={[285, 42, 338, 93]}>
      <defs>
        <linearGradient id="cam-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2c32" />
          <stop offset="0.35" stopColor="#17181c" />
          <stop offset="1" stopColor="#0c0d10" />
        </linearGradient>
        <linearGradient id="cam-shutter" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2c31" />
          <stop offset="0.5" stopColor="#15161a" />
          <stop offset="1" stopColor="#0d0e11" />
        </linearGradient>
        <linearGradient id="cam-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3e5ea" />
          <stop offset="0.5" stopColor="#8d929b" />
          <stop offset="1" stopColor="#c3c7ce" />
        </linearGradient>
        <radialGradient id="cam-lens" cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#3a4a66" />
          <stop offset="0.45" stopColor="#141a26" />
          <stop offset="1" stopColor="#050608" />
        </radialGradient>
        <radialGradient id="cam-led" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff5a4a" />
          <stop offset="0.4" stopColor="#d4241c" stopOpacity="0.8" />
          <stop offset="1" stopColor="#8a0f0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* clip hooking over the bezel */}
      <path d="M300.6 79.5 H324.6 V88.4 Q324.6 90.2 322.8 90.2 H302.4 Q300.6 90.2 300.6 88.4 Z" fill="#101114" />
      <rect x="300.6" y="79.5" width="24" height="4.4" rx="1.6" fill="#1b1d21" />

      {/* privacy shutter */}
      <path d="M305.2 61 V50.4 Q305.2 46 310.6 46 Q316 46 316 50.4 V61 Z" fill="url(#cam-shutter)" />

      {/* body */}
      <rect x="288.2" y="59.6" width="46.8" height="21" rx="7.4" fill="url(#cam-body)" />
      <path d="M291 61.4 Q292.4 60.3 295.6 60.3 H327.6 Q330.8 60.3 332.2 61.4" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="0.55" />

      {/* lens */}
      <circle cx="312" cy="70.6" r="6.3" fill="url(#cam-ring)" />
      <circle cx="312" cy="70.6" r="4.7" fill="#08090b" />
      <circle cx="312" cy="70.6" r="3.4" fill="url(#cam-lens)" />
      <circle cx="310.7" cy="69.3" r="0.9" fill="#fff" opacity="0.55" />

      {/* status LED */}
      <circle cx="320.6" cy="75.6" r="2.2" fill="url(#cam-led)" />
      <circle cx="320.6" cy="75.6" r="0.6" fill="#ff8a7a" />
    </PhotoSvg>
  );
}
