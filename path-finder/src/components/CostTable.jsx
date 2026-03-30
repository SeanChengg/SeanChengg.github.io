const rows = [
  { component: 'Raspberry Pi Pico', role: 'Real-time Controller', spec: 'RP2040, Dual ARM Cortex-M0+, 125 MHz' },
  { component: 'Raspberry Pi Zero W', role: 'Vision Processor', spec: 'ARM, Camera interface, Python' },
  { component: 'ArduCAM (OV2640)', role: 'Line Detection', spec: '2MP, 32×32 capture resolution' },
  { component: 'DC Motors (×2)', role: 'Locomotion', spec: '3-6V, ~200 RPM, with gearbox' },
  { component: 'IR Encoders (×2)', role: 'Wheel Feedback', spec: 'ADC 12-bit, GPIO 26/27' },
  { component: 'SSD1306 OLED', role: 'Debug Display', spec: '128×32, I²C 0x3C' },
  { component: 'H-Bridge Driver', role: 'Motor Control', spec: 'PWM input, direction control' },
];

const headerStyle = { alignSelf: 'stretch', padding: '16px 24px', background: '#F0F0F0', overflow: 'hidden', outline: '1px #E0E0E0 solid', outlineOffset: -1, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' };
const rowStyle = { alignSelf: 'stretch', padding: '14px 24px', background: '#FBFBFB', outline: '1px #E6E6E6 solid', outlineOffset: -1, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' };

export default function CostTable({ top = 545 }) {
  return (
    <div style={{ width: 1290, left: 460, top, position: 'absolute', background: '#F7F7F7', overflow: 'hidden', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
      <div style={headerStyle}>
        <div style={{ width: 290, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>COMPONENT</div>
        <div style={{ width: 340, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>ROLE</div>
        <div style={{ width: 500, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>SPECIFICATION</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={rowStyle}>
          <div style={{ width: 290, color: '#121212', fontSize: 14, fontFamily: 'Arial', fontWeight: 700 }}>{r.component}</div>
          <div style={{ width: 340, color: '#404040', fontSize: 14, fontFamily: 'Arial', fontWeight: 400 }}>{r.role}</div>
          <div style={{ width: 500, color: '#404040', fontSize: 14, fontFamily: 'Arial', fontWeight: 400 }}>{r.spec}</div>
        </div>
      ))}
    </div>
  );
}
