'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const TILE_DURATION = 560;
const SWEEP = 520;
const SCATTER = 380;
const MIN_COVER = 250;
const MAX_WAIT = 1400;

const SHADES = ['#bbe2bc', '#bbe2bc', '#b2dcb3', '#c6e8c7'];
const FLASHES = ['#201201', '#f4fbf4', '#8fc792'];

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
  const rowShift = Array.from({ length: rows }, () => (Math.random() < 0.35 ? (Math.random() - 0.5) * size * 0.9 : 0));

  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sweep = (Math.hypot(c - cx, r - cy) / maxDist) * SWEEP;
      tiles.push({
        key: r * cols + c,
        delay: Math.round(sweep + Math.random() * SCATTER),
        jx: Math.round(rowShift[r] + (Math.random() - 0.5) * size * 0.35),
        jy: Math.round((Math.random() - 0.5) * size * 0.2),
        shade: SHADES[Math.floor(Math.random() * SHADES.length)],
        flash: FLASHES[Math.floor(Math.random() * FLASHES.length)],
      });
    }
  }
  return { size, cols, rows, tiles };
}

export default function TileIntro() {
  const [grid, setGrid] = useState(null);
  const [phase, setPhase] = useState('cover');

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('fade');
      return;
    }
    const { width, height } = viewportSize();
    setGrid(buildTiles(width, height));
  }, []);

  useEffect(() => {
    if (phase !== 'cover') return;
    const mountedAt = performance.now();
    let timer;
    const start = () => {
      window.removeEventListener('load', start);
      clearTimeout(timer);
      const wait = Math.max(0, MIN_COVER - (performance.now() - mountedAt));
      timer = setTimeout(() => setPhase('out'), wait);
    };
    if (document.readyState === 'complete') start();
    else {
      window.addEventListener('load', start);
      timer = setTimeout(start, MAX_WAIT);
    }
    return () => {
      window.removeEventListener('load', start);
      clearTimeout(timer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'out' && phase !== 'fade') return;
    const total = phase === 'fade' ? 400 : SWEEP + SCATTER + TILE_DURATION + 80;
    const timer = setTimeout(() => setPhase('done'), total);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'done') return null;

  if (!grid) {
    return <div aria-hidden="true" className="tile-intro tile-intro-solid" data-fade={phase === 'fade' || undefined} />;
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
            '--tile': t.shade,
            '--flash': t.flash,
            '--jx': `${t.jx}px`,
            '--jy': `${t.jy}px`,
            '--d': `${t.delay}ms`,
            '--dur': `${TILE_DURATION}ms`,
          }}
        />
      ))}
    </div>
  );
}
