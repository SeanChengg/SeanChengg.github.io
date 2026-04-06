import { useState, useEffect, useRef } from 'react';
import GlassWidget from './GlassWidget';
import SectionHeading from './SectionHeading';
import { MOTOR_PID_TOP, MOTOR_PID_HEIGHT, SECTION_BODY_TOP, SECTION_SHELL_WIDTH } from '../pageLayout';

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
      <line x1={0} y1={11} x2={width - 10} y2={11} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" strokeDasharray="8 5" />
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
      <line x1={0} y1={height / 2} x2={14} y2={height / 2} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" strokeDasharray="8 5" />
      <line x1={14} y1={18} x2={14} y2={height - 18} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" strokeDasharray="8 5" />
      <line x1={14} y1={18} x2={armWidth + 2} y2={18} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" strokeDasharray="8 5" />
      <polygon points={`${armWidth + 2},10 ${armWidth + 14},18 ${armWidth + 2},26`} fill={FLOW_STROKE} />
      <line x1={14} y1={height - 18} x2={armWidth + 2} y2={height - 18} stroke={FLOW_STROKE} strokeWidth={FLOW_STROKE_W} strokeLinecap="round" strokeDasharray="8 5" />
      <polygon points={`${armWidth + 2},${height - 26} ${armWidth + 14},${height - 18} ${armWidth + 2},${height - 10}`} fill={FLOW_STROKE} />
    </svg>
  );
}

function hexToRgb(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function interpPath(pts, t) {
  if (t <= 0) return pts[0];
  if (t >= 1) return pts[pts.length - 1];
  let total = 0;
  const lens = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i-1][0], dy = pts[i][1] - pts[i-1][1];
    lens.push(Math.sqrt(dx * dx + dy * dy));
    total += lens[i - 1];
  }
  let d = t * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const s = d / lens[i];
      return [pts[i][0] + (pts[i+1][0] - pts[i][0]) * s, pts[i][1] + (pts[i+1][1] - pts[i][1]) * s];
    }
    d -= lens[i];
  }
  return pts[pts.length - 1];
}

const LOOP_IDX = 2;
const GLOW_SEGS = [
  // --- first pass only (0–1) ---
  { type: 'p', pos: [85, 170], dur: 800, card: 'target', color: '#ffffff' },
  { type: 'm', wp: [[170, 170], [228, 170]], dur: 650, color: '#ffffff' },
  // --- loop starts here (index 2) ---
  { type: 'p', pos: [280, 170], dur: 550, card: 'sigma', color: '#ffffff' },
  { type: 'm', wp: [[332, 170], [390, 170]], dur: 650, color: '#ffffff' },
  { type: 'p', pos: [500, 170], dur: 550, card: 'pid', color: '#ffffff' },
  { type: 'm', wp: [[618, 170], [652, 170]], dur: 550, color: '#ffffff' },
  { type: 'p', pos: [760, 170], dur: 550, card: 'motor', color: '#ffffff' },
  { type: 's', wpA: [[860, 170], [882, 170], [882, 124], [950, 124]], wpB: [[860, 170], [882, 170], [882, 216], [950, 216]], dur: 900, color: '#ffffff' },
  { type: 'p', posA: [1045, 122], posB: [1045, 218], dur: 650, card: 'outputs', color: '#ffffff' },
  { type: 's', wpA: [[1130, 122], [1170, 122], [1170, 276]], wpB: [[1130, 218], [1170, 218], [1170, 276]], dur: 900, color: '#ffffff', colorEnd: '#64dcdc' },
  { type: 'm', wp: [[1170, 276], [280, 276]], dur: 1300, color: '#64dcdc' },
  { type: 'm', wp: [[280, 276], [280, 170]], dur: 650, color: '#64dcdc', colorEnd: '#ffffff' },
];

function getGlow(elapsed) {
  const preDur = GLOW_SEGS.slice(0, LOOP_IDX).reduce((s, g) => s + g.dur, 0);
  const loopDur = GLOW_SEGS.slice(LOOP_IDX).reduce((s, g) => s + g.dur, 0);
  let idx, rem;
  if (elapsed < preDur) {
    rem = elapsed; idx = 0;
    while (idx < LOOP_IDX && rem >= GLOW_SEGS[idx].dur) { rem -= GLOW_SEGS[idx].dur; idx++; }
  } else {
    rem = (elapsed - preDur) % loopDur; idx = LOOP_IDX;
    while (idx < GLOW_SEGS.length && rem >= GLOW_SEGS[idx].dur) { rem -= GLOW_SEGS[idx].dur; idx++; }
    if (idx >= GLOW_SEGS.length) { idx = LOOP_IDX; rem = 0; }
  }
  const seg = GLOW_SEGS[idx], t = Math.min(1, rem / seg.dur);
  let positions, color = seg.color, card = seg.card || null;
  if (seg.type === 'p') positions = seg.posA ? [seg.posA, seg.posB] : [seg.pos];
  else if (seg.type === 'm') positions = [interpPath(seg.wp, t)];
  else positions = [interpPath(seg.wpA, t), interpPath(seg.wpB, t)];
  if (seg.colorEnd) {
    const a = hexToRgb(seg.color), b = hexToRgb(seg.colorEnd);
    color = `rgb(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)})`;
  }
  return { positions, color, card, idx };
}

export default function MotorControlPID() {
  const diagramTop = 550;
  const diagramH = 340;
  const boxH = 72;
  const midY = diagramTop + diagramH / 2;
  const boxY = midY - boxH / 2;

  const col = {
    target: 0,
    sigma: 252,
    pid: 390,
    motor: 660,
    splitStart: 900,
    lMotor: 960,
    rMotor: 960,
  };
  const boxW = { target: 170, pid: 220, motor: 200, output: 170 };

  const [animT, setAnimT] = useState(0);
  const glowRaf = useRef();
  useEffect(() => {
    let s = null;
    const tick = (ts) => { if (!s) s = ts; setAnimT(ts - s); glowRaf.current = requestAnimationFrame(tick); };
    glowRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(glowRaf.current);
  }, []);
  const glow = getGlow(animT);

  return (
    <div id="motor-control" style={{
      width: SECTION_SHELL_WIDTH, height: MOTOR_PID_HEIGHT, left: 0.75,
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
        Three terms act on that error: <strong>Kp</strong> reacts to how far off the line is
        right now, <strong>Kd</strong> dampens overshoot so Path Finder does not zig-zag,
        and <strong>Ki</strong> is disabled (set to 0) to keep the response crisp. The PID
        output <em>u</em> sets a <strong>duty cycle</strong> for each motor — the fraction of
        time the PWM signal is HIGH, controlling wheel speed. Left and right duty cycles shift
        in opposite directions, steering Path Finder back toward the line. Encoders measure
        actual rotation and feed it back to Σ, closing the loop every cycle.
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
        <div style={{ position: 'relative', width: 1220, height: '100%', margin: '0 auto', overflow: 'visible' }}>
        {/* Layering: feedback z1, arrows z3, glow z4 (on arrows, under glass z6), label z5, halos z10 */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'visible' }}
          overflow="visible"
        >
          <polyline
            points={`${col.lMotor + boxW.output + 14},${boxY - diagramTop - 12} ${col.lMotor + boxW.output + 40},${boxY - diagramTop - 12} ${col.lMotor + boxW.output + 40},${boxY - diagramTop + boxH + 70} ${col.sigma + 28},${boxY - diagramTop + boxH + 70} ${col.sigma + 28},${midY - diagramTop + 28}`}
            fill="none" stroke={FEEDBACK_STROKE} strokeWidth={3} strokeDasharray="12 8" strokeLinecap="round" strokeLinejoin="round" opacity={0.88}
          />
          <polyline
            points={`${col.rMotor + boxW.output + 14},${boxY - diagramTop + boxH + 12} ${col.rMotor + boxW.output + 40},${boxY - diagramTop + boxH + 12} ${col.rMotor + boxW.output + 40},${boxY - diagramTop + boxH + 70}`}
            fill="none" stroke={FEEDBACK_STROKE} strokeWidth={3} strokeDasharray="12 8" strokeLinecap="round" strokeLinejoin="round" opacity={0.88}
          />
        </svg>
        <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4, overflow: 'visible' }} overflow="visible">
          <defs>
            <filter id="pf-glow-sm" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="6" /></filter>
            <filter id="pf-glow-lg" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="14" /></filter>
          </defs>
          {glow.positions.map((p, i) => (
            <g key={i}>
              <circle cx={p[0]} cy={p[1]} r={18} fill={glow.color} filter="url(#pf-glow-lg)" opacity={0.3} />
              <circle cx={p[0]} cy={p[1]} r={6} fill={glow.color} filter="url(#pf-glow-sm)" opacity={0.7} />
              <circle cx={p[0]} cy={p[1]} r={3} fill="#fff" opacity={0.9} />
            </g>
          ))}
        </svg>

        {/* Sigma / error junction */}
        <GlassWidget diagramGlass small pixelColor="turquoise" style={{
          left: col.sigma - 24, top: boxY - diagramTop,
          width: 104, height: boxH,
          zIndex: 6,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
            <span style={{ color: '#8a7d55', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>Σ</span>
            <span style={{ color: '#4a4540', fontSize: 12, fontWeight: 600, fontFamily: 'Inter,Arial,sans-serif', lineHeight: 1.3, textAlign: 'center' }}>compare &amp;<br/>find error</span>
          </div>
        </GlassWidget>
        {/* Target box */}
        <GlassWidget diagramGlass small pixelColor="turquoise" style={{
          left: col.target, top: boxY - diagramTop,
          width: boxW.target, height: boxH,
          zIndex: 6,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 18 }}>
              Target (10)
            </div>
          </div>
        </GlassWidget>

        {/* Arrow: Target → Sigma */}
        <FlowArrow left={col.target + boxW.target + 8} top={midY - diagramTop - 11} width={col.sigma - 24 - col.target - boxW.target - 16} />

        {/* Arrow: Sigma → PID */}
        <FlowArrow left={col.sigma + 88} top={midY - diagramTop - 11} width={col.pid - col.sigma - 88 - 8} />

        {/* PID box */}
        <GlassWidget diagramGlass small pixelColor="gold" style={{
          left: col.pid, top: boxY - diagramTop - 6,
          width: boxW.pid, height: boxH + 12,
          zIndex: 6,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 20 }}>PID</div>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 500, color: '#555', fontSize: 14, marginTop: 2 }}><em>u</em> = Kp · error + Kd · Δerror/Δt</div>
          </div>
        </GlassWidget>

        {/* Arrow: PID → Motor Calc */}
        <FlowArrow left={col.pid + boxW.pid + 8} top={midY - diagramTop - 11} width={col.motor - col.pid - boxW.pid - 16} />

        {/* Motor Calc box */}
        <GlassWidget diagramGlass small pixelColor="gold" style={{
          left: col.motor, top: boxY - diagramTop - 6,
          width: boxW.motor, height: boxH + 12,
          zIndex: 6,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 20 }}>Motor Calc</div>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 500, color: '#555', fontSize: 13, marginTop: 2, textAlign: 'center', lineHeight: 1.4 }}>L = speed × (1 − <em>u</em>)<br/>R = speed × (1 + <em>u</em>)</div>
          </div>
        </GlassWidget>

        {/* Split: Motor Calc → L Motor / R Motor */}
        <FlowSplit left={col.motor + boxW.motor + 8} top={boxY - diagramTop - 28} height={boxH + 56} armWidth={col.lMotor - col.motor - boxW.motor - 20} />

        {/* L Motor */}
        <GlassWidget diagramGlass small pixelColor="turquoise" style={{
          left: col.lMotor, top: boxY - diagramTop - 40,
          width: boxW.output, height: 56,
          zIndex: 6,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 17 }}>L Motor</div>
          </div>
        </GlassWidget>

        {/* R Motor */}
        <GlassWidget diagramGlass small pixelColor="turquoise" style={{
          left: col.rMotor, top: boxY - diagramTop + boxH - 16,
          width: boxW.output, height: 56,
          zIndex: 6,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 17 }}>R Motor</div>
          </div>
        </GlassWidget>

        <div style={{
          position: 'absolute',
          left: 0,
          width: '120%',
          top: boxY - diagramTop + boxH + 54,
          zIndex: 5,
          color: '#6a6660',
          textShadow: (glow.idx >= 9 && glow.idx <= 11)
            ? '0 0 4px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.55), 0 0 18px rgba(255,255,255,0.3)'
            : 'none',
          transition: 'text-shadow 0.35s ease',
          textAlign: 'center',
          fontSize: 14, fontFamily: 'Arial', fontWeight: 700,
          userSelect: 'none',
        }}>L/R encoders send back speed/position feedback</div>

        {/* Pulse halo only while the sprite rests on a node — no dimmed idle state */}
        {[
          { id: 'target', x: col.target, y: boxY - diagramTop, w: boxW.target, h: boxH },
          { id: 'sigma', x: col.sigma - 24, y: boxY - diagramTop, w: 104, h: boxH },
          { id: 'pid', x: col.pid, y: boxY - diagramTop - 6, w: boxW.pid, h: boxH + 12 },
          { id: 'motor', x: col.motor, y: boxY - diagramTop - 6, w: boxW.motor, h: boxH + 12 },
          { id: 'outputs', x: col.lMotor, y: boxY - diagramTop - 40, w: boxW.output, h: 56 },
          { id: 'outputs', x: col.rMotor, y: boxY - diagramTop + boxH - 16, w: boxW.output, h: 56 },
        ].map((c, i) => {
          const active = glow.card === c.id;
          return (
            <div key={`cg${i}`} style={{
              position: 'absolute', left: c.x - 2, top: c.y - 2,
              width: c.w + 4, height: c.h + 4, borderRadius: 14,
              boxShadow: active ? '0 0 28px 12px rgba(255,255,255,0.55)' : 'none',
              opacity: active ? 1 : 0,
              transition: 'opacity 0.28s ease, box-shadow 0.28s ease',
              pointerEvents: 'none', zIndex: 10,
            }} />
          );
        })}
        </div>
      </div>

      {/* ── Scenario cards — liquid glass with vehicle animation ── */}
      <div style={{ left: 460, top: 910, position: 'absolute', display: 'flex', gap: 28, width: 1284, zIndex: 2 }}>
        {scenarios.map((s, i) => (
          <GlassWidget diagramGlass key={i} small pixelColor={i === 1 ? 'gold' : 'turquoise'} style={{
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

      {/* ── Code + PID params: grid keeps PID column height = code column; 460+620+40 = 1120 → PID left unchanged ── */}
      <div style={{
        position: 'absolute', left: 460, top: 1160, zIndex: 2,
        width: 1280,
        display: 'grid',
        gridTemplateColumns: '620px 620px',
        columnGap: 40,
        alignItems: 'stretch',
      }}>
        <div
          className="pf-code-block"
          style={{
            position: 'relative', left: 0, top: 0, width: '100%', boxSizing: 'border-box',
            fontSize: 13, padding: '22px 26px',
          }}
        >
          {codeSnippet}
        </div>
        <div style={{ position: 'relative', width: 620, minHeight: 0 }}>
          <GlassWidget diagramGlass small pixelColor="gold" style={{
            position: 'absolute', left: 0, top: 0, width: 620, height: '100%',
          }}>
            <div style={{
              padding: '24px 28px', height: '100%', boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                fontFamily: 'Inter,Arial,sans-serif', fontWeight: 700, fontSize: 22, color: '#1a1a1a',
                flexShrink: 0, lineHeight: 1.2, marginBottom: 8,
              }}>PID Parameters</div>
              <div style={{
                flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
                fontFamily: "'Zilla Slab',serif", fontSize: 19, color: '#333', lineHeight: 1.55,
              }}>
                <div><strong>Kp = 0.1</strong> — Responsive steering without oscillation</div>
                <div><strong>Ki = 0.0</strong> — Disabled to prevent instability</div>
                <div><strong>Kd = 0.1</strong> — Smooths response, prevents zig-zag</div>
              </div>
            </div>
          </GlassWidget>
        </div>
      </div>
    </div>
  );
}
