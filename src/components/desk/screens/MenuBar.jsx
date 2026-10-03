'use client';

import { Search, Wifi } from 'lucide-react';
import Clock from './Clock';
import { INK, MENU_BAR_HEIGHT, SYSTEM_FONT, frosted } from './os';

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function ControlCenterIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <rect x="1.5" y="2.25" width="13" height="5" rx="2.5" />
      <circle cx="12" cy="4.75" r="1.35" fill="currentColor" stroke="none" />
      <rect x="1.5" y="8.75" width="13" height="5" rx="2.5" />
      <circle cx="4" cy="11.25" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Item({ children, bold }) {
  return (
    <span
      className="flex h-[22px] items-center rounded-[5px] px-[9px] transition-colors duration-100 hover:bg-[rgba(32,18,1,0.09)]"
      style={{ fontWeight: bold ? 700 : 450 }}
    >
      {children}
    </span>
  );
}

/** Translucent macOS menu bar pinned to the top of a screen. */
export default function MenuBar({ app, menus }) {
  return (
    <div
      className="absolute inset-x-0 top-0 z-40 flex select-none items-center justify-between px-[8px]"
      style={{
        height: MENU_BAR_HEIGHT,
        fontFamily: SYSTEM_FONT,
        fontSize: 13.5,
        color: INK,
        ...frosted(0.5, 30),
        boxShadow: '0 0.5px 0 rgba(32, 18, 1, 0.12)',
      }}
    >
      <div className="flex items-center">
        <Item>
          <AppleLogo />
        </Item>
        <Item bold>{app}</Item>
        {menus.map((menu) => (
          <Item key={menu}>{menu}</Item>
        ))}
      </div>
      <div className="flex items-center">
        <Item>
          <Wifi size={15} strokeWidth={2.2} aria-hidden />
        </Item>
        <Item>
          <Search size={14} strokeWidth={2.4} aria-hidden />
        </Item>
        <Item>
          <ControlCenterIcon />
        </Item>
        <Item>
          <Clock />
        </Item>
      </div>
    </div>
  );
}
