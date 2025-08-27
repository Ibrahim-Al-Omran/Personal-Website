'use client';

import { useEffect, useState } from 'react';

export default function CursorLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Only add listeners on desktop (non-touch devices)
    const isDesktop = !('ontouchstart' in window);
    
    if (isDesktop) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (isDesktop) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Don't render on touch devices
  if ('ontouchstart' in window) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-10"
      style={{
        left: mousePosition.x - 150,
        top: mousePosition.y - 150,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)',
        borderRadius: '50%',
        transition: 'opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
        mixBlendMode: 'screen',
      }}
    />
  );
}
