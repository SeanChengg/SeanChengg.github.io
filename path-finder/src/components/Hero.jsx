import { withBase } from '../publicUrl';
import SectionWheelIcon from './SectionWheelIcon';

export default function Hero() {
  return (
    <div style={{ width: 1823, height: 820.94, left: 48.75, top: 93.37, position: 'absolute' }}>
      <img
        style={{ width: 580, height: 780, left: 1150, top: -150, position: 'absolute', objectFit: 'contain', borderRadius: 16 }}
        src={withBase('images/path_finder/Path_Finder_Nobackground.png')}
        alt="Path Finder robot"
      />
      <div style={{ width: 998, height: 262, left: 413, top: 426, position: 'absolute' }}>
        <div style={{ position: 'absolute', left: 0, top: -330, width: 820 }}>
          <div style={{ color: '#212121', fontSize: 150, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: '140px', letterSpacing: 1 }}>Path</div>
          <div style={{ color: '#212121', fontSize: 150, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: '142px', letterSpacing: 1, marginTop: 4 }}>Finder</div>
        </div>
        <div style={{ width: 958, height: 184, left: 0.25, top: 38.63, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', letterSpacing: '0.6px' }}>
          An autonomous line-following robot that splits its brain in two — a Raspberry Pi Zero for computer vision and a Raspberry Pi Pico for real-time motor control, communicating over UART serial to navigate any path.
        </div>
      </div>
      <SectionWheelIcon left={413} top={0} />
      <div style={{ width: 890.78, height: 28.8, left: 443, top: 21, position: 'absolute', overflow: 'hidden' }}>
        <div style={{ width: 870.92, height: 33.02, left: 38, top: -3, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '30px' }}>
          Path Finder - Autonomous Line-Following Robot
        </div>
      </div>
    </div>
  );
}
