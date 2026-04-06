import { useState, useEffect, useRef } from 'react';
import PixelBlocksBg from './PixelBlocksBg';
import { SECTION_BODY_LEFT } from '../pageLayout';

const DASH = '8 5';
const WIRE_COLOR = 'rgba(100,100,100,0.5)';
const GOLD_COLOR = '#B8A977';
const FEEDBACK_COLOR = 'rgba(100,100,100,0.3)';

function Wires() {
  return (
    <svg style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 3,
    }} viewBox="0 0 1289 680" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="sa-g" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M2 2L8 5L2 8" fill="none" stroke={GOLD_COLOR} strokeWidth="1.65" strokeLinecap="round"/>
        </marker>
        <marker id="sa-a" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M2 2L8 5L2 8" fill="none" stroke={WIRE_COLOR} strokeWidth="1.65" strokeLinecap="round"/>
        </marker>
      </defs>

      {/* Vision internal arrows */}
      <line x1="250" y1="163" x2="250" y2="215" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>
      <line x1="250" y1="263" x2="250" y2="315" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>
      <line x1="250" y1="363" x2="250" y2="415" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>

      {/* line_position → UART */}
      <line x1="420" y1="439" x2="490" y2="439" stroke={GOLD_COLOR} strokeWidth="3.25" strokeDasharray={DASH} markerEnd="url(#sa-g)"/>

      {/* UART → PID */}
      <path d="M690 439 L735 439 L735 136 L800 136" fill="none" stroke={GOLD_COLOR} strokeWidth="3.25" strokeDasharray={DASH} markerEnd="url(#sa-g)"/>

      {/* PID → PWM */}
      <line x1="980" y1="162" x2="980" y2="198" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>

      {/* PWM → H-Bridge */}
      <line x1="980" y1="250" x2="980" y2="286" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>

      {/* H-Bridge → Motors fork */}
      <line x1="980" y1="338" x2="980" y2="356" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH}/>
      <line x1="980" y1="356" x2="890" y2="356" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH}/>
      <line x1="890" y1="356" x2="890" y2="374" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>
      <line x1="980" y1="356" x2="1070" y2="356" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH}/>
      <line x1="1070" y1="356" x2="1070" y2="374" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>

      {/* Motors → Encoders */}
      <line x1="890" y1="430" x2="890" y2="466" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>
      <line x1="1070" y1="430" x2="1070" y2="466" stroke={WIRE_COLOR} strokeWidth="2.75" strokeDasharray={DASH} markerEnd="url(#sa-a)"/>

      {/* Encoder L → Encoder R connector — centered vertically on encoder cards (top=466 h=56 → center=494) */}
      <line x1="964" y1="494" x2="996" y2="494" stroke={FEEDBACK_COLOR} strokeWidth="2.75" strokeDasharray="12 8" strokeLinecap="round"/>

      {/* ADC feedback — Encoder R → PID */}
      <path d="M1144 494 L1190 494 L1190 136 L1160 136" fill="none"
        stroke={FEEDBACK_COLOR} strokeWidth="2.75" strokeDasharray="12 8" strokeLinecap="round" markerEnd="url(#sa-a)"/>

      <text x="1202" y="315" fill="rgba(100,100,100,0.35)" fontSize="11"
        fontFamily="Arial" fontWeight="600"
        transform="rotate(90 1202 315)" textAnchor="middle">ADC feedback</text>
    </svg>
  );
}

/* ── Glow animation engine (same pattern as MotorControlPID) ── */

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

/*
 * Animation structure:
 *   First pass: single dot travels the full path
 *     Capture → … → UART → PID → PWM → H-Bridge → Motors → Encoders → (blue) ADC → PID
 *
 *   Loop: two simultaneous dots, both arriving at PID together
 *     Vision dot (white): Capture → … → UART → PID
 *     Motor dot (white→blue): PID → PWM → H-Bridge → Motors → Encoders → (blue) ADC → PID
 */

const VC = {
  capture:   [250, 139],
  grayscale: [250, 239],
  sliding:   [250, 339],
  linepos:   [250, 439],
};
const MC = {
  pid:       [980, 136],
  pwm:       [980, 224],
  hbridge:   [980, 312],
  lmotor:    [890, 402],
  rmotor:    [1070, 402],
  encL:      [890, 494],
  encR:      [1070, 494],
};
const UART_C = [590, 439];

// Vision track: Capture → … → UART → arrives at PID (4550ms)
const VISION_SEGS = [
  { type: 'p', pos: VC.capture, dur: 500, card: 'capture' },
  { type: 'm', wp: [[250, 163], [250, 215]], dur: 400 },
  { type: 'p', pos: VC.grayscale, dur: 400, card: 'grayscale' },
  { type: 'm', wp: [[250, 263], [250, 315]], dur: 400 },
  { type: 'p', pos: VC.sliding, dur: 400, card: 'sliding' },
  { type: 'm', wp: [[250, 363], [250, 415]], dur: 400 },
  { type: 'p', pos: VC.linepos, dur: 400, card: 'linepos' },
  { type: 'm', wp: [[420, 439], [490, 439]], dur: 350 },
  { type: 'p', pos: UART_C, dur: 400, card: 'uart' },
  { type: 'm', wp: [[690, 439], [735, 439], [735, 136], [800, 136]], dur: 900 },
];

// Motor track: PID exit → PWM → … → Encoders → merge → blue ADC → arrives at PID (4550ms)
const MOTOR_SEGS = [
  { type: 'm', wp: [[980, 162], [980, 198]], dur: 300 },
  { type: 'p', pos: MC.pwm, dur: 400, card: 'pwm' },
  { type: 'm', wp: [[980, 250], [980, 286]], dur: 300 },
  { type: 'p', pos: MC.hbridge, dur: 400, card: 'hbridge' },
  { type: 's', wpA: [[980, 338], [980, 356], [890, 356], [890, 374]], wpB: [[980, 338], [980, 356], [1070, 356], [1070, 374]], dur: 600 },
  { type: 'p', posA: MC.lmotor, posB: MC.rmotor, dur: 400, card: 'motors' },
  { type: 's', wpA: [[890, 430], [890, 466]], wpB: [[1070, 430], [1070, 466]], dur: 400 },
  { type: 'p', posA: MC.encL, posB: MC.encR, dur: 400, card: 'encoders' },
  // L dot merges into R via connector, both transition to turquoise
  { type: 's', wpA: [[890, 494], [964, 494], [996, 494], [1070, 494]], wpB: [[1070, 494]], dur: 300, colorEnd: '#64dcdc' },
  // single turquoise dot exits Encoder R right side → ADC feedback → PID
  { type: 'm', wp: [[1144, 494], [1190, 494], [1190, 136], [1160, 136]], dur: 1050, color: '#64dcdc' },
];

function segsDuration(segs) { return segs.reduce((s, g) => s + g.dur, 0); }

const VISION_DUR = segsDuration(VISION_SEGS);  // 4550
const MOTOR_DUR  = segsDuration(MOTOR_SEGS);   // 4550
const TRACK_DUR  = Math.max(VISION_DUR, MOTOR_DUR);
const PID_PAUSE  = 500;
const LOOP_DUR   = TRACK_DUR + PID_PAUSE;      // 5050

// First pass: full sequential journey (single dot)
const FIRST_PASS = [
  ...VISION_SEGS,
  { type: 'p', pos: MC.pid, dur: PID_PAUSE, card: 'pid' },
  ...MOTOR_SEGS,
  { type: 'p', pos: MC.pid, dur: PID_PAUSE, card: 'pid', color: '#64dcdc', colorEnd: '#ffffff' },
];
const FIRST_DUR = segsDuration(FIRST_PASS);

function resolveSegState(segs, elapsed) {
  let rem = elapsed, idx = 0;
  while (idx < segs.length && rem >= segs[idx].dur) { rem -= segs[idx].dur; idx++; }
  if (idx >= segs.length) return null;
  const seg = segs[idx], t = Math.min(1, rem / seg.dur);
  let positions;
  const baseColor = seg.color || '#ffffff';
  let color = baseColor;
  const card = seg.card || null;
  if (seg.type === 'p') positions = seg.posA ? [seg.posA, seg.posB] : [seg.pos];
  else if (seg.type === 'm') positions = [interpPath(seg.wp, t)];
  else positions = [interpPath(seg.wpA, t), interpPath(seg.wpB, t)];
  if (seg.colorEnd) {
    const a = hexToRgb(baseColor.startsWith('#') ? baseColor : '#ffffff');
    const b = hexToRgb(seg.colorEnd);
    color = `rgb(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)})`;
  }
  return { positions, color, card, idx };
}

function getGlows(elapsed) {
  // First pass: one dot goes through the entire path sequentially
  if (elapsed < FIRST_DUR) {
    const s = resolveSegState(FIRST_PASS, elapsed);
    return { dots: s ? [s] : [], cards: new Set(s && s.card ? [s.card] : []) };
  }

  // Loop: two dots running in parallel, both arriving at PID together
  const loopT = (elapsed - FIRST_DUR) % LOOP_DUR;

  if (loopT < TRACK_DUR) {
    const v = resolveSegState(VISION_SEGS, loopT);
    const m = resolveSegState(MOTOR_SEGS, loopT);
    const dots = [];
    const cards = new Set();
    if (v) { dots.push(v); if (v.card) cards.add(v.card); }
    if (m) { dots.push(m); if (m.card) cards.add(m.card); }
    return { dots, cards };
  }

  // Shared PID pause — both dots rest at PID, motor dot fades turquoise → white
  const pt = (loopT - TRACK_DUR) / PID_PAUSE;
  const tq = hexToRgb('#64dcdc'), wh = [255, 255, 255];
  const mc = `rgb(${Math.round(tq[0]+(wh[0]-tq[0])*pt)},${Math.round(tq[1]+(wh[1]-tq[1])*pt)},${Math.round(tq[2]+(wh[2]-tq[2])*pt)})`;
  return {
    dots: [
      { positions: [MC.pid], color: '#ffffff', card: 'pid' },
      { positions: [MC.pid], color: mc, card: 'pid' },
    ],
    cards: new Set(['pid']),
  };
}

/* ── Static styles ── */

const innerCard = (w, h) => ({
  position: 'absolute', width: w, height: h, borderRadius: 8,
  border: '2px solid rgba(0,0,0,0.08)',
  background: 'rgba(255,255,255,0.5)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexDirection: 'column', gap: 2,
});

const t1 = { color: '#141414', fontSize: 15, fontFamily: 'Inter,sans-serif', fontWeight: 600 };
const t2 = { color: 'rgba(40,40,40,0.65)', fontSize: 12, fontFamily: "'Zilla Slab',serif" };
const h1 = { color: '#101010', fontSize: 22, fontFamily: 'Inter,sans-serif', fontWeight: 700 };
const h2 = { color: 'rgba(40,40,40,0.55)', fontSize: 14, fontFamily: "'Zilla Slab',serif" };

const brainTitleRow = {
  position: 'relative',
  zIndex: 2,
  padding: '24px 28px 0',
  textAlign: 'center',
  width: '100%',
  boxSizing: 'border-box',
};

const LEGEND_STEPS = [
  'Signal flow: Camera',
  'Pi Zero',
  'UART',
  'Pi Pico',
  'PWM',
  'H-Bridge',
  'Motors',
  'Encoders',
  'PID (feedback loop)',
];

const LEGEND_CAPTION =
  'End-to-end data path; ADC encoder feedback closes the motor control loop at PID.';

const legendText = {
  color: 'rgba(22, 32, 48, 0.88)',
  fontSize: 17,
  fontFamily: "'Zilla Slab',serif",
  fontWeight: 600,
  letterSpacing: 0.35,
};

const legendArrow = {
  fontSize: 22,
  lineHeight: 1,
  color: 'rgba(55, 95, 125, 0.55)',
  fontWeight: 400,
  userSelect: 'none',
};

const legendCaption = {
  color: 'rgba(22, 32, 48, 0.62)',
  fontSize: 13,
  fontFamily: "'Zilla Slab',serif",
  fontWeight: 500,
  letterSpacing: 0.2,
  textAlign: 'center',
  lineHeight: 1.35,
  maxWidth: 1180,
};

const diagramPixelLayer = { opacity: 0.88 };

// Card hitboxes for glow halos (in viewBox coords, mapped to % for the overlay div)
const CARD_BOXES = [
  { id: 'capture',   x: 80, y: 115, w: 340, h: 48 },    // vision: left=30+50=80
  { id: 'grayscale',  x: 80, y: 215, w: 340, h: 48 },
  { id: 'sliding',   x: 80, y: 315, w: 340, h: 48 },
  { id: 'linepos',   x: 80, y: 415, w: 340, h: 48 },
  { id: 'uart',      x: 490, y: 413, w: 200, h: 52 },
  { id: 'pid',       x: 800, y: 110, w: 360, h: 52 },    // motor: left=710+90=800
  { id: 'pwm',       x: 800, y: 198, w: 360, h: 52 },
  { id: 'hbridge',   x: 800, y: 286, w: 360, h: 52 },
  { id: 'motors',    x: 816, y: 374, w: 148, h: 56 },
  { id: 'motors',    x: 996, y: 374, w: 148, h: 56 },
  { id: 'encoders',  x: 816, y: 466, w: 148, h: 56 },  // Encoder L
  { id: 'encoders',  x: 996, y: 466, w: 148, h: 56 },  // Encoder R
];

export default function SystemArchitectureDiagram() {
  const [animT, setAnimT] = useState(0);
  const raf = useRef();
  useEffect(() => {
    let s = null;
    const tick = (ts) => { if (!s) s = ts; setAnimT(ts - s); raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);
  const { dots, cards } = getGlows(animT);

  return (
    <div style={{
      width: 1289, height: 680,
      left: SECTION_BODY_LEFT, top: 540,
      position: 'absolute',
      background: 'transparent',
    }}>

      {/* VISION BRAIN — z1: creates stacking context to contain PixelBlocksBg z-indices, below wires/glow/cards */}
      <div style={{
        position: 'absolute', left: 30, top: 20,
        width: 440, height: 540, borderRadius: 20,
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
        zIndex: 1,
      }}>
        <PixelBlocksBg style={diagramPixelLayer} />
        <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />
        <div style={brainTitleRow}>
          <div style={h1}>Vision brain</div>
          <div style={{ ...h2, marginTop: 4 }}>Raspberry Pi Zero W · Python</div>
        </div>
      </div>

      {/* MOTOR BRAIN — z1: creates stacking context to contain PixelBlocksBg z-indices */}
      <div style={{
        position: 'absolute', left: 710, top: 20,
        width: 540, height: 540, borderRadius: 20,
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
        zIndex: 1,
      }}>
        <PixelBlocksBg style={diagramPixelLayer} />
        <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />
        <div style={brainTitleRow}>
          <div style={h1}>Motor brain</div>
          <div style={{ ...h2, marginTop: 4 }}>RP2040 Pico · Bare-metal C</div>
        </div>
      </div>

      {/* UART BRIDGE — z6, above glow dots */}
      <div style={{
        position: 'absolute', left: 490, top: 413, width: 200, height: 52,
        borderRadius: 26, overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
        zIndex: 6,
      }}>
        <PixelBlocksBg style={diagramPixelLayer} />
        <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 26 }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ ...t1, fontSize: 15 }}>UART 115200 baud</div>
        </div>
      </div>

      {/* Inner cards — absolute in root so glow dot (z4) passes UNDER them (z6) */}
      {/* Vision cards */}
      <div style={{ ...innerCard(340, 48), left: 80, top: 115, zIndex: 6 }}>
        <div style={t1}>Capture 32×32 frame</div>
      </div>
      <div style={{ ...innerCard(340, 48), left: 80, top: 215, zIndex: 6 }}>
        <div style={t1}>Grayscale + Threshold</div>
      </div>
      <div style={{ ...innerCard(340, 48), left: 80, top: 315, zIndex: 6 }}>
        <div style={t1}>Sliding window scan</div>
      </div>
      <div style={{ ...innerCard(340, 48), left: 80, top: 415, zIndex: 6 }}>
        <div style={t1}>Line_position (0–20)</div>
      </div>
      {/* Motor cards */}
      <div style={{ ...innerCard(360, 52), left: 800, top: 110, zIndex: 6 }}>
        <div style={t1}>PID controller</div>
      </div>
      <div style={{ ...innerCard(360, 52), left: 800, top: 198, zIndex: 6 }}>
        <div style={t1}>PWM duty calc</div>
      </div>
      <div style={{ ...innerCard(360, 52), left: 800, top: 286, zIndex: 6 }}>
        <div style={t1}>H-Bridge driver</div>
      </div>
      <div style={{ ...innerCard(148, 56), left: 816, top: 374, zIndex: 6 }}>
        <div style={t1}>Left motor</div>
        <div style={t2}>GPIO 6</div>
      </div>
      <div style={{ ...innerCard(148, 56), left: 996, top: 374, zIndex: 6 }}>
        <div style={t1}>Right motor</div>
        <div style={t2}>GPIO 7</div>
      </div>
      <div style={{
        ...innerCard(148, 56), left: 816, top: 466, zIndex: 6,
        background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={t1}>Encoder L</div>
        <div style={t2}>ADC 0 · GPIO 26</div>
      </div>
      <div style={{
        ...innerCard(148, 56), left: 996, top: 466, zIndex: 6,
        background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={t1}>Encoder R</div>
        <div style={t2}>ADC 1 · GPIO 27</div>
      </div>

      <Wires />

      {/* Glow dot overlay — z4: above wires (z3), below glass panels (z6) — same effect as Motor PID */}
      <svg style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 4, overflow: 'visible',
      }} viewBox="0 0 1289 680" preserveAspectRatio="xMidYMid meet" overflow="visible">
        <defs>
          <filter id="sa-glow-sm" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="sa-glow-lg" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>
        {dots.map((d, di) =>
          d.positions.map((p, pi) => (
            <g key={`${di}-${pi}`}>
              <circle cx={p[0]} cy={p[1]} r={18} fill={d.color} filter="url(#sa-glow-lg)" opacity={0.3} />
              <circle cx={p[0]} cy={p[1]} r={6} fill={d.color} filter="url(#sa-glow-sm)" opacity={0.7} />
              <circle cx={p[0]} cy={p[1]} r={3} fill="#fff" opacity={0.9} />
            </g>
          ))
        )}
      </svg>

      {/* Card glow halos — div-based for reliable CSS transitions (same as Motor PID) */}
      {CARD_BOXES.map((c, i) => {
        const active = cards.has(c.id);
        return (
          <div key={`halo-${i}`} style={{
            position: 'absolute',
            left: c.x * (100 / 1289) + '%',
            top: c.y * (100 / 680) + '%',
            width: c.w * (100 / 1289) + '%',
            height: c.h * (100 / 680) + '%',
            borderRadius: 12,
            boxShadow: active ? '0 0 28px 12px rgba(255,255,255,0.55)' : 'none',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.28s ease, box-shadow 0.28s ease',
            pointerEvents: 'none',
            zIndex: 10,
          }} />
        );
      })}

      {/* SIGNAL FLOW LEGEND */}
      <div style={{
        position: 'absolute', bottom: 10, left: 30,
        width: 1220, height: 78,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
        zIndex: 7,
      }}>
        <PixelBlocksBg maxBlocks={16} style={diagramPixelLayer} />
        <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 6,
          padding: '6px 22px 8px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: '8px 12px',
          }}>
            {LEGEND_STEPS.map((step, i) => (
              <span
                key={i}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                {i > 0 && <span style={legendArrow} aria-hidden>→</span>}
                <span style={legendText}>{step}</span>
              </span>
            ))}
          </div>
          <div style={legendCaption}>{LEGEND_CAPTION}</div>
        </div>
      </div>
    </div>
  );
}
