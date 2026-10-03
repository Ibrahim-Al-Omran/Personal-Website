'use client';

import { useEffect, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDesk } from './DeskContext';
import { DESK, MAX_RAISE } from './sceneLayout';
import SevenSegment from './room/SevenSegment';

const PADDLE = { left: 1133, top: DESK.frontEdgeY + DESK.edgeThickness - 5, width: 214, height: 38 };
const LED = '#ff5b38';

function HeightDisplay({ heightCm, active }) {
  const [text, setText] = useState(() => heightCm.get().toFixed(1));
  useMotionValueEvent(heightCm, 'change', (v) => setText(v.toFixed(1)));
  return (
    <div
      className="relative flex items-center justify-center rounded-[4px]"
      style={{
        width: 58,
        height: 25,
        background: 'linear-gradient(180deg, #050607 0%, #0d0f10 100%)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.07)',
      }}
      role="status"
      aria-label={`Desk height ${text} centimetres`}
    >
      <div
        style={{
          filter: `drop-shadow(0 0 ${active ? 3 : 1.5}px rgba(255,80,40,${active ? 0.95 : 0.6}))`,
          opacity: active ? 1 : 0.85,
          transition: 'opacity 200ms, filter 200ms',
        }}
      >
        <SevenSegment text={text} color={LED} ghost="rgba(255,80,50,0.07)" />
      </div>
      <span
        className="absolute rounded-full"
        style={{
          right: 3.5,
          top: 3.5,
          width: 2.5,
          height: 2.5,
          background: active ? '#ff7a50' : 'rgba(255,90,60,0.18)',
          boxShadow: active ? '0 0 4px #ff5b38' : 'none',
        }}
      />
    </div>
  );
}

function PaddleButton({ lit, label, title, children, width = 28, ...handlers }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={title}
      className="relative flex select-none items-center justify-center rounded-[5px] outline-none transition-[filter,transform] duration-100 hover:brightness-125 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#ff7a50]"
      style={{
        width,
        height: 26,
        touchAction: 'none',
        color: lit ? '#ff8a62' : 'rgba(226,228,232,0.82)',
        background: lit
          ? 'linear-gradient(180deg, #3a2a26 0%, #241a17 100%)'
          : 'linear-gradient(180deg, #34353a 0%, #222326 55%, #1b1c1f 100%)',
        boxShadow: lit
          ? 'inset 0 1px 2px rgba(0,0,0,0.6), 0 0 6px rgba(255,90,50,0.45), 0 0 0 1px rgba(255,110,70,0.35)'
          : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.55)',
      }}
      onContextMenu={(e) => e.preventDefault()}
      {...handlers}
    >
      {children}
    </button>
  );
}

export default function DeskController() {
  const { lift, heightCm, direction, startMove, stopMove, moveTo } = useDesk();
  const [preset, setPreset] = useState(null);
  const [used, setUsed] = useState(false);

  useEffect(() => {
    if (direction === 0) setPreset(null);
    else setUsed(true);
  }, [direction]);

  const hold = (dir) => ({
    onPointerDown: (e) => {
      if (e.button !== 0) return;
      // The paddle rides up/down with the desk, so without capture it would
      // slide out from under the pointer and fire pointerleave mid-hold.
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setPreset(null);
      startMove(dir);
    },
    onPointerUp: stopMove,
    onPointerLeave: stopMove,
    onPointerCancel: stopMove,
    onLostPointerCapture: stopMove,
    onKeyDown: (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        startMove(dir);
      }
    },
    onKeyUp: (e) => {
      if (e.key === ' ' || e.key === 'Enter') stopMove();
    },
  });

  const goTo = (id, value) => () => {
    if (Math.abs(lift.get() - value) > 0.5) setPreset(id);
    moveTo(value);
  };

  const moving = direction !== 0;

  return (
    <div data-desk-control className="absolute left-0 top-0">
      <div
        className="pointer-events-none absolute select-none whitespace-nowrap"
        style={{
          left: PADDLE.left - 12,
          top: PADDLE.top + 12,
          transform: 'translateX(-100%)',
          fontSize: 12,
          letterSpacing: '0.06em',
          color: 'rgba(240,228,210,0.6)',
          opacity: used ? 0 : 1,
          transition: 'opacity 600ms ease',
        }}
      >
        Hold ▲ ▼ to adjust
      </div>

      <div
        className="absolute"
        style={{
          left: PADDLE.left + 10,
          top: PADDLE.top - 1,
          width: PADDLE.width - 20,
          height: 6,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))',
        }}
      />
      <div
        className="absolute flex items-center gap-[4px] rounded-[8px]"
        style={{
          left: PADDLE.left,
          top: PADDLE.top,
          width: PADDLE.width,
          height: PADDLE.height,
          padding: '0 7px',
          background: 'linear-gradient(180deg, #3b3c41 0%, #26272b 10%, #1a1b1e 60%, #121315 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.65), 0 6px 10px rgba(0,0,0,0.45)',
        }}
      >
        <HeightDisplay heightCm={heightCm} active={moving} />
        <div className="mx-[2px] h-[20px] w-px bg-black/60 shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
        <PaddleButton lit={direction === 1 && !preset} label="Raise desk (hold)" title="Hold to raise the desk" {...hold(1)}>
          <ChevronUp size={17} strokeWidth={2.6} />
        </PaddleButton>
        <PaddleButton lit={direction === -1 && !preset} label="Lower desk (hold)" title="Hold to lower the desk" {...hold(-1)}>
          <ChevronDown size={17} strokeWidth={2.6} />
        </PaddleButton>
        <div className="mx-[2px] h-[20px] w-px bg-black/60 shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
        <PaddleButton
          lit={preset === 'sit' && moving}
          width={26}
          label="Preset 1: sitting height"
          title="Preset 1 — sitting height"
          onClick={goTo('sit', 0)}
        >
          <span className="text-[12px] font-semibold leading-none">1</span>
        </PaddleButton>
        <PaddleButton
          lit={preset === 'stand' && moving}
          width={26}
          label="Preset 2: standing height"
          title="Preset 2 — standing height"
          onClick={goTo('stand', MAX_RAISE)}
        >
          <span className="text-[12px] font-semibold leading-none">2</span>
        </PaddleButton>
      </div>
    </div>
  );
}
