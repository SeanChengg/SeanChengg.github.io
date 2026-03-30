import GlassWidget from './GlassWidget';
import SectionHeading from './SectionHeading';
import { SYSTEM_ARCHITECTURE_TOP, SYSTEM_ARCHITECTURE_HEIGHT } from '../pageLayout';

export default function SystemArchitecture() {
  return (
    <div id="system-architecture" style={{ width: 1919, height: SYSTEM_ARCHITECTURE_HEIGHT, left: 0.75, top: SYSTEM_ARCHITECTURE_TOP, position: 'absolute' }}>
      <SectionHeading>System Architecture</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: 187, position: 'absolute',
        minHeight: 270,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        Path Finder splits its brain in two. A Raspberry Pi Zero handles computer vision — capturing images through an ArduCAM module, detecting the line, and computing its position on a 0-to-20 scale. A Raspberry Pi Pico handles real-time motor control — receiving the line position over UART serial at 115,200 baud, running a PID algorithm, and driving two DC motors via PWM. This separation lets each processor focus on what it does best: the Zero handles computationally heavy image processing in Python, while the Pico delivers deterministic, bare-metal C execution with no OS overhead.
      </div>

      {/* Diagram bottom offset (510+640) must match SYSTEM_ARCHITECTURE_DIAGRAM_BOTTOM in pageLayout.js */}
      <div className="ns" style={{ width: 1289, height: 640, left: 460, top: 510, position: 'absolute' }}>
        <GlassWidget style={{ left: 32, top: 140, width: 268, height: 260 }}>
          <div style={{ padding: '20px 16px' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 16, marginBottom: 8 }}>Raspberry Pi Zero W</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666', fontSize: 13, lineHeight: 1.55 }}>
              <span style={{ fontWeight: 500 }}>Vision Processor</span><br /><br />
              ARM CPU · Camera Interface<br />
              Python Runtime<br />
              ArduCAM OV2640 (32×32)<br />
              Line Detection + Centroid<br />
              UART TX → Position (0-20)
            </div>
          </div>
        </GlassWidget>

        <div style={{ position: 'absolute', left: 312, top: 248, width: 120, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          <div style={{ width: '100%', height: 2, background: 'linear-gradient(90deg, #5985AD, #B8A977)', position: 'absolute' }} />
          <div style={{ background: '#383838', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', position: 'relative', zIndex: 1 }}>
            <span style={{ color: '#B8A977', fontSize: 11, fontFamily: 'Arial', fontWeight: 700, whiteSpace: 'nowrap' }}>UART 115200</span>
          </div>
        </div>

        <GlassWidget style={{ left: 448, top: 140, width: 268, height: 260 }}>
          <div style={{ padding: '20px 16px' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 16, marginBottom: 8 }}>RP2040 Pico</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666', fontSize: 13, lineHeight: 1.55 }}>
              <span style={{ fontWeight: 500 }}>Real-time Controller</span><br /><br />
              Dual ARM Cortex-M0+ · 125 MHz<br />
              Bare-metal C · No OS<br />
              PID Algorithm<br />
              PWM Motor Control<br />
              ADC Encoder Feedback
            </div>
          </div>
        </GlassWidget>

        <div style={{ position: 'absolute', left: 730, top: 200, width: 56, height: 2, background: 'rgba(255,255,255,0.3)', zIndex: 1 }} />
        <div style={{ position: 'absolute', left: 730, top: 330, width: 56, height: 2, background: 'rgba(255,255,255,0.3)', zIndex: 1 }} />

        <GlassWidget small style={{ left: 800, top: 165, width: 150, height: 88 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 4 }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 12 }}>Left Motor</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", color: '#666', fontSize: 10 }}>DC · 3-6V</div>
          </div>
        </GlassWidget>
        <GlassWidget small style={{ left: 800, top: 295, width: 150, height: 88 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 4 }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 12 }}>Right Motor</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", color: '#666', fontSize: 10 }}>DC · 3-6V</div>
          </div>
        </GlassWidget>

        <div style={{ position: 'absolute', left: 960, top: 218, width: 40, height: 2, background: 'rgba(255,255,255,0.2)', zIndex: 1 }} />
        <div style={{ position: 'absolute', left: 960, top: 348, width: 40, height: 2, background: 'rgba(255,255,255,0.2)', zIndex: 1 }} />

        <GlassWidget small style={{ left: 1010, top: 188, width: 148, height: 62 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 11 }}>Left Encoder</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", color: '#666', fontSize: 9 }}>GPIO 26</div>
          </div>
        </GlassWidget>
        <GlassWidget small style={{ left: 1010, top: 318, width: 148, height: 62 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 11 }}>Right Encoder</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", color: '#666', fontSize: 9 }}>GPIO 27</div>
          </div>
        </GlassWidget>

        <div style={{ position: 'absolute', left: 32, bottom: 28, right: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8, zIndex: 5 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'Arial', fontWeight: 700 }}>Signal Flow:</span>
          {['Camera', 'Pi Zero', 'UART', 'Pi Pico', 'PWM', 'Motors'].map((label, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#B8A977', fontSize: 12, fontFamily: 'Arial', fontWeight: 600 }}>{label}</span>
              {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
