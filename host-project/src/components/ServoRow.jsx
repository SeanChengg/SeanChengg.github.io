import GlassWidget from './GlassWidget';

const blurStyle = { top: '-6%', left: '-3%', width: '106%', height: '112%', filter: 'blur(20px) brightness(2.2)' };
const whiteBlur = { top: '-2%', left: '-1%', width: '102%', height: '104%', filter: 'blur(20px) brightness(2.2)' };

export default function ServoRow({ top, name, channel }) {
  return (
    <>
      <div className="rect-bg" style={{ left: 1295, top, width: 255, height: 28, opacity: 1 }}>
        <img src="/images/schematic/servo_blue_rectangle.png" style={{ position: 'absolute', ...blurStyle }} alt="" />
      </div>
      <div className="rect-bg" style={{ left: 1300, top: top + 2, width: 245, height: 24, opacity: 1 }}>
        <img src="/images/schematic/servo_white_rectangle.png" style={{ position: 'absolute', ...whiteBlur }} alt="" />
      </div>
      <GlassWidget small style={{ left: 1282, top: top - 16, width: 280, height: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '8px 12px' }}>
          <div style={{ fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13, whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 500, color: '#808080', fontSize: 11, textAlign: 'center' }}>{channel}</div>
          <img src="/images/schematic/RDS3225.png" style={{ position: 'absolute', top: 11, left: 219, width: 55, height: 38, objectFit: 'cover' }} alt="" />
        </div>
      </GlassWidget>
    </>
  );
}
