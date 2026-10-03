import { ps } from '../sceneLayout';
import { BEZELS, screenPhotoSize } from './geometry';

// Frames are authored in photo px with the screen opening at (0, 0, W, H),
// then placed around the opening of the (untransformed) monitor element.
function FrameSvg({ id, children }) {
  const { width: W, height: H } = screenPhotoSize(id);
  const b = BEZELS[id];
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: -ps(b.left),
        top: -ps(b.top),
        width: ps(W + b.left + b.right),
        height: ps(H + b.top + b.bottom),
        overflow: 'visible',
      }}
      viewBox={`${-b.left} ${-b.top} ${W + b.left + b.right} ${H + b.top + b.bottom}`}
    >
      {children(W, H, b)}
    </svg>
  );
}

// 24" — matte black, thin top and sides, plain slate-grey chin.
export function LeftFrame() {
  return (
    <FrameSvg id="left">
      {(W, H, b) => {
        const x0 = -b.left;
        const x1 = W + b.right;
        const y0 = -b.top;
        const y1 = H + b.bottom;
        const chinTop = H + 3;
        const ledX = W / 2;
        return (
          <>
            <defs>
              <linearGradient id="monL-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1d1e23" />
                <stop offset="1" stopColor="#131418" />
              </linearGradient>
              <linearGradient id="monL-chin" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#434856" />
                <stop offset="0.35" stopColor="#3a3e4b" />
                <stop offset="1" stopColor="#353946" />
              </linearGradient>
              <linearGradient id="monL-chinShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#000" stopOpacity="0.28" />
                <stop offset="0.25" stopColor="#000" stopOpacity="0" />
                <stop offset="0.8" stopColor="#000" stopOpacity="0.05" />
                <stop offset="1" stopColor="#000" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={1.4} fill="url(#monL-body)" />
            <rect x={-2.6} y={-1.4} width={W + 4.6} height={H + 4.4} fill="#050608" />
            <path
              d={`M${x0} ${chinTop} H${x1} V${y1 - 1.2} Q${x1} ${y1} ${x1 - 1.2} ${y1} H${x0 + 1.2} Q${x0} ${y1} ${x0} ${y1 - 1.2} Z`}
              fill="url(#monL-chin)"
            />
            <path
              d={`M${x0} ${chinTop} H${x1} V${y1 - 1.2} Q${x1} ${y1} ${x1 - 1.2} ${y1} H${x0 + 1.2} Q${x0} ${y1} ${x0} ${y1 - 1.2} Z`}
              fill="url(#monL-chinShade)"
            />
            <line x1={x0 + 0.6} y1={chinTop + 0.25} x2={x1 - 0.6} y2={chinTop + 0.25} stroke="#0c0d10" strokeWidth={0.5} />
            <line x1={x0 + 1.4} y1={y1 - 0.35} x2={x1 - 1.4} y2={y1 - 0.35} stroke="#9aa3b5" strokeOpacity={0.35} strokeWidth={0.5} />
            {/* white power LED on the chin's lower lip */}
            <rect x={ledX - 2.4} y={y1 - 1.25} width={4.8} height={0.95} rx={0.45} fill="#f4f6fa" opacity={0.85} />
            <rect x={ledX - 3.6} y={y1 - 1.7} width={7.2} height={2} rx={1} fill="#fff" opacity={0.12} />
            {/* edge highlights catching the window light from the left */}
            <line x1={x0 + 1} y1={y0 + 0.25} x2={x1 - 1} y2={y0 + 0.25} stroke="#fff" strokeOpacity={0.14} strokeWidth={0.45} />
            <line x1={x0 + 0.25} y1={y0 + 1} x2={x0 + 0.25} y2={chinTop} stroke="#fff" strokeOpacity={0.1} strokeWidth={0.45} />
            <line x1={x1 - 0.25} y1={y0 + 1} x2={x1 - 0.25} y2={chinTop} stroke="#fff" strokeOpacity={0.05} strokeWidth={0.45} />
            <rect x={-2.6} y={-1.4} width={W + 4.6} height={H + 4.4} fill="none" stroke="#fff" strokeOpacity={0.04} strokeWidth={0.4} />
          </>
        );
      }}
    </FrameSvg>
  );
}

// 27" — near-borderless black bezels with a slim grey chin.
export function RightFrame() {
  return (
    <FrameSvg id="right">
      {(W, H, b) => {
        const x0 = -b.left;
        const x1 = W + b.right;
        const y0 = -b.top;
        const y1 = H + b.bottom;
        const chinTop = H + 2.4;
        return (
          <>
            <defs>
              <linearGradient id="monR-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0f1013" />
                <stop offset="1" stopColor="#08090b" />
              </linearGradient>
              <linearGradient id="monR-chin" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4d535f" />
                <stop offset="0.3" stopColor="#3b404b" />
                <stop offset="0.7" stopColor="#2a2e38" />
                <stop offset="1" stopColor="#1e222a" />
              </linearGradient>
              <linearGradient id="monR-chinShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                <stop offset="0.3" stopColor="#000" stopOpacity="0" />
                <stop offset="0.85" stopColor="#000" stopOpacity="0.08" />
                <stop offset="1" stopColor="#000" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={1.5} fill="url(#monR-body)" />
            <rect x={-1.7} y={-1.5} width={W + 3.6} height={H + 3.9} fill="#040405" />
            <path
              d={`M${x0} ${chinTop} H${x1} V${y1 - 1.3} Q${x1} ${y1} ${x1 - 1.3} ${y1} H${x0 + 1.3} Q${x0} ${y1} ${x0} ${y1 - 1.3} Z`}
              fill="url(#monR-chin)"
            />
            <path
              d={`M${x0} ${chinTop} H${x1} V${y1 - 1.3} Q${x1} ${y1} ${x1 - 1.3} ${y1} H${x0 + 1.3} Q${x0} ${y1} ${x0} ${y1 - 1.3} Z`}
              fill="url(#monR-chinShade)"
            />
            <line x1={x0 + 1.4} y1={y1 - 0.35} x2={x1 - 1.4} y2={y1 - 0.35} stroke="#a7b0c0" strokeOpacity={0.3} strokeWidth={0.5} />
            <line x1={x0 + 1} y1={y0 + 0.25} x2={x1 - 1} y2={y0 + 0.25} stroke="#fff" strokeOpacity={0.12} strokeWidth={0.45} />
            <line x1={x0 + 0.25} y1={y0 + 1} x2={x0 + 0.25} y2={chinTop} stroke="#fff" strokeOpacity={0.09} strokeWidth={0.45} />
            <line x1={x1 - 0.25} y1={y0 + 1} x2={x1 - 0.25} y2={chinTop} stroke="#fff" strokeOpacity={0.05} strokeWidth={0.45} />
            <rect x={-1.7} y={-1.5} width={W + 3.6} height={H + 3.9} fill="none" stroke="#fff" strokeOpacity={0.035} strokeWidth={0.4} />
          </>
        );
      }}
    </FrameSvg>
  );
}
