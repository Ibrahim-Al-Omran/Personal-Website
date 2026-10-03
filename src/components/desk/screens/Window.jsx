'use client';

const GLYPH = 'rgba(70, 20, 0, 0.6)';

function Light({ color, ring, label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-[12px] w-[12px] place-items-center rounded-full p-0"
      style={{ background: color, boxShadow: `inset 0 0 0 0.5px ${ring}` }}
    >
      <svg
        viewBox="0 0 12 12"
        className="h-[8px] w-[8px] opacity-0 transition-opacity duration-100 group-hover/lights:opacity-100"
        fill="none"
        stroke={GLYPH}
        strokeWidth="1.35"
        strokeLinecap="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

/** Close / minimize / zoom buttons; glyphs appear while hovering the group. */
export function TrafficLights({ onClose, onMinimize, onZoom, closeLabel = 'Close window', zoomLabel = 'Zoom window' }) {
  return (
    <div className="group/lights flex items-center gap-[8px]">
      <Light color="#ff5f57" ring="#e0443e" label={closeLabel} onClick={onClose}>
        <path d="M3.5 3.5l5 5M8.5 3.5l-5 5" />
      </Light>
      <Light color="#febc2e" ring="#dea123" label="Minimize window" onClick={onMinimize}>
        <path d="M2.75 6h6.5" />
      </Light>
      <Light color="#28c840" ring="#1aab29" label={zoomLabel} onClick={onZoom}>
        <path d="M3 3h4.4L3 7.4z M9 9H4.6L9 4.6z" fill={GLYPH} stroke="none" />
      </Light>
    </div>
  );
}

/**
 * A macOS window frame: rounded, translucent material, layered shadow.
 * `rect` is { top, left, right, bottom } in screen px; changes animate.
 */
export default function Window({ rect, label, children }) {
  return (
    <section
      aria-label={label}
      className="absolute z-20 overflow-hidden"
      style={{
        ...rect,
        borderRadius: 12,
        backgroundColor: 'rgba(250, 245, 239, 0.8)',
        backdropFilter: 'blur(30px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(30px) saturate(1.5)',
        boxShadow: '0 28px 70px -14px rgba(20, 10, 0, 0.5), 0 10px 26px -8px rgba(20, 10, 0, 0.3)',
        transition: 'top 380ms cubic-bezier(.2,.8,.2,1), left 380ms cubic-bezier(.2,.8,.2,1), right 380ms cubic-bezier(.2,.8,.2,1), bottom 380ms cubic-bezier(.2,.8,.2,1), border-radius 380ms ease',
      }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: 'inherit',
          boxShadow: 'inset 0 0 0 0.5px rgba(32, 18, 1, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.75)',
        }}
      />
    </section>
  );
}
