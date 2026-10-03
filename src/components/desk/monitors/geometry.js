import { PHOTO, SCREENS, py } from '../sceneLayout';

// Both monitors are angled in toward the chair, mirror images of each other:
// each one's outer edge is nearer the viewer, so its inner edge reads a little
// shorter, foreshortened toward eye level. The monitor is drawn flat at
// SCREENS[id] and projected onto this quad; it un-projects back to the flat
// rectangle when the camera zooms into it.
const TOE_IN = 0.05;
const EYE_Y = py(200);

function toedInQuad(id, nearSide) {
  const { x, y, width, height } = SCREENS[id];
  const recede = (v) => v + (EYE_Y - v) * TOE_IN;
  const near = [y, y + height];
  const far = [recede(y), recede(y + height)];
  const [left, right] = nearSide === 'left' ? [near, far] : [far, near];
  // Stage coordinates: top-left, top-right, bottom-right, bottom-left.
  return [
    [x, left[0]],
    [x + width, right[0]],
    [x + width, right[1]],
    [x, left[1]],
  ];
}

export const SCREEN_QUADS = {
  left: toedInQuad('left', 'left'),
  right: toedInQuad('right', 'right'),
};

// Frame thickness around the flat screen opening, in photo px.
export const BEZELS = {
  left: { left: 7.5, top: 4.5, right: 6, bottom: 12.5 },
  right: { left: 6, top: 4.7, right: 8, bottom: 11.5 },
};

// Screen opening size in photo px (frames are authored in these units).
export const screenPhotoSize = (id) => ({
  width: SCREENS[id].width / PHOTO.scale,
  height: SCREENS[id].height / PHOTO.scale,
});
