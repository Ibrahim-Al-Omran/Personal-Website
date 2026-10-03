import { SYSTEM_FONT, plainLink } from './os';

/** A file on the desktop: icon with a white, shadowed label underneath. */
export default function DesktopIcon({ href, label, icon, external, style }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group/file absolute z-10 w-[96px] select-none outline-none"
      style={{ ...plainLink, flexDirection: 'column', gap: 5, fontFamily: SYSTEM_FONT, ...style }}
    >
      <span className="block rounded-[8px] p-[5px] transition-colors group-hover/file:bg-[rgba(0,0,0,0.22)] group-focus-visible/file:bg-[rgba(0,0,0,0.22)]">
        <span className="block h-[58px] w-[58px]">{icon}</span>
      </span>
      <span
        className="rounded-[4px] px-[5px] py-px text-center transition-colors group-hover/file:bg-[#2f7d43] group-focus-visible/file:bg-[#2f7d43]"
        style={{ fontSize: 12.5, fontWeight: 500, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.7)', lineHeight: 1.3 }}
      >
        {label}
      </span>
    </a>
  );
}
