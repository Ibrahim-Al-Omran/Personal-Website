// Room perspective, in stage units (room coordinates, desk at sitting height).

// Floor boards running toward the camera converge here.
export const VANISH = { x: 800, y: 453 };

// Where the wall meets the floor. Sits behind the desk top at sitting
// height and is revealed when the desk is raised; the feet stand further
// forward, at FLOOR_Y.
export const WALL_BASE_Y = 900;
export const BASEBOARD_HEIGHT = 24;
