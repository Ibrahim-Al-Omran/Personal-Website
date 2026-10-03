import CenterPlant from './accessories/CenterPlant';
import SnakePlant from './accessories/SnakePlant';
import Succulent from './accessories/Succulent';
import MagicKeyboard from './accessories/MagicKeyboard';
import Mouse from './accessories/Mouse';
import Earphones from './accessories/Earphones';

// Objects in front of the monitors. Everything is pointer-events: none; the
// plant leaves overlap the bottom of the left screen and react to the cursor
// through a window pointermove listener instead of hover targets.
export default function FrontAccessories() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <CenterPlant />
      <SnakePlant />
      <Succulent />
      <MagicKeyboard />
      <Mouse />
      <Earphones />
    </div>
  );
}
