'use client';

import { useCallback, useEffect, useState } from 'react';
import { FolderOpen, UserRound } from 'lucide-react';
import { px, py } from './sceneLayout';
import { useDesk } from './DeskContext';
import ProjectsScreen from './screens/ProjectsScreen';
import AboutScreen from './screens/AboutScreen';
import MonitorShell from './monitors/MonitorShell';
import { LeftFrame, RightFrame } from './monitors/Frames';
import { LeftStand, RightStand, Webcam, WallShadows } from './monitors/Stands';
import HoverLabel from './monitors/HoverLabel';

export default function Monitors() {
  const { focus } = useDesk();
  const [hovered, setHovered] = useState(null);
  // Both labels show for a few seconds on landing, until the visitor hovers or opens a screen.
  const [intro, setIntro] = useState(true);
  const onHoverChange = useCallback((id, over) => {
    if (over) setIntro(false);
    setHovered((current) => (over ? id : current === id ? null : current));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const showLabel = (id) => !focus && (intro || hovered === id);

  return (
    <>
      <WallShadows />
      <LeftStand />
      <RightStand />

      <MonitorShell id="left" frame={<LeftFrame />} overlay={<Webcam />} onHoverChange={onHoverChange}>
        <ProjectsScreen />
      </MonitorShell>

      <MonitorShell id="right" frame={<RightFrame />} onHoverChange={onHoverChange}>
        <AboutScreen />
      </MonitorShell>

      <HoverLabel
        x={px(306)}
        bottom={py(43)}
        title="Projects"
        Icon={FolderOpen}
        visible={showLabel('left')}
      />
      <HoverLabel
        x={px(742)}
        bottom={py(52)}
        title="About me"
        Icon={UserRound}
        visible={showLabel('right')}
      />
    </>
  );
}
