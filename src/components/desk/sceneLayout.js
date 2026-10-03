// Every desk-scene part is drawn in "stage" units: a fixed 1600x1000 canvas
// that DeskScene scales to fit the viewport. Positions are measured off the
// reference photo (design/desk-reference.png, 1024x572) and mapped onto the
// stage with px()/py()/prect(), so parts can be placed by reading pixel
// coordinates straight off the photo.

export const STAGE = { width: 1600, height: 1000 };

export const PHOTO = {
  width: 1024,
  height: 572,
  scale: 1.6,
  offsetX: (1600 - 1024 * 1.6) / 2,
  offsetY: 86,
};

export const px = (x) => PHOTO.offsetX + x * PHOTO.scale;
export const py = (y) => PHOTO.offsetY + y * PHOTO.scale;
export const ps = (length) => length * PHOTO.scale;

export const prect = (x1, y1, x2, y2) => ({
  x: px(x1),
  y: py(y1),
  width: ps(x2 - x1),
  height: ps(y2 - y1),
});

// Desk height. `lift` is how far (stage units) the desk top sits above its
// lowest/sitting position. The room (wall, floor) never moves; everything on
// or attached to the desk is rendered inside the desk group, which is
// translated up by `lift`.
export const MAX_RAISE = 120;
export const RAISE_SPEED = 85; // stage units per second while a button is held
export const SIT_HEIGHT_CM = 72;
export const STAND_HEIGHT_CM = 118;
export const liftToCm = (lift) =>
  SIT_HEIGHT_CM + (lift / MAX_RAISE) * (STAND_HEIGHT_CM - SIT_HEIGHT_CM);

// Desk geometry at sitting height (stage units, desk-group coordinates).
const DESK_FRONT_Y = Math.round(py(530));

export const DESK = {
  backEdgeY: py(398), // where the desk top meets the wall
  frontEdgeY: DESK_FRONT_Y, // nearest edge of the desk top
  edgeThickness: 18,
  // Wider than the stage so it fills widescreen viewports; the front corners
  // flare out just slightly so the ends still read in perspective.
  leftX: -110,
  rightX: 1710,
  endFlare: 18,
  seamTop: { x: px(497), y: py(398) }, // the two desk panels meet here...
  seamBottom: { x: px(490), y: DESK_FRONT_Y }, // ...and here
  legCenters: [30, 1570], // telescoping legs, visible when the desk is raised
};

// The landing camera fits this stage rect (wall above the monitors and the
// outer edges trimmed, so the screens read as the thing to click). It rises
// `follow` x the desk's lift, so the monitors stay in frame when standing.
export const HOME_VIEW = { x: 35, y: 125, width: 1540, height: 875, follow: 0.75 };

// Floor line in stage coordinates (fixed; just below the stage at sitting height).
export const FLOOR_Y = 1012;

// Screen content areas (stage units, desk-group coordinates). Monitor frames
// must place their screen opening exactly here. Content is authored at
// SCREEN_DENSITY x this size (its "virtual resolution") and scaled down.
export const SCREEN_DENSITY = 2;
export const SCREENS = {
  left: { ...prect(112, 92, 500, 310), label: "Projects" },
  right: { ...prect(516, 56, 970, 311), label: "About me" },
};
SCREENS.left.height = SCREENS.left.width * (9 / 16);
SCREENS.right.height = SCREENS.right.width * (9 / 16);

// Reference bounding boxes, in PHOTO pixels (x1, y1, x2, y2). Convert with
// prect(...BOXES.name). These are starting points; refine against the photo.
export const BOXES = {
  // Monitors
  leftMonitor: [104, 85, 505, 322], // AOC, chin with "AOC" logo along the bottom
  leftStandColumn: [445, 300, 477, 395],
  leftStandBase: [428, 390, 488, 412],
  webcam: [287, 45, 336, 90], // clipped onto the top of the left monitor
  rightMonitor: [507, 40, 979, 323], // larger, thin bezels, angled slightly toward camera
  rightStandColumn: [550, 305, 590, 395],
  rightStandBase: [528, 390, 620, 418],
  rightMonitorCables: [598, 312, 616, 392], // white cables hanging behind the stand
  // Behind / beside the monitors
  ps5: [20, 168, 197, 428], // vertical PS5, partly hidden behind the left monitor
  echoDot: [197, 388, 262, 423],
  leftSpeaker: [286, 345, 357, 415], // Creative Pebble style, white
  rightSpeaker: [700, 338, 772, 410],
  // Plants
  centerPlant: [343, 283, 458, 415], // broad-leaf plant in a white pot (pot ~[362,350,433,415])
  snakePlant: [473, 310, 523, 412], // grey pot (pot ~[480,372,520,412])
  succulent: [620, 318, 695, 412], // cream pot (pot ~[625,352,690,412])
  // On the desk
  keyboard: [408, 443, 625, 477], // white Magic Keyboard
  mouse: [627, 415, 705, 457], // white ergonomic mouse
  earphones: [200, 455, 360, 572], // white wired earbuds, cable runs off the bottom
};
