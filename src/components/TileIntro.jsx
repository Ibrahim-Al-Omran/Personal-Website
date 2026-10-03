'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const TILE_DURATION = 560;
const SWEEP = 520;
const SCATTER = 380;
const MIN_COVER = 450;
const MAX_WAIT = 1400;

const SHADES = ['#c1ddff', '#c1ddff', '#b5d4f5', '#d0e6ff'];
const FLASHES = ['#262727', '#faf9f2', '#8eb6e8'];

function viewportSize() {
  const vv = window.visualViewport;
  return {
    width: Math.round(vv?.width || window.innerWidth),
    height: Math.round(vv?.height || window.innerHeight),
  };
}

function buildTiles(width, height) {
  const density = width < 768 ? 16 : 24;
  const size = Math.ceil(Math.max(width, height) / density);
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.hypot(cx, cy) || 1;
  const rowShift = Array.from({ length: rows }, () =>
    Math.random() < 0.35 ? (Math.random() - 0.5) * size * 0.9 : 0
  );

  const tiles = [];
  let maxDelay = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sweep = (Math.hypot(c - cx, r - cy) / maxDist) * SWEEP;
      const delay = Math.round(sweep + Math.random() * SCATTER);
      if (delay > maxDelay) maxDelay = delay;
      tiles.push({
        key: r * cols + c,
        delay,
        jx: Math.round(rowShift[r] + (Math.random() - 0.5) * size * 0.35),
        jy: Math.round((Math.random() - 0.5) * size * 0.2),
        shade: SHADES[Math.floor(Math.random() * SHADES.length)],
        flash: FLASHES[Math.floor(Math.random() * FLASHES.length)],
      });
    }
  }
  return { size, cols, rows, tiles, maxDelay };
}

export default function TileIntro() {
  const [grid, setGrid] = useState(null);
  const [phase, setPhase] = useState('cover');
  const mountedAt = useRef(0);
  const leaving = useRef(false);

  useLayoutEffect(() => {
    mountedAt.current = performance.now();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('fade');
      return;
    }
    const { width, height } = viewportSize();
    setGrid(buildTiles(width, height));
  }, []);

  // Hold the tile cover, then play the out animation (works even when the
  // document was already `complete` before hydration in production).
  useEffect(() => {
    if (phase !== 'cover' || !grid || leaving.current) return;

    let timer;
    let raf = 0;

    const beginOut = () => {
      if (leaving.current) return;
      leaving.current = true;
      // Two frames so the static tile grid paints before animation styles attach.
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setPhase('out'));
      });
    };

    const tryStart = () => {
      const elapsed = performance.now() - mountedAt.current;
      const wait = Math.max(0, MIN_COVER - elapsed);
      timer = window.setTimeout(beginOut, wait);
    };

    if (document.readyState === 'complete') {
      tryStart();
    } else {
      const onLoad = () => {
        window.removeEventListener('load', onLoad);
        tryStart();
      };
      window.addEventListener('load', onLoad);
      timer = window.setTimeout(() => {
        window.removeEventListener('load', onLoad);
        tryStart();
      }, MAX_WAIT);
    }

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [phase, grid]);

  useEffect(() => {
    if (phase !== 'out' && phase !== 'fade') return;
    // Unmount as soon as the last tile finishes — no extra second of leftover frames.
    const total =
      phase === 'fade' ? 420 : (grid?.maxDelay ?? SWEEP + SCATTER) + TILE_DURATION + 40;
    const timer = window.setTimeout(() => setPhase('done'), total);
    return () => window.clearTimeout(timer);
  }, [phase, grid]);

  if (phase === 'done') return null;

  if (!grid) {
    return (
      <div
        aria-hidden="true"
        className="tile-intro tile-intro-solid"
        data-fade={phase === 'fade' || undefined}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="tile-intro"
      data-phase={phase}
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, ${grid.size}px)`,
        gridTemplateRows: `repeat(${grid.rows}, ${grid.size}px)`,
      }}
    >
      {grid.tiles.map((t) => (
        <span
          key={t.key}
          className="tile-intro-tile"
          style={{
            background: t.shade,
            '--tile': t.shade,
            '--flash': t.flash,
            '--jx': `${t.jx}px`,
            '--jy': `${t.jy}px`,
            ...(phase === 'out'
              ? {
                  animationName: 'tile-glitch-out',
                  animationDuration: `${TILE_DURATION}ms`,
                  // steps() holds the penultimate frame on mobile Safari; ease-out clears cleanly.
                  animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                  animationDelay: `${t.delay}ms`,
                  animationFillMode: 'forwards',
                }
              : null),
          }}
        />
      ))}
    </div>
  );
}
