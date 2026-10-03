import { DESK } from '../sceneLayout';
import PhotoSvg, { ContactShadow, f } from './PhotoSvg';

// White wired earbuds. The cables trail toward the viewer, over the desk's
// front edge, and hang down into a Y-splitter.
const toPhotoY = (stageY) => f((stageY - 90) / 1.45);
const EDGE_TOP = toPhotoY(DESK.frontEdgeY);
const EDGE_BOTTOM = toPhotoY(DESK.frontEdgeY + DESK.edgeThickness);

const LEFT_CABLE =
  'M281.8,475.4 C279.6,479.5 277.4,483.5 277.2,487.5 C277.1,489.8 279.5,490.6 281.6,491.6 ' +
  'C278,492.5 273.8,497 270.5,503 C267.4,509 264.6,515 261.4,518.6 ' +
  'M250.6,529.4 C243,532 230,535 220,542 C212,548 207.8,556 206.6,566 ' +
  `C205.6,576 205.4,586 205.4,${EDGE_TOP - 0.6} ` +
  `Q205.4,${EDGE_TOP + 0.6} 205.8,${EDGE_TOP + 1.8} L206.2,${EDGE_BOTTOM} ` +
  `C206.6,${EDGE_BOTTOM + 8} 210,${EDGE_BOTTOM + 15} 216.4,${EDGE_BOTTOM + 22}`;

const RIGHT_CABLE =
  'M347.8,472.6 C343,477 337,481.5 331,487 C324,494 318,502 309,507.5 C301,512.5 294.5,517 290.8,523.5 ' +
  'C287.5,529.5 283,534 274,537 C264,540.5 254,546 248,553 C243.6,558.6 242.2,565 241.6,572 ' +
  `C241,580 240.4,586 240.2,${EDGE_TOP - 0.6} ` +
  `Q240.2,${EDGE_TOP + 0.6} 239.8,${EDGE_TOP + 1.8} L239.4,${EDGE_BOTTOM} ` +
  `C239,${EDGE_BOTTOM + 8} 228,${EDGE_BOTTOM + 15} 220.4,${EDGE_BOTTOM + 22}`;

const SPLIT = { x: 218.4, y: f(EDGE_BOTTOM + 24.5) };
const TAIL = `M${SPLIT.x},${SPLIT.y + 2} C${SPLIT.x},${SPLIT.y + 30} ${SPLIT.x - 2},${SPLIT.y + 90} ${SPLIT.x - 1},${SPLIT.y + 220}`;

function Cable({ d }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g clipPath="url(#acc-ear-desk)">
        <path d={d} stroke="#5a3f22" strokeOpacity="0.22" strokeWidth="3" transform="translate(2.6 -0.3)" />
      </g>
      <path d={d} stroke="#958a7d" strokeWidth="2.2" />
      <path d={d} stroke="#ddd6cb" strokeWidth="1.55" />
      <path d={d} stroke="#f7f4ef" strokeOpacity="0.75" strokeWidth="0.5" transform="translate(-0.3 -0.3)" />
    </g>
  );
}

function Bud({ x, y, flip, stem }) {
  // Body drawn for the left bud (ear tip to the right); `flip` mirrors it.
  // The strain-relief stem is given in photo px since both point down-left.
  const [sx1, sy1, sx2, sy2] = stem;
  return (
    <g>
      <ellipse cx={x + 9} cy={y + 4.5} rx="10" ry="3.4" fill="url(#acc-ear-shadow)" />
      <path d={`M${sx1},${sy1} L${sx2},${sy2}`} stroke="#9aa1a8" strokeWidth="2.7" strokeLinecap="round" />
      <path d={`M${sx1},${sy1} L${sx2},${sy2}`} stroke="#e3e7ea" strokeWidth="1.9" strokeLinecap="round" />
      <g transform={flip ? `translate(${x} ${y}) scale(-1 1)` : `translate(${x} ${y})`}>
        <path
          d="M-6.2,-5 Q-7.8,-4.8 -7.8,-2.6 L-7.6,3.4 Q-7.4,5.6 -5.2,5.6 L1.4,5.3 L1.4,-5.3Z"
          fill="url(#acc-ear-body)"
          stroke="#7f878f"
          strokeWidth="0.45"
        />
        <rect x="-8" y="-4.6" width="2.2" height="9.6" rx="1" fill="url(#acc-ear-chrome)" />
        <path d="M-5,-4.6 Q-2,-5.4 1,-4.8" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.6" fill="none" />
        <rect x="0.9" y="-3.8" width="1.8" height="7.6" rx="0.6" fill="#8f979f" />
        <ellipse cx="6.2" cy="0" rx="4.8" ry="5.7" fill="url(#acc-ear-tip)" stroke="#9eabb7" strokeWidth="0.4" />
        <ellipse cx="5.4" cy="-2.2" rx="2.4" ry="1.4" fill="#ffffff" fillOpacity="0.55" />
      </g>
    </g>
  );
}

export default function Earphones() {
  return (
    <PhotoSvg box={[195, 450, 370, 600]}>
      <defs>
        <clipPath id="acc-ear-desk">
          <rect x="150" y="430" width="260" height={f(EDGE_TOP - 430)} />
        </clipPath>
        <linearGradient id="acc-ear-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6eaed" />
          <stop offset="0.55" stopColor="#c3cad1" />
          <stop offset="1" stopColor="#959ea7" />
        </linearGradient>
        <linearGradient id="acc-ear-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9cfd5" />
          <stop offset="0.45" stopColor="#6c737b" />
          <stop offset="1" stopColor="#4c5259" />
        </linearGradient>
        <radialGradient id="acc-ear-tip" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#eef3f7" />
          <stop offset="0.6" stopColor="#cbd6df" />
          <stop offset="1" stopColor="#a2afbb" />
        </radialGradient>
        <radialGradient id="acc-ear-shadow">
          <stop offset="0" stopColor="#3b2914" stopOpacity="0.32" />
          <stop offset="1" stopColor="#3b2914" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="acc-ear-remote" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a3a8ad" />
          <stop offset="0.5" stopColor="#767c83" />
          <stop offset="1" stopColor="#555a61" />
        </linearGradient>
      </defs>

      <Cable d={LEFT_CABLE} />
      <Cable d={RIGHT_CABLE} />
      <Cable d={TAIL} />

      {/* inline remote on the left cable */}
      <ContactShadow id="acc-ear-remote-shadow" cx={258} cy={527} rx={9} ry={4} opacity={0.4} />
      <g transform="translate(256 524) rotate(-48)">
        <rect x="-7.4" y="-3.3" width="14.8" height="6.6" rx="3.2" fill="url(#acc-ear-remote)" />
        <rect x="-5.8" y="-2.6" width="11" height="1.6" rx="0.8" fill="#ffffff" fillOpacity="0.22" />
      </g>

      {/* Y-splitter under the desk edge */}
      <rect x={SPLIT.x - 2.2} y={SPLIT.y - 3.5} width="4.4" height="7" rx="1.8" fill="#e4dfd7" stroke="#9c9389" strokeWidth="0.45" />

      <Bud x={290} y={462.5} stem={[284.6, 467.4, 281.6, 475.6]} />
      <Bud x={346} y={461.5} flip stem={[350.6, 466.4, 347.6, 472.8]} />
    </PhotoSvg>
  );
}
