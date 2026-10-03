'use client';

import { useEffect, useState } from 'react';

const format = (date) => {
  const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', '');
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return { day, time };
};

/** macOS menu-bar clock, e.g. "Fri Oct 2  1:44 PM". Renders only after mount. */
export default function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    let timer;
    const tick = () => {
      const date = new Date();
      setNow(date);
      timer = setTimeout(tick, 60_000 - (date.getSeconds() * 1000 + date.getMilliseconds()) + 30);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  if (!now) {
    return (
      <span aria-hidden style={{ visibility: 'hidden' }}>
        Fri Oct 2&nbsp;&nbsp;12:00 PM
      </span>
    );
  }

  const { day, time } = format(now);
  return (
    <time dateTime={now.toISOString()} style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
      {day}&nbsp;&nbsp;{time}
    </time>
  );
}
