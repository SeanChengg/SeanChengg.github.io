import PixelBlocksBg from './PixelBlocksBg';
import { SECTION_BODY_LEFT } from '../pageLayout';

const rows = [
  { component: 'Raspberry Pi Pico', role: 'Real-time Controller', spec: 'RP2040, Dual ARM Cortex-M0+, 125 MHz' },
  { component: 'Raspberry Pi Zero W', role: 'Vision Processor', spec: 'ARM, Camera interface, Python' },
  { component: 'ArduCAM (OV2640)', role: 'Line Detection', spec: '2MP, 32×32 capture resolution' },
  { component: 'DC Motors (×2)', role: 'Locomotion', spec: '3-6V, ~200 RPM, with gearbox' },
  { component: 'IR Encoders (×2)', role: 'Wheel Feedback', spec: 'ADC 12-bit, GPIO 26/27' },
  { component: 'SSD1306 OLED', role: 'Debug Display', spec: '128×32, I²C 0x3C' },
  { component: 'H-Bridge Driver', role: 'Motor Control', spec: 'PWM input, direction control' },
];

export default function CostTable({ top = 545 }) {
  return (
    <div style={{
      width: 1290, left: SECTION_BODY_LEFT, top, position: 'absolute',
      overflow: 'hidden', borderRadius: 16,
      border: '1px solid rgba(255, 255, 255, 0.36)',
      background: 'transparent',
    }}>
      <PixelBlocksBg style={{ opacity: 0.88 }} />
      <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{
          display: 'flex', padding: '16px 28px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ width: 290, color: 'rgba(40,40,40,0.55)', fontSize: 13, fontFamily: 'Inter,sans-serif', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>Component</div>
          <div style={{ width: 340, color: 'rgba(40,40,40,0.55)', fontSize: 13, fontFamily: 'Inter,sans-serif', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>Role</div>
          <div style={{ width: 500, color: 'rgba(40,40,40,0.55)', fontSize: 13, fontFamily: 'Inter,sans-serif', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>Specification</div>
        </div>

        {/* Rows */}
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', padding: '14px 28px',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
          }}>
            <div style={{ width: 290, color: '#141414', fontSize: 14, fontFamily: 'Inter,sans-serif', fontWeight: 600 }}>{r.component}</div>
            <div style={{ width: 340, color: 'rgba(40,40,40,0.7)', fontSize: 14, fontFamily: "'Zilla Slab',serif", fontWeight: 400 }}>{r.role}</div>
            <div style={{ width: 500, color: 'rgba(40,40,40,0.7)', fontSize: 14, fontFamily: "'Zilla Slab',serif", fontWeight: 400 }}>{r.spec}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
