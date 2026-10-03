'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Code2, Globe, LayoutGrid, List, Search, X } from 'lucide-react';
import { projects } from '@/data/projects';
import { useDesk } from '../DeskContext';
import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import Window, { TrafficLights } from './Window';
import { WorkDetail, WorkGrid, WorkList } from './WorkViews';
import { ACCENT, HAIRLINE, INK, MENU_BAR_HEIGHT, MUTED, SYSTEM_FONT } from './os';
import styles from './screens.module.css';

const WINDOW = { top: MENU_BAR_HEIGHT + 14, left: 20, right: 20, bottom: 18 };
const WINDOW_ZOOMED = { top: MENU_BAR_HEIGHT + 4, left: 4, right: 4, bottom: 4 };

const FAVORITES = [
  { id: 'all', label: 'All Projects', Icon: LayoutGrid, test: () => true },
  { id: 'live', label: 'Live Demos', Icon: Globe, test: (p) => Boolean(p.link) },
  { id: 'source', label: 'Source Code', Icon: Code2, test: (p) => Boolean(p.repo) },
];

// Finder tag colors, assigned to the most-used technologies.
const TAG_COLORS = ['#ff453a', '#ff9f0a', '#f5c400', '#30c552', '#0a84ff', '#bf5af2', '#8e8e93'];
const TAGS = (() => {
  const counts = new Map();
  projects.forEach((p) => p.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, TAG_COLORS.length)
    .map(([name], i) => ({ id: `tag:${name}`, label: name, color: TAG_COLORS[i], test: (p) => p.tech.includes(name) }));
})();

const FILTERS = [...FAVORITES, ...TAGS];

function SidebarItem({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[28px] w-full items-center gap-[8px] rounded-[6px] px-[8px] text-left outline-none transition-colors duration-100 hover:bg-[rgba(32,18,1,0.05)] focus-visible:bg-[rgba(32,18,1,0.08)]"
      style={{ background: active ? 'rgba(32,18,1,0.09)' : undefined, fontWeight: active ? 600 : 450 }}
    >
      {children}
    </button>
  );
}

function SidebarHeading({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(32,18,1,0.45)', padding: '14px 8px 4px' }}>{children}</div>;
}

function Sidebar({ filter, onFilter, onClose, onZoom }) {
  return (
    <aside
      className={`${styles.scroll} flex w-[192px] shrink-0 flex-col pb-[12px]`}
      style={{
        fontFamily: SYSTEM_FONT,
        fontSize: 13,
        color: INK,
        background: 'rgba(238, 228, 216, 0.42)',
        borderRight: `0.5px solid ${HAIRLINE}`,
      }}
    >
      <div className="flex h-[52px] shrink-0 items-center px-[18px]">
        <TrafficLights onClose={onClose} onZoom={onZoom} closeLabel="Close (back to desk)" />
      </div>
      <div className="px-[10px]">
        <SidebarHeading>Favorites</SidebarHeading>
        {FAVORITES.map(({ id, label, Icon }) => (
          <SidebarItem key={id} active={filter === id} onClick={() => onFilter(id)}>
            <Icon size={15} strokeWidth={2} style={{ color: ACCENT }} aria-hidden />
            {label}
          </SidebarItem>
        ))}
        <SidebarHeading>Tags</SidebarHeading>
        {TAGS.map(({ id, label, color }) => (
          <SidebarItem key={id} active={filter === id} onClick={() => onFilter(id)}>
            <span className="mx-[2.5px] h-[10px] w-[10px] shrink-0 rounded-full" style={{ background: color, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
            <span className="truncate">{label}</span>
          </SidebarItem>
        ))}
      </div>
    </aside>
  );
}

function ToolButton({ label, disabled, active, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className="grid h-[28px] min-w-[30px] place-items-center rounded-[6px] px-[4px] outline-none transition-colors duration-100 enabled:hover:bg-[rgba(32,18,1,0.07)] focus-visible:bg-[rgba(32,18,1,0.08)] disabled:opacity-30"
      style={{ background: active ? 'rgba(32,18,1,0.1)' : undefined, color: INK }}
    >
      {children}
    </button>
  );
}

export default function ProjectsScreen() {
  const { setFocus } = useDesk();
  const [zoomed, setZoomed] = useState(false);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [forward, setForward] = useState(null);
  const scrollRef = useRef(null);
  const savedScroll = useRef(0);

  const activeFilter = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        activeFilter.test(p) &&
        (!q || [p.title, p.description, p.type, ...p.tech].some((field) => field.toLowerCase().includes(q)))
    );
  }, [activeFilter, query]);
  const current = selected ? projects.find((p) => p.title === selected) : null;

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = selected ? 0 : savedScroll.current;
  }, [selected]);

  const open = (title) => {
    savedScroll.current = scrollRef.current?.scrollTop ?? 0;
    setForward(null);
    setSelected(title);
  };
  const back = () => {
    setForward(selected);
    setSelected(null);
  };
  const resetTo = (update) => {
    savedScroll.current = 0;
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setSelected(null);
    setForward(null);
    update();
  };

  const title = current ? current.title : activeFilter.label;
  const path = ['Ibrahim', 'Projects', current?.title].filter(Boolean).join('  ›  ');
  const status = current
    ? current.type
    : `${items.length === projects.length ? projects.length : `${items.length} of ${projects.length}`} items`;

  return (
    <div className="relative h-full w-full select-text overflow-hidden" style={{ color: INK }}>
      <Wallpaper />
      <MenuBar app="Finder" menus={['File', 'Edit', 'View', 'Go', 'Window', 'Help']} />

      <Window rect={zoomed ? WINDOW_ZOOMED : WINDOW} label="Projects">
        <div className="flex h-full">
          <Sidebar
            filter={filter}
            onFilter={(id) => resetTo(() => setFilter(id))}
            onClose={() => setFocus(null)}
            onZoom={() => setZoomed((z) => !z)}
          />

          <div className="flex min-w-0 flex-1 flex-col" style={{ background: 'rgba(255, 252, 249, 0.74)', fontFamily: SYSTEM_FONT }}>
            <div
              className="flex h-[52px] shrink-0 items-center gap-[10px] pl-[12px] pr-[14px]"
              style={{ borderBottom: `0.5px solid ${HAIRLINE}` }}
            >
              <div className="flex items-center">
                <ToolButton label="Back" disabled={!current} onClick={back}>
                  <ChevronLeft size={20} strokeWidth={2.2} />
                </ToolButton>
                <ToolButton label="Forward" disabled={current || !forward} onClick={() => open(forward)}>
                  <ChevronRight size={20} strokeWidth={2.2} />
                </ToolButton>
              </div>
              <div className="min-w-0 flex-1 truncate" style={{ fontSize: 15, fontWeight: 650 }}>
                {title}
              </div>
              <div className="flex items-center rounded-[7px] p-[2px]" style={{ background: 'rgba(32,18,1,0.05)' }}>
                <ToolButton label="Icon view" active={view === 'grid'} onClick={() => resetTo(() => setView('grid'))}>
                  <LayoutGrid size={15} strokeWidth={2} />
                </ToolButton>
                <ToolButton label="List view" active={view === 'list'} onClick={() => resetTo(() => setView('list'))}>
                  <List size={16} strokeWidth={2} />
                </ToolButton>
              </div>
              <label
                className="flex h-[28px] w-[190px] items-center gap-[6px] rounded-[7px] px-[8px] focus-within:shadow-[0_0_0_2.5px_rgba(47,125,67,0.45)]"
                style={{ background: 'rgba(32,18,1,0.06)', color: MUTED }}
              >
                <Search size={14} strokeWidth={2.2} aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => resetTo(() => setQuery(e.target.value))}
                  placeholder="Search"
                  aria-label="Search projects"
                  className={`${styles.search} min-w-0 flex-1 bg-transparent outline-none`}
                  style={{ fontSize: 13, color: INK }}
                />
                {query && (
                  <button type="button" aria-label="Clear search" onClick={() => resetTo(() => setQuery(''))} className="grid place-items-center rounded-full p-[1px] hover:bg-[rgba(32,18,1,0.1)]">
                    <X size={12} strokeWidth={2.5} />
                  </button>
                )}
              </label>
            </div>

            <div ref={scrollRef} className={`${styles.scroll} min-h-0 flex-1`}>
              <motion.div
                key={current ? current.title : `${view}:${filter}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {current ? (
                  <WorkDetail item={current} onBack={back} backLabel={activeFilter.label} />
                ) : items.length === 0 ? (
                  <div className="grid h-[320px] place-items-center text-center" style={{ fontSize: 14, color: MUTED }}>
                    <div>
                      <Search size={30} strokeWidth={1.6} className="mx-auto mb-[10px] opacity-50" aria-hidden />
                      No items match &ldquo;{query}&rdquo;
                    </div>
                  </div>
                ) : view === 'grid' ? (
                  <WorkGrid items={items} onOpen={open} />
                ) : (
                  <WorkList items={items} onOpen={open} />
                )}
              </motion.div>
            </div>

            <div
              className="flex h-[26px] shrink-0 items-center justify-between px-[14px]"
              style={{ borderTop: `0.5px solid ${HAIRLINE}`, fontSize: 11.5, color: MUTED, whiteSpace: 'pre' }}
            >
              <span className="truncate">{path}</span>
              <span className="truncate">{status}</span>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}
