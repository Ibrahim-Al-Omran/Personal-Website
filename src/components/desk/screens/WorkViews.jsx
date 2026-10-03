'use client';

import Image from 'next/image';
import { ArrowUpRight, Calendar, ChevronLeft, Github, Sparkles, Timer, Users } from 'lucide-react';
import { serif } from './fonts';
import { HAIRLINE, INK, MUTED, PAPER, SYSTEM_FONT } from './os';

// Views for the Projects (Finder) window. Class names deliberately avoid the
// word "project": globals.css repositions anything matching [class*="project"].

const buttonBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '6px 11px',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1,
  borderRadius: 7,
};

export function LinkButtons({ item, large }) {
  const style = large ? { ...buttonBase, gap: 7, padding: '9px 15px', fontSize: 13.5, borderRadius: 9 } : buttonBase;
  const icon = large ? 15 : 13;
  return (
    <>
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#201201] text-[#fffcf9] transition-colors hover:bg-[#3d2710] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d43]"
          style={style}
        >
          {large ? 'Visit live site' : 'Live'}
          <ArrowUpRight size={icon} strokeWidth={2.2} aria-hidden />
        </a>
      )}
      {item.repo && (
        <a
          href={item.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/70 text-[#201201] shadow-[inset_0_0_0_0.5px_rgba(32,18,1,0.28)] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d43]"
          style={style}
        >
          <Github size={icon} strokeWidth={2} aria-hidden />
          {large ? 'View source' : 'Repo'}
        </a>
      )}
    </>
  );
}

function initials(title) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function Placeholder({ item, compact }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        background:
          'radial-gradient(rgba(32,18,1,0.08) 1px, transparent 1.2px) 0 0 / 14px 14px, linear-gradient(135deg, #dcefdc 0%, #f4ece2 100%)',
      }}
    >
      <div className="flex flex-col items-center">
        <span className={serif.className} style={{ fontSize: compact ? 11 : 44, fontWeight: 700, color: 'rgba(32,18,1,0.72)', lineHeight: 1 }}>
          {initials(item.title)}
        </span>
        {!compact && (
          <span
            style={{
              marginTop: 8,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: 11.5,
              color: 'rgba(32,18,1,0.5)',
            }}
          >
            {item.tech.join(' · ')}
          </span>
        )}
      </div>
    </div>
  );
}

export function Thumb({ item, sizes, className = '', style, compact, priority }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: '#efe7dc', ...style }}>
      {item.image ? (
        <Image
          src={item.image}
          alt={compact ? '' : `${item.title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
          draggable={false}
        />
      ) : (
        <Placeholder item={item} compact={compact} />
      )}
    </div>
  );
}

function Tags({ tech, max, size = 'sm' }) {
  const shown = max ? tech.slice(0, max) : tech;
  const extra = tech.length - shown.length;
  const style =
    size === 'sm'
      ? { fontSize: 11, padding: '3px 7px', borderRadius: 5 }
      : { fontSize: 12.5, padding: '5px 10px', borderRadius: 7 };
  return (
    <div className="flex flex-wrap gap-[5px]">
      {shown.map((t) => (
        <span key={t} style={{ ...style, background: 'rgba(32,18,1,0.06)', color: 'rgba(32,18,1,0.78)', fontWeight: 500 }}>
          {t}
        </span>
      ))}
      {extra > 0 && <span style={{ ...style, color: MUTED, fontWeight: 500 }}>+{extra}</span>}
    </div>
  );
}

function WorkCard({ item, onOpen }) {
  return (
    <div
      className="group/card relative flex flex-col overflow-hidden rounded-[12px] shadow-[0_0_0_0.5px_rgba(32,18,1,0.16),0_1px_2px_rgba(32,18,1,0.06),0_8px_20px_-10px_rgba(32,18,1,0.22)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_0_0_0.5px_rgba(32,18,1,0.2),0_2px_4px_rgba(32,18,1,0.06),0_18px_34px_-14px_rgba(32,18,1,0.38)]"
      style={{ background: PAPER, fontFamily: SYSTEM_FONT, color: INK }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title}`}
        className="absolute inset-0 z-[1] rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d43]"
      />
      <Thumb item={item} sizes="300px" className="aspect-[16/9]" style={{ borderBottom: `0.5px solid ${HAIRLINE}` }} />
      <div className="flex flex-1 flex-col px-[14px] pb-[13px] pt-[11px]">
        <div className="flex items-start justify-between gap-[8px]">
          <h3 className={serif.className} style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.25 }}>
            {item.title}
          </h3>
          <span className="shrink-0" style={{ fontSize: 11.5, color: MUTED, marginTop: 3 }}>
            {item.date}
          </span>
        </div>
        <div className="truncate" style={{ fontSize: 11.5, color: MUTED, marginTop: 2 }}>
          {item.type} · {item.length}
        </div>
        <p className="line-clamp-2" style={{ fontSize: 12.5, lineHeight: 1.45, color: 'rgba(32,18,1,0.78)', marginTop: 8 }}>
          {item.description}
        </p>
        <div style={{ marginTop: 10 }}>
          <Tags tech={item.tech} max={3} />
        </div>
        <div className="relative z-[2] mt-auto flex gap-[6px] pt-[12px]">
          <LinkButtons item={item} />
        </div>
      </div>
    </div>
  );
}

export function WorkGrid({ items, onOpen }) {
  return (
    <div className="grid gap-[18px] p-[20px]" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
      {items.map((item) => (
        <WorkCard key={item.title} item={item} onOpen={() => onOpen(item.title)} />
      ))}
    </div>
  );
}

const LIST_COLUMNS = 'minmax(0, 1fr) 130px 190px 92px';

export function WorkList({ items, onOpen }) {
  return (
    <div style={{ fontFamily: SYSTEM_FONT, color: INK, fontSize: 13 }}>
      <div
        className="sticky top-0 z-[3] grid items-center px-[20px]"
        style={{
          gridTemplateColumns: LIST_COLUMNS,
          height: 30,
          fontSize: 11.5,
          fontWeight: 600,
          color: MUTED,
          background: 'rgba(255,252,249,0.94)',
          borderBottom: `0.5px solid ${HAIRLINE}`,
        }}
      >
        <span>Name</span>
        <span>Date</span>
        <span>Kind</span>
        <span>Length</span>
      </div>
      <div className="px-[10px] py-[6px]">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onOpen(item.title)}
            className="grid w-full items-center rounded-[7px] px-[10px] text-left outline-none transition-colors hover:bg-[rgba(47,125,67,0.1)] focus-visible:bg-[rgba(47,125,67,0.14)]"
            style={{ gridTemplateColumns: LIST_COLUMNS, height: 40, background: i % 2 ? 'rgba(32,18,1,0.03)' : undefined }}
          >
            <span className="flex min-w-0 items-center gap-[10px]">
              <Thumb item={item} sizes="64px" compact className="h-[26px] w-[40px] shrink-0 rounded-[4px]" style={{ boxShadow: `0 0 0 0.5px ${HAIRLINE}` }} />
              <span className="truncate" style={{ fontWeight: 500 }}>
                {item.title}
              </span>
            </span>
            <span className="truncate" style={{ color: MUTED }}>{item.date}</span>
            <span className="truncate" style={{ color: MUTED }}>{item.type}</span>
            <span className="truncate" style={{ color: MUTED }}>{item.length}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Meta({ Icon, children }) {
  return (
    <span className="inline-flex items-center gap-[6px]">
      <Icon size={14} strokeWidth={2} style={{ opacity: 0.6 }} aria-hidden />
      {children}
    </span>
  );
}

export function WorkDetail({ item, onBack, backLabel }) {
  return (
    <div style={{ padding: '16px 32px 30px', fontFamily: SYSTEM_FONT, color: INK }}>
      <button
        type="button"
        onClick={onBack}
        className="-ml-[6px] inline-flex items-center gap-[2px] rounded-[6px] py-[3px] pl-[2px] pr-[8px] outline-none transition-colors hover:bg-[rgba(32,18,1,0.07)] focus-visible:bg-[rgba(32,18,1,0.07)]"
        style={{ fontSize: 13, fontWeight: 500, color: '#2f7d43' }}
      >
        <ChevronLeft size={17} strokeWidth={2.2} aria-hidden />
        {backLabel}
      </button>

      <div className="mt-[14px] grid gap-[28px]" style={{ gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)' }}>
        <Thumb
          item={item}
          sizes="520px"
          priority
          className="aspect-[16/10] self-start rounded-[12px]"
          style={{ boxShadow: '0 0 0 0.5px rgba(32,18,1,0.18), 0 14px 32px -14px rgba(32,18,1,0.45)' }}
        />
        <div className="flex min-w-0 flex-col">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED }}>
            {item.type}
          </div>
          <h2 className={serif.className} style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.1, marginTop: 6 }}>
            {item.title}
          </h2>
          <div className="flex flex-wrap gap-x-[16px] gap-y-[4px]" style={{ fontSize: 12.5, color: MUTED, marginTop: 10 }}>
            <Meta Icon={Calendar}>{item.date}</Meta>
            <Meta Icon={Timer}>{item.length}</Meta>
            {/team|group/i.test(item.type) && <Meta Icon={Users}>Collaborative</Meta>}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 14, color: 'rgba(32,18,1,0.88)' }}>{item.description}</p>
          <div style={{ marginTop: 16 }}>
            <Tags tech={item.tech} size="md" />
          </div>
          <div className="flex flex-wrap gap-[8px]" style={{ marginTop: 18 }}>
            <LinkButtons item={item} large />
          </div>
        </div>
      </div>

      {item.highlight && (
        <div
          className="mt-[24px] flex gap-[12px] rounded-[12px]"
          style={{ padding: '14px 16px', background: 'rgba(187, 226, 188, 0.45)', boxShadow: 'inset 0 0 0 0.5px rgba(47,125,67,0.25)' }}
        >
          <Sparkles size={18} strokeWidth={2} className="mt-[1px] shrink-0" style={{ color: '#2f7d43' }} aria-hidden />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2f5fae' }}>
              Highlight
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 3 }}>{item.highlight}</p>
          </div>
        </div>
      )}
    </div>
  );
}
