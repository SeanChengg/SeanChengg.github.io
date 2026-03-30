import SectionWheelIcon from './SectionWheelIcon';
import { INTEGRATION_TOP, INTEGRATION_HEIGHT } from '../pageLayout';

export default function Integration() {
  const timelineSteps = [
    { time: '0 ms', label: 'LED ON', desc: 'Visual heartbeat begins', color: '#4CAF50' },
    { time: '0–100 ms', label: 'Blink Delay', desc: 'LED stays on for half the cycle', color: '#78909C' },
    { time: '100 ms', label: 'Core Loop', desc: 'Read encoders → Check button → Read line position → Calculate PID → Set PWM', color: '#FF9800' },
    { time: '100–200 ms', label: 'LED OFF', desc: 'Blink delay, LED off', color: '#78909C' },
    { time: '200 ms', label: 'Repeat', desc: 'Full cycle complete; loop restarts', color: '#2196F3' },
  ];

  return (
    <div id="integration" style={{ width: 1919, height: INTEGRATION_HEIGHT, left: 0.75, top: INTEGRATION_TOP, position: 'absolute' }}>
      <SectionWheelIcon />
      <div style={{ left: 523, top: 124, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '28.8px' }}>
        How It Comes Together
      </div>
      <div style={{
        width: 1284, left: 460, top: 187, position: 'absolute',
        minHeight: 315,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        Every 200 milliseconds, the system completes a full control cycle. The Pi Zero captures a frame, processes it, and transmits the line position. The Pico's main loop reads encoder counts, checks the direction button, receives the latest line position via UART interrupt, calculates PID-corrected duty cycles, and sets the PWM levels for both motors. An LED blink at each loop iteration provides a visual heartbeat — if it stops blinking, the system has stalled. The entire PID calculation runs in microseconds; the 200ms cycle time is dominated by the LED blink delays that pace the loop.
      </div>

      <div style={{ left: 460, top: 562, position: 'absolute', width: 1284 }}>
        <div style={{ position: 'absolute', left: 24, top: 0, width: 4, height: timelineSteps.length * 120 - 40, background: 'rgba(0,0,0,0.08)', borderRadius: 2 }} />
        {timelineSteps.map((step, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 30, marginBottom: 36, paddingLeft: 0 }}>
            <div style={{ width: 52, height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: step.color, boxShadow: `0 0 10px ${step.color}44` }} />
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 13, color: step.color, marginBottom: 3 }}>{step.time}</div>
              <div style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 17, color: '#212121', marginBottom: 3 }}>{step.label}</div>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontSize: 15, color: '#666', lineHeight: 1.45, maxWidth: 700 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
