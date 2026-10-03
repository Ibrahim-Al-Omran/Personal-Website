'use client';

import { useEffect, useState } from 'react';
import PhotoSvg, { ContactShadow, f } from './PhotoSvg';

// Apple Magic Keyboard (US, no numpad) in the photo's perspective. Keys are
// laid out in key units (u) and mapped onto the trapezoid of the key area.
const CASE = { tl: [419.5, 443.2], tr: [613.5, 443.2], bl: [409.2, 476.2], br: [622.8, 476.2] };
const KEYS_AREA = { top: 444.8, bottom: 472.6, tl: 421.6, tr: 611.4, bl: 412.6, br: 619.6 };
const ROW_WIDTH = 14.5;
// From this low angle the gaps beside keys read as dark slits while the gaps
// between rows are hidden behind the keycaps' front faces.
const GAP = 0.09;
const ROW_GAP = 0.06;

const F_KEY = ROW_WIDTH / 14;
const ROWS = [
  {
    h: 0.55,
    keys: [
      ['Escape', F_KEY],
      ...Array.from({ length: 12 }, (_, i) => [`F${i + 1}`, F_KEY]),
      ['Lock', F_KEY],
    ],
  },
  {
    h: 1,
    keys: [
      ['Backquote', 1],
      ...'1234567890'.split('').map((d) => [`Digit${d}`, 1]),
      ['Minus', 1],
      ['Equal', 1],
      ['Backspace', 1.5],
    ],
  },
  {
    h: 1,
    keys: [
      ['Tab', 1.5],
      ...'QWERTYUIOP'.split('').map((c) => [`Key${c}`, 1]),
      ['BracketLeft', 1],
      ['BracketRight', 1],
      ['Backslash', 1],
    ],
  },
  {
    h: 1,
    keys: [
      ['CapsLock', 1.75],
      ...'ASDFGHJKL'.split('').map((c) => [`Key${c}`, 1]),
      ['Semicolon', 1],
      ['Quote', 1],
      ['Enter', 1.75],
    ],
  },
  {
    h: 1,
    keys: [
      ['ShiftLeft', 2.25],
      ...'ZXCVBNM'.split('').map((c) => [`Key${c}`, 1]),
      ['Comma', 1],
      ['Period', 1],
      ['Slash', 1],
      ['ShiftRight', 2.25],
    ],
  },
  {
    h: 1,
    keys: [
      ['Fn', 1],
      ['ControlLeft', 1],
      ['AltLeft', 1],
      ['MetaLeft', 1.25],
      ['Space', 5],
      ['MetaRight', 1.25],
      ['AltRight', 1],
      ['ArrowLeft', 1, 'low'],
      ['ArrowUp', 1, 'high'],
      ['ArrowRight', 1, 'low'],
    ],
  },
];

const ALIASES = {
  ControlRight: 'ControlLeft',
  OSLeft: 'MetaLeft',
  OSRight: 'MetaRight',
  ContextMenu: 'AltRight',
  Delete: 'Backspace',
  IntlBackslash: 'Backquote',
  NumpadEnter: 'Enter',
  NumpadSubtract: 'Minus',
  NumpadAdd: 'Equal',
  NumpadDecimal: 'Period',
  NumpadDivide: 'Slash',
  NumpadMultiply: 'Digit8',
  F13: 'Lock',
  PrintScreen: 'Lock',
  Pause: 'Lock',
};
const codeToKey = (code) => ALIASES[code] ?? (code.startsWith('Numpad') ? `Digit${code.slice(6)}` : code);

const TOTAL_H = ROWS.reduce((sum, r) => sum + r.h, 0);
// Mild perspective: rows nearer the viewer are slightly taller.
const depth = (v) => (v * 1.14) / (1 + 0.14 * v);
const map = (u, v) => {
  const t = depth(v);
  const xl = KEYS_AREA.tl + (KEYS_AREA.bl - KEYS_AREA.tl) * t;
  const xr = KEYS_AREA.tr + (KEYS_AREA.br - KEYS_AREA.tr) * t;
  return [f(xl + (u / ROW_WIDTH) * (xr - xl)), f(KEYS_AREA.top + (KEYS_AREA.bottom - KEYS_AREA.top) * t)];
};
const quad = (u0, u1, v0, v1) => [map(u0, v0), map(u1, v0), map(u1, v1), map(u0, v1)];
const pts = (q) => q.map((p) => p.join(',')).join(' ');

const KEYS = [];
const SLITS = [];
let rowTop = 0;
for (const row of ROWS) {
  let u = 0;
  row.keys.forEach(([id, w, half], i) => {
    let v0 = rowTop;
    let v1 = rowTop + row.h;
    if (half === 'low') v0 += row.h / 2;
    const u0 = u + GAP / 2;
    const u1 = u + w - GAP / 2;
    if (i < row.keys.length - 1) {
      const a = map(u + w, (rowTop + row.h * 0.2) / TOTAL_H);
      const b = map(u + w, (rowTop + row.h * 0.88) / TOTAL_H);
      SLITS.push(`M${a.join(',')} L${b.join(',')}`);
    }
    if (half === 'high') {
      KEYS.push(makeKey('ArrowUp', u0, u1, v0 + ROW_GAP / 2, v0 + row.h / 2 - ROW_GAP / 2));
      KEYS.push(makeKey('ArrowDown', u0, u1, v0 + row.h / 2 + ROW_GAP / 2, v1 - ROW_GAP / 2));
    } else {
      KEYS.push(makeKey(id, u0, u1, v0 + ROW_GAP / 2, v1 - ROW_GAP / 2));
    }
    u += w;
  });
  rowTop += row.h;
}
const SLITS_D = SLITS.join(' ');

function makeKey(id, u0, u1, v0, v1) {
  const top = quad(u0, u1, v0 / TOTAL_H, v1 / TOTAL_H);
  // The front face of the keycap shows below its top in this view.
  const lip = 0.6;
  const side = [top[3], top[2], [top[2][0], f(top[2][1] + lip)], [top[3][0], f(top[3][1] + lip)]];
  return { id, top: pts(top), side: pts(side), pressedTop: pts(top.map(([x, y]) => [x, f(y + 0.45)])) };
}

const caseD =
  `M${CASE.tl[0] + 1.2},${CASE.tl[1]} L${CASE.tr[0] - 1.2},${CASE.tr[1]} Q${CASE.tr[0]},${CASE.tr[1]} ${CASE.tr[0] + 0.25},${CASE.tr[1] + 1} ` +
  `L${CASE.br[0]},${CASE.br[1] - 1.2} Q${CASE.br[0]},${CASE.br[1]} ${CASE.br[0] - 1.4},${CASE.br[1]} ` +
  `L${CASE.bl[0] + 1.4},${CASE.bl[1]} Q${CASE.bl[0]},${CASE.bl[1]} ${CASE.bl[0]},${CASE.bl[1] - 1.2} ` +
  `L${CASE.tl[0] - 0.25},${CASE.tl[1] + 1} Q${CASE.tl[0]},${CASE.tl[1]} ${CASE.tl[0] + 1.2},${CASE.tl[1]}Z`;
const wellD = `M${KEYS_AREA.tl - 0.3},${KEYS_AREA.top - 0.3} L${KEYS_AREA.tr + 0.3},${KEYS_AREA.top - 0.3} L${KEYS_AREA.br + 0.3},${KEYS_AREA.bottom + 0.5} L${KEYS_AREA.bl - 0.3},${KEYS_AREA.bottom + 0.5}Z`;
const frontD = `M${CASE.bl[0] + 0.6},${CASE.bl[1] - 0.3} L${CASE.br[0] - 0.6},${CASE.br[1] - 0.3} L${CASE.br[0] - 1.6},${CASE.br[1] + 1.6} L${CASE.bl[0] + 1.6},${CASE.bl[1] + 1.6}Z`;

function usePressedKeys() {
  const [pressed, setPressed] = useState(() => new Set());
  useEffect(() => {
    const update = (key, down) =>
      setPressed((prev) => {
        if (prev.has(key) === down) return prev;
        const next = new Set(prev);
        if (down) next.add(key);
        else next.delete(key);
        return next;
      });
    const clear = () => setPressed((prev) => (prev.size ? new Set() : prev));
    const onDown = (e) => {
      if (e.code) update(codeToKey(e.code), true);
    };
    const onUp = (e) => {
      // macOS swallows keyup for keys released while Command is held.
      if (e.key === 'Meta') clear();
      else if (e.code) update(codeToKey(e.code), false);
    };
    window.addEventListener('keydown', onDown, { passive: true });
    window.addEventListener('keyup', onUp, { passive: true });
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', clear);
    };
  }, []);
  return pressed;
}

export default function MagicKeyboard() {
  const pressed = usePressedKeys();
  return (
    <PhotoSvg box={[405, 440, 628, 481]}>
      <defs>
        <linearGradient id="acc-kb-case" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6ced6" />
          <stop offset="1" stopColor="#d6dde3" />
        </linearGradient>
        <linearGradient id="acc-kb-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9edf0" />
          <stop offset="0.35" stopColor="#b9bfc5" />
          <stop offset="1" stopColor="#8f949a" />
        </linearGradient>
        <linearGradient id="acc-kb-key" gradientUnits="userSpaceOnUse" x1="410" y1="0" x2="622" y2="0">
          <stop offset="0" stopColor="#edf3f8" />
          <stop offset="0.5" stopColor="#e5edf3" />
          <stop offset="1" stopColor="#d9e2ea" />
        </linearGradient>
      </defs>

      <ContactShadow id="acc-kb-shadow" cx={517} cy={477.5} rx={118} ry={6} opacity={0.42} />
      <ContactShadow id="acc-kb-ao" cx={516} cy={476.8} rx={104} ry={2.2} opacity={0.4} />

      <path d={frontD} fill="url(#acc-kb-front)" />
      <path d={caseD} fill="url(#acc-kb-case)" />
      <path d={caseD} fill="none" stroke="#f4f7f9" strokeOpacity="0.8" strokeWidth="0.5" />
      <path d={wellD} fill="#bcc5ce" />

      {KEYS.map((k) => {
        const down = pressed.has(k.id);
        return (
          <g key={k.id}>
            {!down && <polygon points={k.side} fill="#dde4ea" />}
            <polygon
              points={down ? k.pressedTop : k.top}
              fill={down ? '#bcc5ce' : 'url(#acc-kb-key)'}
              stroke={down ? '#9da7b1' : '#f7fafc'}
              strokeOpacity={down ? 0.8 : 0.5}
              strokeWidth="0.25"
            />
          </g>
        );
      })}
      <path d={SLITS_D} stroke="#5b6672" strokeWidth="0.85" strokeLinecap="round" fill="none" />
    </PhotoSvg>
  );
}
