export const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif';

export const INK = '#201201';
export const PAPER = '#fffcf9';
export const MUTED = 'rgba(32, 18, 1, 0.58)';
export const HAIRLINE = 'rgba(32, 18, 1, 0.1)';
export const ACCENT = '#2f7d43';

export const MENU_BAR_HEIGHT = 28;

// globals.css styles a[href*="linkedin" | "github" | "mailto"] like pill buttons;
// spread this into a link's inline style (then add your own values) to undo that.
export const plainLink = {
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  padding: 0,
  fontSize: 'inherit',
  fontWeight: 'inherit',
};

export const frosted = (alpha, blur = 24) => ({
  backgroundColor: `rgba(255, 252, 249, ${alpha})`,
  backdropFilter: `blur(${blur}px) saturate(1.6)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(1.6)`,
});
