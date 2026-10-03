'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDesk } from '../DeskContext';
import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import Window, { TrafficLights } from './Window';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import { AboutAppIcon, DocumentIcon, FolderIcon, GitHubIcon, LinkedInIcon, MailIcon } from './AppIcons';
import { serif } from './fonts';
import { HAIRLINE, INK, MENU_BAR_HEIGHT, MUTED, PAPER, SYSTEM_FONT, plainLink } from './os';
import styles from './screens.module.css';

const LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    detail: 'in/ibrahim-al-omran',
    href: 'https://www.linkedin.com/in/ibrahim-al-omran/',
    Icon: LinkedInIcon,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    detail: 'Ibrahim-Al-Omran',
    href: 'https://github.com/Ibrahim-Al-Omran',
    Icon: GitHubIcon,
    external: true,
  },
  { id: 'email', label: 'Email', detail: 'ibrahimao2005@gmail.com', href: 'mailto:ibrahimao2005@gmail.com', Icon: MailIcon },
  { id: 'resume', label: 'Resume', detail: 'resume.pdf', href: '/resume.pdf', Icon: DocumentIcon, external: true },
];

const WINDOW = { top: MENU_BAR_HEIGHT + 18, left: 178, right: 178, bottom: 96 };
const WINDOW_ZOOMED = { top: MENU_BAR_HEIGHT + 6, left: 8, right: 8, bottom: 90 };

const paragraph = { marginBottom: 13 };

function ContactRow({ link }) {
  const { Icon } = link;
  return (
    <a
      href={link.href}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group/row rounded-[8px] outline-none transition-colors duration-100 hover:bg-[rgba(32,18,1,0.07)] focus-visible:bg-[rgba(32,18,1,0.07)]"
      style={{ ...plainLink, gap: 10, padding: '6px 8px', color: INK }}
    >
      <span className="block h-[28px] w-[28px] shrink-0">
        <Icon />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block" style={{ fontSize: 13, fontWeight: 600 }}>
          {link.label}
        </span>
        <span className="block truncate" style={{ fontSize: 11.5, color: MUTED }}>
          {link.detail}
        </span>
      </span>
      <ArrowUpRight
        size={14}
        className="shrink-0 opacity-0 transition-opacity group-hover/row:opacity-60 group-focus-visible/row:opacity-60"
        aria-hidden
      />
    </a>
  );
}

function Sidebar({ onClose, onZoom }) {
  return (
    <aside
      className="flex w-[256px] shrink-0 flex-col"
      style={{
        fontFamily: SYSTEM_FONT,
        color: INK,
        background: 'rgba(238, 228, 216, 0.42)',
        borderRight: `0.5px solid ${HAIRLINE}`,
      }}
    >
      <div className="flex h-[52px] shrink-0 items-center px-[18px]">
        <TrafficLights onClose={onClose} onZoom={onZoom} closeLabel="Close (back to desk)" />
      </div>

      <div className="flex flex-col items-center px-5 pb-[18px] text-center">
        <div
          className="h-[92px] w-[92px] overflow-hidden rounded-full"
          style={{ background: PAPER, boxShadow: '0 0 0 0.5px rgba(32,18,1,0.2), 0 8px 20px -6px rgba(32,18,1,0.3)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny circular crop; next/image fights the overflow clip */}
          <img
            src="/profile.jpg"
            alt="Ibrahim Al Omran"
            className="h-full w-full object-cover"
          />
        </div>
        <div className={serif.className} style={{ fontSize: 21, fontWeight: 700, marginTop: 13, lineHeight: 1.2 }}>
          Ibrahim Al Omran
        </div>
        <div style={{ fontSize: 12.5, color: MUTED, marginTop: 4, lineHeight: 1.4 }}>
          Software Engineering Student
          <br />
          McMaster University
        </div>
      </div>

      <div className="mx-4 h-px shrink-0" style={{ background: HAIRLINE }} />

      <div className="px-[10px] pt-[12px]">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(32,18,1,0.45)', padding: '0 8px 5px' }}>Connect</div>
        <div className="flex flex-col gap-[2px]">
          {LINKS.map((link) => (
            <ContactRow key={link.id} link={link} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function AboutCopy() {
  return (
    <article style={{ maxWidth: 640, color: INK }}>
      <h1 className={serif.className} style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 20 }}>
        Hi, I&apos;m Ibrahim.
      </h1>
      <div className={serif.className} style={{ fontSize: 16, lineHeight: 1.6 }}>
        <p style={paragraph}>
          I&apos;m a Software Engineering student at McMaster University, currently a{' '}
          <strong>Software Engineer</strong> at{' '}
          <span className="ascendance-logo font-black">Ascendance Foundry</span>,
          where I build custom AI-powered software and automation for clients.
        </p>
        <p style={paragraph}>
          On the side, I&apos;m building{' '}
          <a href="https://www.cdlsimulator.com/" target="_blank" rel="noopener noreferrer" className="sandbox-logo font-black">
            Sandbox Simulator
          </a>
          , a world-building simulation platform with 10,000+ users and 20,000+ weekly visitors.
        </p>
        <p style={paragraph}>
          Previously, I was a Software Engineer Intern at{' '}
          <span className="amd-logo font-black">AMD</span>,
          where I wrote ML models as GPU kernels and fused operators from ONNX graphs into optimized kernels for next-gen graphics architectures.
        </p>
        <p style={paragraph}>
          I thrive on challenging myself and learn best through difficult experiences.
          My passion for technology drives everything I do.
        </p>
        <p style={paragraph}>
          You&apos;ll find all my projects on GitHub, with my favorites showcased here.
          When I&apos;m not coding, you&apos;ll find me at the gym, on the tennis court, or exploring the latest tech on YouTube.
        </p>
        <p style={paragraph}>Let&apos;s connect! Feel free to reach out through any of the links below.</p>
        <p style={{ marginBottom: 0, fontSize: 13.5, lineHeight: 1.55, color: MUTED }}>
          Fun fact: this is an exact replica of my desk setup.
        </p>
      </div>
    </article>
  );
}

export default function AboutScreen() {
  const { setFocus } = useDesk();
  const [zoomed, setZoomed] = useState(false);

  const dockItems = [
    { id: 'about', label: 'About Me', icon: <AboutAppIcon />, running: true, bounce: true },
    { id: 'projects', label: 'Projects', icon: <FolderIcon />, running: true, onClick: () => setFocus('left') },
    { id: 'sep-apps', separator: true },
    ...LINKS.filter((link) => link.id !== 'resume').map((link) => ({
      id: link.id,
      label: link.label,
      icon: <link.Icon />,
      href: link.href,
      external: link.external,
    })),
    { id: 'sep-files', separator: true },
    { id: 'resume', label: 'Resume', icon: <DocumentIcon />, href: '/resume.pdf', external: true },
  ];

  return (
    <div className="relative h-full w-full select-text overflow-hidden" style={{ color: INK }}>
      <Wallpaper />
      <MenuBar app="About Me" menus={['File', 'Edit', 'View', 'Window', 'Help']} />

      <DesktopIcon
        href="/resume.pdf"
        external
        label="Resume.pdf"
        icon={<DocumentIcon />}
        style={{ top: MENU_BAR_HEIGHT + 16, right: 34 }}
      />

      <Window rect={zoomed ? WINDOW_ZOOMED : WINDOW} label="About Me">
        <div className="flex h-full">
          <Sidebar onClose={() => setFocus(null)} onZoom={() => setZoomed((z) => !z)} />

          <div className="flex min-w-0 flex-1 flex-col" style={{ background: 'rgba(255, 252, 249, 0.72)' }}>
            <div
              className="flex h-[52px] shrink-0 items-center gap-[14px] px-[18px]"
              style={{ fontFamily: SYSTEM_FONT }}
            >
              <div className="flex items-center gap-[2px]" style={{ color: 'rgba(32,18,1,0.28)' }} aria-hidden>
                <ChevronLeft size={20} strokeWidth={2.2} />
                <ChevronRight size={20} strokeWidth={2.2} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 650 }}>About Me</div>
            </div>
            <div className={`${styles.scroll} min-h-0 flex-1`} style={{ padding: '10px 52px 36px 46px' }}>
              <AboutCopy />
            </div>
          </div>
        </div>
      </Window>

      <Dock items={dockItems} />
    </div>
  );
}
