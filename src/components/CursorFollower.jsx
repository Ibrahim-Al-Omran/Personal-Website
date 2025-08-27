'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorLight() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lightRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lightPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Only run on desktop devices
    const isDesktop = !('ontouchstart' in window) && window.innerWidth > 768;
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth lerp animation using requestAnimationFrame
    const animateLight = () => {
      if (!lightRef.current) return;

      // Lerp factor for smooth following (0.1 = slow, 0.3 = fast)
      const lerpFactor = 1.0;

      // Calculate smooth interpolated position
      lightPos.current.x += (mousePos.current.x - lightPos.current.x) * lerpFactor;
      lightPos.current.y += (mousePos.current.y - lightPos.current.y) * lerpFactor;

      // Update light position
      lightRef.current.style.transform = `translate(${lightPos.current.x - 400}px, ${lightPos.current.y - 400}px)`;

      // Continue animation
      animationRef.current = requestAnimationFrame(animateLight);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animationRef.current = requestAnimationFrame(animateLight);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, isMounted]);

  // Don't render on server-side or mobile/touch devices
  if (!isMounted) return null;
  
  if (typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth <= 768)) {
    return null;
  }

  return (
    <div
      ref={lightRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-10
        w-[800px] h-[800px] rounded-full
        transition-opacity duration-500 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 15%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 70%, rgba(255,255,255,0.005) 85%, transparent 100%)',
        mixBlendMode: 'screen',
        filter: 'blur(15px)',
      }}
    />
  );
}
