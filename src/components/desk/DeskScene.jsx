'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { DeskProvider, useDesk } from './DeskContext';
import { HOME_VIEW, SCREENS, STAGE } from './sceneLayout';
import Room from './Room';
import DeskBase from './DeskBase';
import DeskSurface from './DeskSurface';
import BackAccessories from './BackAccessories';
import Monitors from './Monitors';
import FrontAccessories from './FrontAccessories';
import DeskController from './DeskController';
import useLayerWhileMoving from './useLayerWhileMoving';

const CAMERA_SPRING = { stiffness: 120, damping: 24, mass: 0.9 };
const FOCUS_FILL = { width: 0.94, height: 0.9 };

function useViewport() {
  const [viewport, setViewport] = useState(null);
  useLayoutEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return viewport;
}

function cameraFor(viewport, focus, lift) {
  if (!focus) {
    const view = HOME_VIEW;
    const scale = Math.min(viewport.width / view.width, viewport.height / view.height);
    const centerX = view.x + view.width / 2;
    const centerY = view.y + view.height / 2 - lift * view.follow;
    return {
      x: viewport.width / 2 - centerX * scale,
      y: viewport.height / 2 - centerY * scale,
      scale,
    };
  }
  const screen = SCREENS[focus];
  const scale = Math.min(
    (viewport.width * FOCUS_FILL.width) / screen.width,
    (viewport.height * FOCUS_FILL.height) / screen.height
  );
  // The desk group is shifted up by `lift`, so the camera follows the screen.
  const centerX = screen.x + screen.width / 2;
  const centerY = screen.y - lift + screen.height / 2;
  return {
    x: viewport.width / 2 - centerX * scale,
    y: viewport.height / 2 - centerY * scale,
    scale,
  };
}

function Stage() {
  const { lift, focus, setFocus, lite } = useDesk();
  const viewport = useViewport();
  const camX = useSpring(0, CAMERA_SPRING);
  const camY = useSpring(0, CAMERA_SPRING);
  const camScale = useSpring(1, CAMERA_SPRING);
  const deskY = useTransform(lift, (v) => -v);
  const [ready, setReady] = useState(false);

  const cameraRef = useRef(null);
  const deskRef = useRef(null);
  const cameraValues = useMemo(() => [camX, camY], [camX, camY]);
  const deskValues = useMemo(() => [deskY], [deskY]);
  useLayerWhileMoving(cameraRef, cameraValues, { scale: camScale });
  useLayerWhileMoving(deskRef, deskValues);

  useLayoutEffect(() => {
    if (!viewport) return;
    const apply = (jump) => {
      const cam = cameraFor(viewport, focus, lift.get());
      if (jump) {
        camX.jump(cam.x);
        camY.jump(cam.y);
        camScale.jump(cam.scale);
      } else {
        camX.set(cam.x);
        camY.set(cam.y);
        camScale.set(cam.scale);
      }
    };
    apply(!ready);
    if (!ready) setReady(true);
    return lift.on('change', () => apply(false));
  }, [viewport, focus, lift, camX, camY, camScale, ready]);

  const onPointerDown = (e) => {
    if (!focus) return;
    if (e.target.closest('[data-screen], [data-desk-control]')) return;
    setFocus(null);
  };

  return (
    <div
      className="desk-scene fixed inset-0 overflow-hidden"
      data-quality={lite ? 'lite' : 'full'}
      onPointerDown={onPointerDown}
      style={{ opacity: ready ? 1 : 0 }}
    >
      <motion.div
        ref={cameraRef}
        className="absolute left-0 top-0"
        style={{
          width: STAGE.width,
          height: STAGE.height,
          x: camX,
          y: camY,
          scale: camScale,
          transformOrigin: '0 0',
        }}
      >
        <Room />
        <motion.div ref={deskRef} className="absolute inset-0" style={{ y: deskY }}>
          <DeskBase />
          <DeskSurface />
          <BackAccessories />
          <Monitors />
          {/* The centre plant's leaves overlap the left screen, so clear them while it's zoomed in. */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: focus === 'left' ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <FrontAccessories />
          </motion.div>
          <DeskController />
        </motion.div>
      </motion.div>

      {focus && (
        <button
          type="button"
          onClick={() => setFocus(null)}
          className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/40 bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-black/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to desk
        </button>
      )}
    </div>
  );
}

export default function DeskScene() {
  return (
    <DeskProvider>
      <Stage />
    </DeskProvider>
  );
}
