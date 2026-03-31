import PixelBlocksBg from './PixelBlocksBg';

/**
 * All SVG coords in diagram space: viewBox 0 0 1289 1100
 * Vision container: left 50, top 50, 380×600 — box center x = 240
 * Motor container: left 860, top 50, 380×600 — box center x = 1050
 */
function Wires() {
  const teal = 'rgba(15, 110, 86, 0.5)';
  const amber = 'rgba(217, 119, 6, 0.6)';
  const purple = 'rgba(83, 74, 183, 0.4)';
  const purplePid = 'rgba(83, 74, 183, 0.5)';
  const gray = 'rgba(100, 100, 100, 0.4)';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
      viewBox="0 0 1289 1100"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="arrowhead-teal"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill={teal} />
        </marker>
        <marker
          id="arrowhead-purple"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="rgba(83, 74, 183, 0.4)" />
        </marker>
        <marker
          id="arrowhead-amber"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill={amber} />
        </marker>
        <marker
          id="arrowhead-gray"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill={gray} />
        </marker>
      </defs>

      {/* Vision internal: boxes at tops 100,230,360,490 — 30px gaps; x = 50+190 */}
      <line
        x1="240"
        y1="250"
        x2="240"
        y2="280"
        stroke={teal}
        strokeWidth="2"
        markerEnd="url(#arrowhead-teal)"
      />
      <line
        x1="240"
        y1="380"
        x2="240"
        y2="410"
        stroke={teal}
        strokeWidth="2"
        markerEnd="url(#arrowhead-teal)"
      />
      <line
        x1="240"
        y1="510"
        x2="240"
        y2="540"
        stroke={teal}
        strokeWidth="2"
        markerEnd="url(#arrowhead-teal)"
      />

      {/* Vision → UART: from container right at last-box midline, up to UART inlet */}
      <path
        d="M 430 540 L 430 250 L 420 250"
        fill="none"
        stroke={amber}
        strokeWidth="3"
        markerEnd="url(#arrowhead-amber)"
      />

      {/* UART → Motor: horizontal to motor glass left (x=860) */}
      <line
        x1="620"
        y1="250"
        x2="860"
        y2="250"
        stroke={amber}
        strokeWidth="3"
        markerEnd="url(#arrowhead-amber)"
      />

      {/* PID → PWM — boxes at 100 / 230 */}
      <line
        x1="1050"
        y1="250"
        x2="1050"
        y2="280"
        stroke={purplePid}
        strokeWidth="2"
        markerEnd="url(#arrowhead-purple)"
      />

      {/* PWM bottom center → motor tops (diagonals) */}
      <line
        x1="1050"
        y1="320"
        x2="950"
        y2="370"
        stroke={purple}
        strokeWidth="2"
        markerEnd="url(#arrowhead-purple)"
      />
      <line
        x1="1050"
        y1="320"
        x2="1150"
        y2="370"
        stroke={purple}
        strokeWidth="2"
        markerEnd="url(#arrowhead-purple)"
      />

      {/* Motor → encoder vertical */}
      <line
        x1="950"
        y1="450"
        x2="950"
        y2="490"
        stroke={purple}
        strokeWidth="2"
        markerEnd="url(#arrowhead-purple)"
      />
      <line
        x1="1150"
        y1="450"
        x2="1150"
        y2="490"
        stroke={purple}
        strokeWidth="2"
        markerEnd="url(#arrowhead-purple)"
      />

      {/* Feedback: Encoder R center-right → PID left edge at vertical mid (PID top 100, h 100 → y=150 motor) */}
      <path
        d="M 1220 530 C 1240 380, 1180 200, 990 200"
        fill="none"
        stroke={gray}
        strokeWidth="2"
        strokeDasharray="8,4"
        markerEnd="url(#arrowhead-gray)"
      />
    </svg>
  );
}

const innerCard = (w, h) => ({
  position: 'absolute',
  width: w,
  height: h,
  borderRadius: 8,
  border: '2px solid rgba(0,0,0,0.08)',
  background: 'rgba(255,255,255,0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 2,
});

const t1 = { color: '#141414', fontSize: 15, fontFamily: 'Inter,sans-serif', fontWeight: 600 };
const t2 = { color: 'rgba(40,40,40,0.65)', fontSize: 12, fontFamily: "'Zilla Slab',serif" };
const h1 = { color: '#101010', fontSize: 22, fontFamily: 'Inter,sans-serif', fontWeight: 700 };
const h2 = { color: 'rgba(40,40,40,0.55)', fontSize: 14, fontFamily: "'Zilla Slab',serif" };

const LEGEND_STEPS = [
  'Signal flow: Camera',
  'Pi Zero',
  'UART',
  'Pi Pico',
  'PWM',
  'Motors',
  'Encoders',
  'PID ↻',
];

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

export default function SystemArchitectureDiagram() {
  return (
    <div
      style={{
        width: 1289,
        height: 1100,
        left: 460,
        top: 100,
        position: 'absolute',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      {/* VISION BRAIN */}
      <div
        style={{
          position: 'absolute',
          left: 50,
          top: 50,
          width: 380,
          height: 600,
          borderRadius: 20,
          overflow: 'hidden',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.36)',
        }}
      >
        <PixelBlocksBg />
        <div className="pf-liquid-glass" style={{ borderRadius: 'inherit' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '24px 28px 0' }}>
          <div style={h1}>Vision brain</div>
          <div style={{ ...h2, marginTop: 4 }}>Raspberry Pi Zero W · Python</div>
        </div>
        <div style={{ ...innerCard(300, 100), left: 40, top: 100, zIndex: 2 }}>
          <div style={t1}>ArduCAM OV2640</div>
        </div>
        <div style={{ ...innerCard(300, 100), left: 40, top: 230, zIndex: 2 }}>
          <div style={t1}>Grayscale + threshold</div>
        </div>
        <div style={{ ...innerCard(300, 100), left: 40, top: 360, zIndex: 2 }}>
          <div style={t1}>Sliding window search</div>
        </div>
        <div style={{ ...innerCard(300, 100), left: 40, top: 490, zIndex: 2 }}>
          <div style={t1}>Position (0–20)</div>
        </div>
      </div>

      {/* UART BRIDGE */}
      <div
        style={{
          position: 'absolute',
          left: 420,
          top: 180,
          width: 200,
          height: 140,
          borderRadius: 26,
          overflow: 'hidden',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.36)',
          zIndex: 3,
        }}
      >
        <PixelBlocksBg />
        <div className="pf-liquid-glass" style={{ borderRadius: 26 }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div style={{ ...t1, fontSize: 16 }}>UART</div>
          <div style={{ ...t2, fontSize: 13 }}>115200</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 455,
          top: 332,
          color: '#B8A977',
          fontSize: 12,
          fontFamily: 'Arial',
          fontWeight: 600,
          zIndex: 6,
        }}
      >
        115200 baud
      </div>

      {/* MOTOR BRAIN */}
      <div
        style={{
          position: 'absolute',
          left: 860,
          top: 50,
          width: 380,
          height: 600,
          borderRadius: 20,
          overflow: 'hidden',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.36)',
        }}
      >
        <PixelBlocksBg />
        <div className="pf-liquid-glass" style={{ borderRadius: 'inherit' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '24px 28px 0' }}>
          <div style={h1}>Motor brain</div>
          <div style={{ ...h2, marginTop: 4 }}>RP2040 Pico · Bare-metal C</div>
        </div>
        <div style={{ ...innerCard(300, 100), left: 40, top: 100, zIndex: 2 }}>
          <div style={t1}>PID controller</div>
        </div>
        <div style={{ ...innerCard(300, 100), left: 40, top: 230, zIndex: 2 }}>
          <div style={t1}>PWM duty calc</div>
        </div>
        <div
          style={{
            ...innerCard(140, 80),
            left: 20,
            top: 320,
            zIndex: 2,
          }}
        >
          <div style={t1}>Left motor</div>
          <div style={t2}>GPIO 6</div>
        </div>
        <div
          style={{
            ...innerCard(140, 80),
            right: 20,
            top: 320,
            zIndex: 2,
          }}
        >
          <div style={t1}>Right motor</div>
          <div style={t2}>GPIO 7</div>
        </div>
        <div
          style={{
            ...innerCard(140, 80),
            left: 20,
            top: 440,
            zIndex: 2,
            background: 'rgba(255,252,248,0.95)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div style={t1}>Encoder L</div>
          <div style={t2}>GPIO 26</div>
        </div>
        <div
          style={{
            ...innerCard(140, 80),
            right: 20,
            top: 440,
            zIndex: 2,
            background: 'rgba(255,252,248,0.95)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div style={t1}>Encoder R</div>
          <div style={t2}>GPIO 27</div>
        </div>
      </div>

      <Wires />

      {/* SIGNAL FLOW LEGEND — spans Vision left (50) through Motor right (1240) */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 50,
          width: 1190,
          height: 56,
          borderRadius: 12,
          overflow: 'hidden',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.36)',
          zIndex: 6,
        }}
      >
        <PixelBlocksBg maxBlocks={16} />
        <div className="pf-liquid-glass" style={{ borderRadius: 'inherit' }} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px 12px',
            padding: '8px 22px',
            boxSizing: 'border-box',
          }}
        >
          {LEGEND_STEPS.map((step, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              {i > 0 && (
                <span style={legendArrow} aria-hidden>
                  →
                </span>
              )}
              <span style={legendText}>{step}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
