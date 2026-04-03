import { useState, useEffect, useRef } from 'react';
import GlassWidget from './GlassWidget';
import SectionHeading from './SectionHeading';
import { MOTOR_PID_TOP, MOTOR_PID_HEIGHT, SECTION_BODY_TOP } from '../pageLayout';

const codeSnippet = `// PID Controller — pid_control.c
float apply_pid_control(float error, float integral, float derivative) {
    return Kp * error + Ki * integral + Kd * derivative;
}
// Kp = 0.1, Ki = 0.0, Kd = 0.1

// Motor Output — motor_control.c
duty_cycles.left  = target_speed * (1 - output);
duty_cycles.right = target_speed * (1 + output);
// target_speed = 31250 (50% of 62500 wrap)`;

const scenarios = [
  {
    title: 'Line CENTER',
    sub: 'pos = 10',
    error: 'Error = 0',
    leftPct: 50, rightPct: 50,
    result: 'Go straight',
    lineOffset: 0,
    steerDir: 0,
  },
  {
    title: 'Line RIGHT',
    sub: 'pos = 15',
    error: 'Error = +5',
    leftPct: 85, rightPct: 30,
    result: 'Steer right',
    lineOffset: 0,
    steerDir: 15,
  },
  {
    title: 'Line LEFT',
    sub: 'pos = 5',
    error: 'Error = −5',
    leftPct: 30, rightPct: 85,
    result: 'Steer left',
    lineOffset: 0,
    steerDir: -15,
  },
];

function ScenarioVehicle({ lineOffset, steerDir, leftPct, rightPct }) {
  const [t, setT] = useState(0);
  const raf = useRef();

  useEffect(() => {
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      setT((ts - start) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const W = 160, H = 140, roadX = 10, roadW = 140, roadH = 130;
  const cx = roadX + roadW / 2;
  const scrollY = (t * 45) % roadH;

  const lineAngle = steerDir;
  const vY = 5 + roadH * 0.55;
  const bodyW = 28, bodyH = 44, wheelR = 14, wheelW = 7;
  const spinL = (t * leftPct * 8) % (wheelR * 2);
  const spinR = (t * rightPct * 8) % (wheelR * 2);
  const uid = `sc-${lineOffset || 0}`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', borderRadius: 8, background: 'rgba(0,0,0,0.02)' }}>
      <defs>
        <clipPath id={`${uid}-clip`}><rect x={roadX} y={5} width={roadW} height={roadH} rx={8} /></clipPath>
        <linearGradient id={`${uid}-road`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9b8de" /><stop offset="100%" stopColor="#b8a4d0" />
        </linearGradient>
      </defs>

      <rect x={roadX} y={5} width={roadW} height={roadH} rx={8} fill={`url(#${uid}-road)`} />

      <g clipPath={`url(#${uid}-clip)`}>
        {[0,1,2,3,4].map(i => {
          const dy = 5 + ((i * 36 + scrollY) % (roadH + 36)) - 36;
          return <rect key={`l${i}`} x={roadX + 6} y={dy} width={2} height={16} rx={1} fill="rgba(255,255,255,0.16)" />;
        })}
        {[0,1,2,3,4].map(i => {
          const dy = 5 + ((i * 36 + scrollY) % (roadH + 36)) - 36;
          return <rect key={`r${i}`} x={roadX + roadW - 8} y={dy} width={2} height={16} rx={1} fill="rgba(255,255,255,0.16)" />;
        })}

        <g transform={`translate(${cx}, ${5 + roadH / 2}) rotate(${lineAngle})`}>
          <line x1={0} y1={-roadH} x2={0} y2={roadH} stroke="rgba(255,255,255,0.8)" strokeWidth={6} strokeLinecap="round" />
          <line x1={0} y1={-roadH} x2={0} y2={roadH} stroke="#fff" strokeWidth={3} strokeLinecap="round" />
        </g>

        <g transform={`translate(${cx}, ${vY}) rotate(${steerDir})`}>
          <rect x={-bodyW/2} y={-bodyH/2} width={bodyW} height={bodyH} rx={6}
            fill="rgba(50,50,55,0.18)" stroke="rgba(80,80,80,0.45)" strokeWidth={1} />

          {/* Left wheel */}
          <g transform={`translate(${-bodyW/2 - wheelW/2 - 1}, 0)`}>
            <rect x={-wheelW/2} y={-wheelR} width={wheelW} height={wheelR*2} rx={2.5}
              fill="#d4a017" stroke="#b8900f" strokeWidth={1} />
            {[0,1,2,3].map(j => {
              const ty = -wheelR + ((j * 7 + spinL) % (wheelR * 2));
              return <line key={j} x1={-wheelW/2+1} y1={ty} x2={wheelW/2-1} y2={ty+3}
                stroke="rgba(0,0,0,0.25)" strokeWidth={0.8} />;
            })}
          </g>

          {/* Right wheel */}
          <g transform={`translate(${bodyW/2 + wheelW/2 + 1}, 0)`}>
            <rect x={-wheelW/2} y={-wheelR} width={wheelW} height={wheelR*2} rx={2.5}
              fill="#d4a017" stroke="#b8900f" strokeWidth={1} />
            {[0,1,2,3].map(j => {
              const ty = -wheelR + ((j * 7 + spinR) % (wheelR * 2));
              return <line key={j} x1={-wheelW/2+1} y1={ty} x2={wheelW/2-1} y2={ty+3}
                stroke="rgba(0,0,0,0.25)" strokeWidth={0.8} />;
            })}
          </g>
        </g>
      </g>
    </svg>
  );
}

/** Visible on grey bg, not as harsh as charcoal */
const FLOW_STROKE = '#8f8a82';
const FLOW_STROKE_W = 3.5;
const FEEDBACK_STROKE = '#8f8a82';

function FlowArrow({ left, top, width }) {
  return (
    <svg
      style={{ position: 'absolute', left, top, pointerEvents: 'none', zIndex: 3 }}
      width={width} height={22} viewBox={`0 0 ${width} 22`}
    >
      <line x1={0} y1={11} x2={width - 10} y2={11} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" />
      <polygon points={`${width - 10},4 ${width},11 ${width - 10},18`} fill={FLOW_STROKE} />
    </svg>
  );
}

function FlowSplit({ left, top, height, armWidth }) {
  return (
    <svg
      style={{ position: 'absolute', left, top, pointerEvents: 'none', zIndex: 3 }}
      width={armWidth + 14} height={height} viewBox={`0 0 ${armWidth + 14} ${height}`}
    >
      <line x1={0} y1={height / 2} x2={14} y2={height / 2} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" />
      <line x1={14} y1={18} x2={14} y2={height - 18} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" />
      <line x1={14} y1={18} x2={armWidth + 2} y2={18} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" />
      <polygon points={`${armWidth + 2},10 ${armWidth + 14},18 ${armWidth + 2},26`} fill={FLOW_STROKE} />
      <line x1={14} y1={height - 18} x2={armWidth + 2} y2={height - 18} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" />
      <polygon points={`${armWidth + 2},${height - 26} ${armWidth + 14},${height - 18} ${armWidth + 2},${height - 10}`} fill={FLOW_STROKE} />
    </svg>
  );
}

export default function MotorControlPID() {
  const diagramTop = 550;
  const diagramH = 340;
  const boxH = 72;
  const midY = diagramTop + diagramH / 2;
  const boxY = midY - boxH / 2;

  const col = {
    target: 0,
    sigma: 220,
    pid: 330,
    motor: 620,
    splitStart: 860,
    lMotor: 950,
    rMotor: 950,
  };
  const boxW = { target: 180, pid: 220, motor: 220, output: 180 };

  return (
    <div id="motor-control" style={{
      width: 1919, height: MOTOR_PID_HEIGHT, left: 0.75,
      top: MOTOR_PID_TOP, position: 'absolute',
      zIndex: 2,
      overflow: 'visible',
    }}>

      <SectionHeading>Motor Control & PID</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: SECTION_BODY_TOP, position: 'absolute', zIndex: 2,
        minHeight: 0,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        Once the Pico receives line_position over UART, a PID loop compares it to the centre
        target of 10. The difference is the error — for example, position 15 means error = +5.
        Three terms act on that error: <strong>Kp</strong> (proportional) reacts to how far off the
        line is right now — bigger drift, harder correction. <strong>Kd</strong> (derivative)
        reacts to how fast the error is changing, dampening overshoot so the robot does not
        zig-zag. <strong>Ki</strong> (integral) is disabled (set to 0) to keep the response
        crisp at speed. The combined PID output adjusts left and right motor duty cycles in
        opposite directions — drift right and the left wheel speeds up, drift left and the
        right wheel speeds up — steering the robot back onto the line every cycle.
      </div>

      {/* ── Flow diagram — centered in 1284px column (matches three cards below) ── */}
      <div
        className="pf-motor-flow-diagram"
        style={{
          position: 'absolute', left: 460, top: diagramTop,
          width: 1284, height: diagramH, zIndex: 3,
          overflow: 'visible',
        }}
      >
        {/* 1190px: rightmost feedback segment reaches ~1170 — 1130 clipped the dashed line */}
        <div style={{ position: 'relative', width: 1190, height: '100%', margin: '0 auto', overflow: 'visible' }}>
        {/* Sigma circle */}
        <div style={{
          position: 'absolute',
          left: col.sigma, top: midY - diagramTop - 28,
          width: 56, height: 56,
          borderRadius: '50%',
          background: 'rgba(235,216,122,0.28)',
          border: `3px solid ${FLOW_STROKE}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 5,
          boxShadow: '0 0 18px rgba(255,255,255,0.65), 0 4px 14px rgba(0,0,0,0.08)',
        }}>
          <span style={{ color: '#8a7d55', fontSize: 26, fontWeight: 700 }}>Σ</span>
        </div>

        {/* Target box */}
        <GlassWidget small pixelColor="turquoise" style={{
          left: col.target, top: boxY - diagramTop,
          width: boxW.target, height: boxH,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 18 }}>
              Target (10)
            </div>
          </div>
        </GlassWidget>

        {/* Arrow: Target → Sigma */}
        <FlowArrow left={col.target + boxW.target + 4} top={midY - diagramTop - 11} width={col.sigma - col.target - boxW.target - 4} />

        {/* Arrow: Sigma → PID */}
        <FlowArrow left={col.sigma + 60} top={midY - diagramTop - 11} width={col.pid - col.sigma - 60 + 4} />

        {/* PID box */}
        <GlassWidget small pixelColor="gold" style={{
          left: col.pid, top: boxY - diagramTop - 6,
          width: boxW.pid, height: boxH + 12,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 20 }}>PID</div>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 500, color: '#555', fontSize: 14, marginTop: 2 }}>Kp · e + Kd · de/dt</div>
          </div>
        </GlassWidget>

        {/* Arrow: PID → Motor Calc */}
        <FlowArrow left={col.pid + boxW.pid + 4} top={midY - diagramTop - 11} width={col.motor - col.pid - boxW.pid - 4} />

        {/* Motor Calc box */}
        <GlassWidget small pixelColor="gold" style={{
          left: col.motor, top: boxY - diagramTop,
          width: boxW.motor, height: boxH,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 18 }}>Motor Calc</div>
          </div>
        </GlassWidget>

        {/* Split: Motor Calc → L Motor / R Motor */}
        <FlowSplit left={col.motor + boxW.motor} top={boxY - diagramTop - 28} height={boxH + 56} armWidth={col.lMotor - col.motor - boxW.motor - 12} />

        {/* L Motor */}
        <GlassWidget small pixelColor="turquoise" style={{
          left: col.lMotor, top: boxY - diagramTop - 40,
          width: boxW.output, height: 56,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 17 }}>L Motor</div>
          </div>
        </GlassWidget>

        {/* R Motor */}
        <GlassWidget small pixelColor="turquoise" style={{
          left: col.rMotor, top: boxY - diagramTop + boxH - 16,
          width: boxW.output, height: 56,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 17 }}>R Motor</div>
          </div>
        </GlassWidget>

        {/* Feedback loop */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, overflow: 'visible' }}
          overflow="visible"
        >
          <polyline
            points={`${col.lMotor + boxW.output + 14},${boxY - diagramTop - 12} ${col.lMotor + boxW.output + 40},${boxY - diagramTop - 12} ${col.lMotor + boxW.output + 40},${boxY - diagramTop + boxH + 70} ${col.sigma + 28},${boxY - diagramTop + boxH + 70} ${col.sigma + 28},${midY - diagramTop + 28}`}
            fill="none" stroke={FEEDBACK_STROKE} strokeWidth={3} strokeDasharray="12 8" strokeLinecap="round" strokeLinejoin="round" opacity={0.88}
          />
        </svg>
        <div style={{
          position: 'absolute',
          left: col.motor + 40,
          top: boxY - diagramTop + boxH + 54,
          color: '#6a6660',
          fontSize: 14, fontFamily: 'Arial', fontWeight: 700,
        }}>Encoder feedback</div>
        </div>
      </div>

      {/* ── Scenario cards — liquid glass with vehicle animation ── */}
      <div style={{ left: 460, top: 910, position: 'absolute', display: 'flex', gap: 28, width: 1284, zIndex: 2 }}>
        {scenarios.map((s, i) => (
          <GlassWidget key={i} small pixelColor={i === 1 ? 'gold' : 'turquoise'} style={{
            position: 'relative',
            flex: 1, minHeight: 200,
          }}>
            <div style={{ padding: '18px 22px', height: '100%', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 160, flexShrink: 0 }}>
                <ScenarioVehicle lineOffset={s.lineOffset} steerDir={s.steerDir} leftPct={s.leftPct} rightPct={s.rightPct} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, fontSize: 18, color: '#1a1a1a', marginBottom: 6 }}>
                  {s.title} <span style={{ fontWeight: 500, fontSize: 14, color: '#666' }}>({s.sub})</span>
                </div>
                <div style={{ fontFamily: "'Zilla Slab',serif", fontSize: 15, color: '#333', lineHeight: 1.8 }}>
                  {s.error}<br />
                  L: {s.leftPct}% · R: {s.rightPct}%
                </div>
                <div
                  className="pf-pid-result-glow"
                  style={{
                    marginTop: 8, fontFamily: 'Inter,Arial,sans-serif',
                    fontWeight: 700, fontSize: 15,
                    color: '#1a1a1a',
                  }}
                >
                  {s.result}
                </div>
              </div>
            </div>
          </GlassWidget>
        ))}
      </div>

      {/* ── Code + PID params ── */}
      <div className="pf-code-block" style={{ left: 460, top: 1160, width: 620, position: 'absolute', fontSize: 13, padding: '22px 26px', zIndex: 2 }}>
        {codeSnippet}
      </div>

      <GlassWidget small pixelColor="gold" style={{ left: 1120, top: 1160, width: 620, height: 'auto', zIndex: 2 }}>
        <div style={{ padding: '24px 28px' }}>
          <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, fontSize: 18, color: '#1a1a1a', marginBottom: 12 }}>PID Parameters</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontSize: 16, color: '#333', lineHeight: 1.85 }}>
            <strong>Kp = 0.1</strong> — Responsive steering without oscillation<br />
            <strong>Ki = 0.0</strong> — Disabled to prevent instability<br />
            <strong>Kd = 0.1</strong> — Smooths response, prevents zig-zag
          </div>
        </div>
      </GlassWidget>
    </div>
  );
}
