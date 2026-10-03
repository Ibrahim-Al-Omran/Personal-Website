'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { experience, otherProjects } from '@/data/experience';
import HighwayBackground from '@/components/HighwayBackground';

const INK = '#262727';
const MUTED = 'rgba(38, 39, 39, 0.58)';
const META = 'rgba(38, 39, 39, 0.78)';
const FAINT = 'rgba(38, 39, 39, 0.32)';
const ACCENT = '#c1ddff';

function ExperienceRow({ item, open, onToggle }) {
  return (
    <li className={`exp-row${open ? ' is-open' : ''}`}>
      <span className="exp-year" aria-hidden={!item.showYear}>
        {item.showYear ? item.year : ''}
      </span>
      <div className="exp-row-body">
        <button
          type="button"
          className="exp-link group"
          aria-expanded={open}
          onClick={onToggle}
        >
          <span className="exp-name">
            <span className="truncate font-semibold tracking-tight" style={{ color: INK, fontSize: 15 }}>
              {item.name}
            </span>
            {item.live && (
              <span className="relative flex h-1.5 w-1.5 shrink-0" aria-label="Current">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-55"
                  style={{ background: ACCENT }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: INK }} />
              </span>
            )}
          </span>
          <span className="exp-detail truncate" style={{ color: META, fontSize: 12 }}>
            {item.detail}
          </span>
          <span className="exp-dates hidden sm:inline" style={{ color: META, fontSize: 12 }}>
            {item.dates}
          </span>
          <span className="exp-arrow flex shrink-0 items-center justify-end gap-2 sm:justify-start">
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200${open ? ' rotate-180' : ''}`}
              style={{ color: FAINT }}
              strokeWidth={2}
            />
          </span>
        </button>

        <div className="exp-panel-body" hidden={!open}>
          <p className="exp-blurb" style={{ color: MUTED }}>
            {item.blurb}
          </p>
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-visit"
            >
              Open
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

const TABS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
];

export default function ExperienceLanding({ onOpenDesk }) {
  const [tab, setTab] = useState('experience');
  const [openId, setOpenId] = useState(null);
  const rows = tab === 'experience' ? experience : otherProjects;

  const switchTab = (id) => {
    setTab(id);
    setOpenId(null);
  };

  return (
    <div className="exp-stage">
      <HighwayBackground />

      <main className="exp-main relative z-10 mx-auto w-full max-w-[720px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="exp-cutout">
          <header className="exp-hero mb-10 sm:mb-12">
            <h1
              className="text-[clamp(2.4rem,7vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.02em]"
              style={{ color: INK }}
            >
              Ibrahim Al Omran
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed sm:text-base" style={{ color: MUTED }}>
              Software Engineering @ McMaster
            </p>

            <div className="exp-socials mt-6 flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/ibrahim-al-omran/"
                target="_blank"
                rel="noopener noreferrer"
                className="exp-icon"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} strokeWidth={1.75} />
              </Link>
              <Link
                href="https://github.com/Ibrahim-Al-Omran"
                target="_blank"
                rel="noopener noreferrer"
                className="exp-icon"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github size={22} strokeWidth={1.75} />
              </Link>
              <Link
                href="mailto:ibrahimao2005@gmail.com"
                className="exp-icon"
                title="Email"
                aria-label="Email"
              >
                <Mail size={22} strokeWidth={1.75} />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="exp-icon"
                title="Resume"
                aria-label="Resume"
              >
                <FileText size={22} strokeWidth={1.75} />
              </Link>
            </div>
          </header>

          <section aria-labelledby="landing-tab-heading">
            <div className="exp-tabs" role="tablist" aria-label="Landing sections">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  className={`exp-tab${tab === t.id ? ' is-active' : ''}`}
                  onClick={() => switchTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2 id="landing-tab-heading" className="sr-only">
              {tab === 'experience' ? 'Experience' : 'Projects'}
            </h2>

            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              <ul className="exp-list w-full">
                {rows.map((item) => (
                  <ExperienceRow
                    key={item.id}
                    item={item}
                    open={openId === item.id}
                    onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
                  />
                ))}
              </ul>
            </div>
          </section>

          <div className="exp-footer mt-10 flex justify-center sm:justify-start">
            <button type="button" onClick={onOpenDesk} className="exp-cta">
              See my setup
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
