import { useState, useEffect, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { withBase } from '../publicUrl';
import { INTEGRATION_TOP, INTEGRATION_HEIGHT, SECTION_BODY_TOP } from '../pageLayout';

const STEPS = [
  { time: '0 ms', label: 'LED ON', desc: 'Visual heartbeat begins' },
  { time: '0–100 ms', label: 'Blink Delay', desc: 'LED stays on for half the cycle' },
  { time: '100 ms', label: 'Core Loop', desc: 'Read encoders → Check button\n→ Read line position → Calculate PID\n→ Set PWM' },
  { time: '100–200 ms', label: 'LED OFF', desc: 'Blink delay, LED off' },
  { time: '200 ms', label: 'Repeat', desc: 'Full cycle complete; loop restarts' },
];

const APPEAR_INTERVAL = 1200;
const BLINK_DUR = 600;
const INTENSE_PERIOD = 400;
const INTENSE_COUNT = 3;
const INTENSE_DUR = INTENSE_COUNT * INTENSE_PERIOD;
const SEQ_DUR = STEPS.length * APPEAR_INTERVAL;

const SOFT_RED = 'rgba(220,80,70,0.55)';
const SOFT_GLOW = 'rgba(220,80,70,0.25)';
const HARD_RED = '#ff3b30';
const HARD_GLOW = 'rgba(255,59,48,0.5)';

const VIDEO_W = 960;
const VIDEO_H = 590;
const STEP_GAP = (VIDEO_H - 14) / (STEPS.length - 1);

export default function Integration() {
  const [animT, setAnimT] = useState(0);
  const raf = useRef();
  useEffect(() => {
    let s = null;
    const tick = (ts) => { if (!s) s = ts; setAnimT(ts - s); raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const seqEnd = SEQ_DUR;
  const intenseEnd = seqEnd + INTENSE_DUR;
  let phase;
  if (animT < seqEnd) phase = 'seq';
  else if (animT < intenseEnd) phase = 'intense';
  else phase = 'breathe';

  const revealedCount = phase === 'seq'
    ? Math.min(STEPS.length, Math.floor(animT / APPEAR_INTERVAL) + 1)
    : STEPS.length;
  const justAppeared = phase === 'seq'
    ? Math.min(STEPS.length - 1, Math.floor(animT / APPEAR_INTERVAL))
    : -1;
  const timeSinceAppear = phase === 'seq' ? animT - justAppeared * APPEAR_INTERVAL : 0;
  const singleBlink = phase === 'seq' && timeSinceAppear < BLINK_DUR;

  const intenseBlink = phase === 'intense'
    && Math.floor(((animT - seqEnd) % INTENSE_PERIOD) / (INTENSE_PERIOD / 2)) === 0;

  const breatheT = phase === 'breathe' ? (animT - intenseEnd) : 0;
  const breatheAlpha = 0.4 + 0.25 * Math.sin(breatheT * Math.PI * 2 / 2000);

  const contentRight = 460 + 1284;
  const videoLeft = contentRight - VIDEO_W;

  return (
    <div id="integration" style={{ width: 1919, height: INTEGRATION_HEIGHT, left: 0.75, top: INTEGRATION_TOP, position: 'absolute' }}>
      <SectionHeading>Integration</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: SECTION_BODY_TOP, position: 'absolute', zIndex: 2,
        minHeight: 315,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        Every 200 milliseconds, Path Finder completes one full sense → think → act cycle. The Pi Zero captures a 32×32 frame, converts it to grayscale, thresholds the white line, runs a sliding-window search, and transmits the resulting line_position (0–20) over UART to the Pico. The Pico reads encoder counts from both wheels, receives the latest line_position via UART interrupt, compares it to the centre target of 10 inside the Σ node, and feeds the error through the PID controller to produce a correction value <em>u</em>. That value sets the duty cycle for each motor — left gets (1 − <em>u</em>), right gets (1 + <em>u</em>) — so one wheel speeds up while the other slows down, steering Path Finder back toward the line. The encoders continuously measure actual wheel rotation and feed it back to Σ, closing the inner control loop. Meanwhile the camera keeps capturing new frames, so the outer vision loop refreshes the target every cycle. An LED blink each iteration acts as a visual heartbeat — if it stops blinking, the system has stalled. The PID math itself runs in microseconds; the 200 ms cycle time is paced by the LED blink delays.
      </div>

      {/* Sequential timeline — stretched to match video height */}
      <div style={{ left: 460, top: 800, position: 'absolute', height: VIDEO_H }}>
        {/* Vertical progress line */}
        <div style={{
          position: 'absolute',
          left: 6, top: 7,
          width: 2,
          height: (revealedCount - 1) * STEP_GAP,
          background: 'rgba(0,0,0,0.10)',
          borderRadius: 2,
          transition: 'height 0.4s ease',
        }} />

        {STEPS.map((step, i) => {
          const visible = i < revealedCount;
          
          const y = i * STEP_GAP;
          return (
            <div key={i} style={{
              position: 'absolute', left: 0, top: y,
              display: 'flex', alignItems: 'flex-start', gap: 18,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              width: 420,
            }}>
              <div style={{
                width: 14, height: 14, flexShrink: 0,
                borderRadius: '50%',
                background:
                  (i === justAppeared && singleBlink) ? HARD_RED
                  : intenseBlink ? HARD_RED
                  : phase === 'breathe' ? `rgba(220,80,70,${breatheAlpha})`
                  : visible ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.06)',
                boxShadow:
                  (i === justAppeared && singleBlink) ? `0 0 16px 6px ${HARD_GLOW}`
                  : intenseBlink ? `0 0 16px 6px ${HARD_GLOW}`
                  : phase === 'breathe' ? `0 0 ${10 + 6 * breatheAlpha}px ${3 + 3 * breatheAlpha}px rgba(220,80,70,${breatheAlpha * 0.5})`
                  : 'none',
                transition: phase === 'breathe' ? 'none' : 'background 0.15s ease, box-shadow 0.15s ease',
                position: 'relative',
                zIndex: 2,
              }} />
              <div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 13, color: 'rgba(0,0,0,0.4)', marginBottom: 2 }}>{step.time}</div>
                <div style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 17, color: '#212121', marginBottom: 2 }}>{step.label}</div>
                <div style={{ fontFamily: "'Zilla Slab',serif", fontSize: 15, color: '#666', lineHeight: 1.45, whiteSpace: 'pre-line' }}>{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <video
        src={withBase('images/path_finder/Path_Finder01.mov')}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          left: videoLeft,
          top: 800,
          width: VIDEO_W,
          height: VIDEO_H,
          objectFit: 'cover',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.36)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          zIndex: 2,
        }}
      />
    </div>
  );
}
