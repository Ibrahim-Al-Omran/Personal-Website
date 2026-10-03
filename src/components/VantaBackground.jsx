'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // THREE.VertexColors was removed in r152 — restore for Vanta compatibility
    if (THREE.VertexColors === undefined) {
      THREE.VertexColors = 2;
    }
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xfffcf9,
        backgroundColor: 0xc1ddff,
        points: 10,
        maxDistance: 20,
        spacing: 15,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="vanta-background fixed inset-0 w-full h-full -z-50"
    />
  );
};

export default VantaBackground;
