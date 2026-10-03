'use client';

import { useId } from 'react';
import { Github } from 'lucide-react';

// App-icon artwork. Every icon fills its parent box, so callers size them.

// useId output contains characters that break SVG url(#...) references.
const useSvgId = () => `i${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

const tile = (background) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '23%',
  background,
  overflow: 'hidden',
  display: 'grid',
  placeItems: 'center',
  boxShadow:
    'inset 0 0 0 0.5px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 1.5px rgba(0,0,0,0.2), 0 4px 10px -2px rgba(0,0,0,0.18)',
});

export function AboutAppIcon() {
  return (
    <div style={tile('linear-gradient(180deg, #fffdfa 0%, #efe5d8 100%)')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ia_logo_512.png"
        alt=""
        draggable={false}
        decoding="async"
        style={{ width: '112%', height: '112%', maxWidth: 'none', mixBlendMode: 'multiply' }}
      />
    </div>
  );
}

export function LinkedInIcon() {
  return (
    <div style={tile('linear-gradient(180deg, #2b8de6 0%, #0a66c2 100%)')}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
        <circle cx="31" cy="29" r="7.5" fill="#fff" />
        <rect x="24.5" y="41" width="13" height="37" rx="1.5" fill="#fff" />
        <path
          d="M45 41h12.4v5.3c2.2-3.6 6.6-6.5 12.8-6.5C80.7 39.8 84 46.6 84 57v21H71.4V59.3c0-5-1.2-8.6-6.1-8.6-5 0-7.7 3.6-7.7 8.7V78H45z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}

export function GitHubIcon() {
  return (
    <div style={tile('linear-gradient(180deg, #3d434c 0%, #15191f 100%)')}>
      <Github color="#fff" strokeWidth={1.7} style={{ width: '56%', height: '56%' }} aria-hidden />
    </div>
  );
}

export function MailIcon() {
  const id = useSvgId();
  return (
    <div style={tile('linear-gradient(180deg, #6fcbff 0%, #1677f2 100%)')}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
        <defs>
          <linearGradient id={`${id}-env`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e4efff" />
          </linearGradient>
        </defs>
        <rect x="17" y="28" width="66" height="45" rx="6" fill={`url(#${id}-env)`} />
        <path d="M19 31l31 24 31-24" fill="none" stroke="#3f8ff0" strokeWidth="3.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function FolderIcon() {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5aa9f2" />
          <stop offset="1" stopColor="#2f86e3" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ed2ff" />
          <stop offset="1" stopColor="#5db3f7" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <path d="M7 24a6 6 0 0 1 6-6h21.5a5 5 0 0 1 3.6 1.5L44 25h43a6 6 0 0 1 6 6v49a6 6 0 0 1-6 6H13a6 6 0 0 1-6-6z" fill={`url(#${id}-back)`} />
        <path d="M7 37a6 6 0 0 1 6-6h74a6 6 0 0 1 6 6v43a6 6 0 0 1-6 6H13a6 6 0 0 1-6-6z" fill={`url(#${id}-front)`} />
        <path d="M13 32.5h74" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** A PDF document page, like a file icon on the desktop or in the dock. */
export function DocumentIcon() {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <path d="M24 6h37l21 21v63a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" fill="#fff" />
        <path d="M61 6v17a4 4 0 0 0 4 4h17z" fill="#e3e3e8" />
      </g>
      <g fill="#d9d9df">
        <rect x="29" y="33" width="26" height="3" rx="1.5" />
        <rect x="29" y="41" width="42" height="2.4" rx="1.2" />
        <rect x="29" y="47" width="42" height="2.4" rx="1.2" />
        <rect x="29" y="53" width="36" height="2.4" rx="1.2" />
        <rect x="29" y="59" width="42" height="2.4" rx="1.2" />
      </g>
      <rect x="27" y="68" width="34" height="16" rx="3.5" fill="#e5483a" />
      <text
        x="44"
        y="80"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill="#fff"
        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
        letterSpacing="0.5"
      >
        PDF
      </text>
    </svg>
  );
}
