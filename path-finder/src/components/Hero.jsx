import { withBase } from '../publicUrl';

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
      <div style={{ width: 50, height: 64, left: 413, top: 0, position: 'absolute', overflow: 'hidden' }}>
        <svg viewBox="0 0 50 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <circle cx="25" cy="20" r="8" stroke="#212121" strokeWidth="2" fill="none" />
          <path d="M25 30 L25 50" stroke="#212121" strokeWidth="2" />
          <circle cx="15" cy="55" r="4" stroke="#212121" strokeWidth="1.5" fill="none" />
          <circle cx="35" cy="55" r="4" stroke="#212121" strokeWidth="1.5" fill="none" />
          <path d="M10 12 Q25 2 40 12" stroke="#212121" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div style={{ width: 890.78, height: 28.8, left: 443, top: 21, position: 'absolute', overflow: 'hidden' }}>
        <div style={{ width: 870.92, height: 33.02, left: 38, top: -3, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '30px' }}>
          Path Finder - Autonomous Line-Following Robot
        </div>
      </div>
    </div>
  );
}
