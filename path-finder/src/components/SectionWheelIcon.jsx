import { withBase } from '../publicUrl';

/** Project wheel logo — same footprint as former 50×50 SVG section icons */
export default function SectionWheelIcon({ left = 460, top = 103 }) {
  return (
    <div
      style={{
        width: 50,
        height: 64,
        left,
        top,
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={withBase('images/path_finder/Wheel.png')}
        alt=""
        style={{ width: 50, height: 50, objectFit: 'contain', display: 'block' }}
      />
    </div>
  );
}
