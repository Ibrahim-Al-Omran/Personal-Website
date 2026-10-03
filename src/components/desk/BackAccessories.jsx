import BackCables from './accessories/BackCables';
import PS5 from './accessories/PS5';
import EchoDot from './accessories/EchoDot';
import PebbleSpeaker from './accessories/PebbleSpeaker';

// The pair of speakers share one driver size.
const DRIVER = { rx: 13.2, ry: 11.6 };

// Objects at the back of the desk, drawn before the monitors so the monitors
// (and their stands) can cover them.
export default function BackAccessories() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <BackCables />
      <PS5 />
      <EchoDot />
      <PebbleSpeaker
        id="spk-l"
        cx={321.3}
        cy={379.8}
        r={35.2}
        bottomY={414.6}
        face={{ cx: 324, cy: 367.4, rx: 27.5, ry: 22.8 }}
        driver={{ cx: 322.6, cy: 366.8, ...DRIVER }}
      />
      <PebbleSpeaker
        id="spk-r"
        cx={736}
        cy={374}
        r={35.8}
        bottomY={409.6}
        face={{ cx: 735.5, cy: 359.4, rx: 26.5, ry: 20.8 }}
        driver={{ cx: 734.6, cy: 360.8, ...DRIVER }}
        knob={{ cx: 735.6, cy: 376.8 }}
      />
    </div>
  );
}
