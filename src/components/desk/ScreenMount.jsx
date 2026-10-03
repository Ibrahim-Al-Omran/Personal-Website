'use client';

import { SCREENS, SCREEN_DENSITY } from './sceneLayout';
import { useDesk } from './DeskContext';

/**
 * Fills a monitor's screen opening (the parent must be exactly SCREENS[id]
 * in size). Content is laid out at SCREEN_DENSITY x the screen size, so a
 * screen authors like a small real display, then scaled down to fit.
 *
 * Until the camera is zoomed into this screen, a transparent button covers
 * it: clicking zooms in, and only then is the content interactive.
 */
export default function ScreenMount({ id, children }) {
  const { focus, setFocus } = useDesk();
  const { width, height, label } = SCREENS[id];
  const focused = focus === id;

  return (
    <div data-screen={id} className="absolute inset-0 overflow-hidden bg-black">
      <div
        className="absolute left-0 top-0"
        style={{
          width: width * SCREEN_DENSITY,
          height: height * SCREEN_DENSITY,
          transform: `scale(${1 / SCREEN_DENSITY})`,
          transformOrigin: '0 0',
        }}
        inert={focused ? undefined : true}
      >
        {children}
      </div>
      {!focused && (
        <button
          type="button"
          aria-label={`Open ${label}`}
          onClick={() => setFocus(id)}
          className="desk-screen-hit absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
