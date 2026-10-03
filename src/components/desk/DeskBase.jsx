'use client';

import { motion, useTransform } from 'motion/react';
import { useDesk } from './DeskContext';
import { DESK, FLOOR_Y, MAX_RAISE } from './sceneLayout';
import { WALL_BASE_Y } from './room/roomGeometry';

const EDGE_BOTTOM = DESK.frontEdgeY + DESK.edgeThickness;
const FOOT_HEIGHT = 12;
const SLEEVE = { top: EDGE_BOTTOM - 16, width: 50 };
SLEEVE.bottom = Math.max(EDGE_BOTTOM + 4, FLOOR_Y - FOOT_HEIGHT - 4);
const INNER = { top: SLEEVE.bottom - 8, width: 40 };
const FOOT = { backWidth: 54, frontWidth: 74, back: 16, front: 40 };
const SHADE_TOP = EDGE_BOTTOM - 4;
const [LEFT_LEG, RIGHT_LEG] = DESK.legCenters;

const sleeveFill =
  'linear-gradient(90deg, #c8c9cc 0%, #f2f2f3 12%, #ffffff 28%, #e8e8ea 48%, #d4d5d8 72%, #bfc0c4 90%, #a8a9ad 100%)';
const innerFill =
  'linear-gradient(90deg, #b8b9bd 0%, #ececee 14%, #ffffff 30%, #e4e4e6 50%, #cfd0d3 74%, #b3b4b8 100%)';

function Leg({ x, innerHeight, footY }) {
  return (
    <>
      <motion.div className="absolute" style={{ left: x - FOOT.frontWidth / 2, top: FLOOR_Y, width: FOOT.frontWidth, y: footY }}>
        <div
          className="absolute"
          style={{
            left: -18,
            top: -6,
            width: FOOT.frontWidth + 36,
            height: FOOT.front + 26,
            background: 'radial-gradient(closest-side, rgba(14,11,8,0.45), rgba(14,11,8,0.18) 60%, rgba(14,11,8,0) 100%)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: 0,
            top: -FOOT.back,
            width: FOOT.frontWidth,
            height: FOOT.back + FOOT.front,
            clipPath: `polygon(${(FOOT.frontWidth - FOOT.backWidth) / 2}px 0, ${(FOOT.frontWidth + FOOT.backWidth) / 2}px 0, 100% 100%, 0 100%)`,
            background: 'linear-gradient(180deg, #d8d9dc 0%, #f4f4f5 55%, #ffffff 100%)',
          }}
        />
        <div
          className="absolute rounded-b-[4px]"
          style={{
            left: 0,
            top: FOOT.front,
            width: FOOT.frontWidth,
            height: FOOT_HEIGHT - 3,
            background: 'linear-gradient(180deg, #f0f0f2 0%, #c8c9cc 30%, #9a9b9f 100%)',
          }}
        />
        <div className="absolute rounded-full bg-[#0a0a0b]" style={{ left: 6, top: FOOT.front + FOOT_HEIGHT - 4, width: 12, height: 4 }} />
        <div
          className="absolute rounded-full bg-[#0a0a0b]"
          style={{ right: 6, top: FOOT.front + FOOT_HEIGHT - 4, width: 12, height: 4 }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          left: x - INNER.width / 2,
          top: INNER.top,
          width: INNER.width,
          height: innerHeight,
          background: innerFill,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-full" style={{ background: 'linear-gradient(180deg, rgba(80,82,88,0.28) 0, rgba(80,82,88,0) 26px)' }} />
      </motion.div>

      <div
        className="absolute rounded-b-[3px]"
        style={{
          left: x - SLEEVE.width / 2,
          top: SLEEVE.top,
          width: SLEEVE.width,
          height: SLEEVE.bottom - SLEEVE.top,
          background: sleeveFill,
          boxShadow: '0 3px 4px rgba(0,0,0,0.18)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(70,72,78,0.28) 0, rgba(70,72,78,0.1) 26px, rgba(70,72,78,0) 60%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-[3px]"
          style={{ height: 5, background: 'linear-gradient(180deg, #d8d9dc, #f6f6f7 40%, #c4c5c9)' }}
        />
      </div>
    </>
  );
}

export default function DeskBase() {
  const { lift } = useDesk();
  const footY = lift;
  const innerHeight = useTransform(lift, (l) => FLOOR_Y + l - INNER.top + 2);
  const shadeHeight = useTransform(lift, (l) => FLOOR_Y + l + 70 - SHADE_TOP);
  const floorShadowOpacity = useTransform(lift, [0, MAX_RAISE], [0.75, 1]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute"
        style={{
          left: LEFT_LEG - 260,
          top: WALL_BASE_Y - 30,
          width: RIGHT_LEG - LEFT_LEG + 520,
          height: FLOOR_Y - WALL_BASE_Y + 110,
          y: footY,
          opacity: floorShadowOpacity,
          background: 'radial-gradient(50% 50% at 50% 46%, rgba(18,14,10,0.42), rgba(18,14,10,0.2) 55%, rgba(18,14,10,0) 100%)',
        }}
      />
      <motion.div
        className="absolute"
        style={{
          left: DESK.leftX,
          top: SHADE_TOP,
          width: DESK.rightX - DESK.leftX,
          height: shadeHeight,
          background:
            'linear-gradient(180deg, rgba(16,12,9,0.78) 0, rgba(16,12,9,0.55) 14px, rgba(16,12,9,0.3) 45%, rgba(16,12,9,0.12) 80%, rgba(16,12,9,0) 100%)',
        }}
      />

      <div
        className="absolute"
        style={{
          left: LEFT_LEG,
          top: EDGE_BOTTOM - 14,
          width: RIGHT_LEG - LEFT_LEG,
          height: 20,
          background: 'linear-gradient(180deg, #c5c6ca 0%, #ececee 60%, #ffffff 85%, #d0d1d4 100%)',
        }}
      />
      {[LEFT_LEG, RIGHT_LEG].map((x) => (
        <div
          key={`motor-${x}`}
          className="absolute rounded-[3px]"
          style={{
            left: x - 34,
            top: EDGE_BOTTOM - 14,
            width: 68,
            height: 22,
            background: 'linear-gradient(180deg, #c8c9cc 0%, #f2f2f3 55%, #ffffff 82%, #d4d5d8 100%)',
          }}
        />
      ))}

      {[LEFT_LEG, RIGHT_LEG].map((x) => (
        <Leg key={x} x={x} innerHeight={innerHeight} footY={footY} />
      ))}
    </div>
  );
}
