import { withBase } from '../publicUrl';
import {
  SECTION_WHEEL_SIZE,
  SECTION_TITLE_LINE_HEIGHT,
  SECTION_ICON_TITLE_GAP,
  HERO_MAIN_COLUMN_LEFT,
} from '../pageLayout';

const HERO_TITLE_ROW_TOP = 21;
const heroHeadingRowTop =
  HERO_TITLE_ROW_TOP + SECTION_TITLE_LINE_HEIGHT / 2 - SECTION_WHEEL_SIZE / 2;

export default function Hero() {
  return (
    <div style={{ width: 1823, height: 820.94, left: 48.75, top: 93.37, position: 'absolute' }}>
      <img
        style={{ width: 580, height: 780, left: 1150, top: -150, position: 'absolute', objectFit: 'contain', borderRadius: 16 }}
        src={withBase('images/path_finder/Path_Finder_Nobackground.png')}
        alt="Path Finder robot"
      />
      <div style={{ width: 998, height: 262, left: HERO_MAIN_COLUMN_LEFT, top: 426, position: 'absolute' }}>
        <div style={{ position: 'absolute', left: 0, top: -330, width: 820 }}>
          <div style={{ color: '#212121', fontSize: 150, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: '140px', letterSpacing: 1 }}>Path</div>
          <div style={{ color: '#212121', fontSize: 150, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: '142px', letterSpacing: 1, marginTop: 4 }}>Finder</div>
        </div>
        <div style={{ width: 958, height: 184, left: 0.25, top: 38.63, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', letterSpacing: '0.6px' }}>
          An autonomous line-following robot that splits its brain in two — a Raspberry Pi Zero for computer vision and a Raspberry Pi Pico for real-time motor control, communicating over UART serial to navigate any path.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: HERO_MAIN_COLUMN_LEFT,
          top: heroHeadingRowTop,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SECTION_ICON_TITLE_GAP,
        }}
      >
        <img
          src={withBase('images/path_finder/Wheel.png')}
          alt=""
          style={{
            width: SECTION_WHEEL_SIZE,
            height: SECTION_WHEEL_SIZE,
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            color: '#212121',
            fontSize: 30,
            fontFamily: 'Arial,sans-serif',
            fontWeight: 700,
            lineHeight: '28.8px',
          }}
        >
          Path Finder - Autonomous Line-Following Robot
        </div>
      </div>
    </div>
  );
}
