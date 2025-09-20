'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    console.log("Initializing VantaBackground..."); // Debugging log
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
        color: 0xDAB0FF,        // #DAB0FF light purple for dots
        backgroundColor: 0x030612, // dark background
        lineColor: 0xDAB0FF,    // #DAB0FF light purple for connecting lines
        points: 10,
        maxDistance: 20,
        spacing: 15,
      });
      console.log("VantaBackground initialized."); // Debugging log
    }

    return () => {
      if (vantaEffect.current) {
        console.log("Destroying VantaBackground..."); // Debugging log
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
