import { BASE } from '../config';

export default function Hero() {
  return (
    <div style={{ width: 1823, height: 620, left: 48.75, top: 93, position: 'absolute' }}>
      {/* Hero image */}
      <img
        style={{ width: 468, height: 630, left: 1200, top: -160, position: 'absolute', objectFit: 'contain' }}
        src={`${BASE}images/archer/Hero_Image.png`}
        alt="Archer Ring hero"
      />

      {/* Title: Modularized + Ring = display font; Archer = slimmer Inter */}
      <div
        style={{
          left: 413,
          top: 74,
          position: 'absolute',
          maxWidth: 720,
        }}
      >
        <div style={{ color: '#212121', fontSize: 120, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: '130px', letterSpacing: 1 }}>
          Modularized
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: -10 }}>
          <div style={{ color: '#212121', fontSize: 100, fontFamily: 'Inter,sans-serif', fontStyle: 'italic', fontWeight: 200, lineHeight: '125px' }}>Archer</div>
          <div style={{ color: '#212121', fontSize: 120, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: '125px', letterSpacing: 1 }}>Ring</div>
        </div>
      </div>

      {/* Description summary */}
      <div style={{ width: 958, left: 413, top: 374, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', letterSpacing: '0.6px' }}>
        A silver archer's ring in the style of the Qing Dynasty, consisting of three detachable components designed in 3D software, printed in wax models and lost-wax casted in 925 silver grain with a jadeite cabochon.
      </div>
    </div>
  );
}
