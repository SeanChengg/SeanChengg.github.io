import PixelBlocksBg from './PixelBlocksBg';

function Wires() {
  const gold = '#B8A977';
  const arrow = 'rgba(100,100,100,0.5)';
  const dash = 'rgba(100,100,100,0.3)';

  return (
    <svg style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 5,
    }} viewBox="0 0 1289 680" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="sa-g" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M2 2L8 5L2 8" fill="none" stroke={gold} strokeWidth="1.65" strokeLinecap="round"/>
        </marker>
        <marker id="sa-a" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M2 2L8 5L2 8" fill="none" stroke={arrow} strokeWidth="1.65" strokeLinecap="round"/>
        </marker>
      </defs>

      {/* Vision internal arrows — vertical at x=250, edge-to-edge */}
      <line x1="250" y1="163" x2="250" y2="215" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>
      <line x1="250" y1="263" x2="250" y2="315" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>
      <line x1="250" y1="363" x2="250" y2="415" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>

      {/* line_position → UART — straight horizontal at y=439 */}
      <line x1="420" y1="439" x2="490" y2="439" stroke={gold} strokeWidth="3.25" markerEnd="url(#sa-g)"/>

      {/* UART → PID — right from UART, up, into PID left center (y=136) */}
      <path d="M690 439 L735 439 L735 136 L800 136" fill="none" stroke={gold} strokeWidth="3.25" markerEnd="url(#sa-g)"/>

      {/* PID → PWM */}
      <line x1="980" y1="162" x2="980" y2="198" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>

      {/* PWM → H-Bridge */}
      <line x1="980" y1="250" x2="980" y2="286" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>

      {/* H-Bridge → Motors fork — symmetric split */}
      <line x1="980" y1="338" x2="980" y2="356" stroke={arrow} strokeWidth="2.75"/>
      <line x1="980" y1="356" x2="890" y2="356" stroke={arrow} strokeWidth="2.75"/>
      <line x1="890" y1="356" x2="890" y2="374" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>
      <line x1="980" y1="356" x2="1070" y2="356" stroke={arrow} strokeWidth="2.75"/>
      <line x1="1070" y1="356" x2="1070" y2="374" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>

      {/* Motors → Encoders */}
      <line x1="890" y1="430" x2="890" y2="466" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>
      <line x1="1070" y1="430" x2="1070" y2="466" stroke={arrow} strokeWidth="2.75" markerEnd="url(#sa-a)"/>

      {/* ADC feedback dashed — Encoder R right → up → PID right center */}
      <path d="M1144 494 L1190 494 L1190 136 L1160 136" fill="none"
        stroke={dash} strokeWidth="2.75" strokeDasharray="12 8" strokeLinecap="round" markerEnd="url(#sa-a)"/>

      <text x="1202" y="315" fill="rgba(100,100,100,0.35)" fontSize="11"
        fontFamily="Arial" fontWeight="600"
        transform="rotate(90 1202 315)" textAnchor="middle">ADC feedback</text>
    </svg>
  );
}

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

/** Title + hardware line centered within each brain panel (not the section page paragraphs). */
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

/** Same pixel wash behind glass on every diagram tile (440×540 vs 540×540 differ otherwise). */
const diagramPixelLayer = { opacity: 0.88 };

export default function SystemArchitectureDiagram() {
  return (
    <div style={{
      width: 1289, height: 680,
      left: 460, top: 540,
      position: 'absolute',
      background: 'transparent',
    }}>

      {/* VISION BRAIN — frosted glass over pixels */}
      <div style={{
        position: 'absolute', left: 30, top: 20,
        width: 440, height: 540, borderRadius: 20,
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
      }}>
        <PixelBlocksBg style={diagramPixelLayer} />
        <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />
        <div style={brainTitleRow}>
          <div style={h1}>Vision brain</div>
          <div style={{ ...h2, marginTop: 4 }}>Raspberry Pi Zero W · Python</div>
        </div>
        <div style={{ ...innerCard(340, 48), left: 50, top: 95, zIndex: 2 }}>
          <div style={t1}>Capture 32×32 frame</div>
        </div>
        <div style={{ ...innerCard(340, 48), left: 50, top: 195, zIndex: 2 }}>
          <div style={t1}>Grayscale + threshold</div>
        </div>
        <div style={{ ...innerCard(340, 48), left: 50, top: 295, zIndex: 2 }}>
          <div style={t1}>Sliding window search</div>
        </div>
        <div style={{ ...innerCard(340, 48), left: 50, top: 395, zIndex: 2 }}>
          <div style={t1}>line_position (0–20)</div>
        </div>
      </div>
      {/* UART BRIDGE — same vertical rhythm as Motor cards; single label line */}
      <div style={{
        position: 'absolute', left: 490, top: 413, width: 200, height: 52,
        borderRadius: 26, overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
        zIndex: 3,
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

      {/* MOTOR BRAIN — frosted glass over pixels */}
      <div style={{
        position: 'absolute', left: 710, top: 20,
        width: 540, height: 540, borderRadius: 20,
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
      }}>
        <PixelBlocksBg style={diagramPixelLayer} />
        <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />
        <div style={brainTitleRow}>
          <div style={h1}>Motor brain</div>
          <div style={{ ...h2, marginTop: 4 }}>RP2040 Pico · Bare-metal C</div>
        </div>
        <div style={{ ...innerCard(360, 52), left: 90, top: 90, zIndex: 2 }}>
          <div style={t1}>PID controller</div>
        </div>
        <div style={{ ...innerCard(360, 52), left: 90, top: 178, zIndex: 2 }}>
          <div style={t1}>PWM duty calc</div>
        </div>
        <div style={{ ...innerCard(360, 52), left: 90, top: 266, zIndex: 2 }}>
          <div style={t1}>H-Bridge driver</div>
        </div>
        <div style={{ ...innerCard(148, 56), left: 106, top: 354, zIndex: 2 }}>
          <div style={t1}>Left motor</div>
          <div style={t2}>GPIO 6</div>
        </div>
        <div style={{ ...innerCard(148, 56), left: 286, top: 354, zIndex: 2 }}>
          <div style={t1}>Right motor</div>
          <div style={t2}>GPIO 7</div>
        </div>
        <div style={{
          ...innerCard(148, 56), left: 106, top: 446, zIndex: 2,
          background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={t1}>Encoder L</div>
          <div style={t2}>ADC 0 · GPIO 26</div>
        </div>
        <div style={{
          ...innerCard(148, 56), left: 286, top: 446, zIndex: 2,
          background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={t1}>Encoder R</div>
          <div style={t2}>ADC 1 · GPIO 27</div>
        </div>
      </div>

      <Wires />

      {/* SIGNAL FLOW LEGEND — spans Vision left (30) through Motor right (1250): width 1220 */}
      <div style={{
        position: 'absolute', bottom: 10, left: 30,
        width: 1220, height: 78,
        borderRadius: 12,
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.36)',
        zIndex: 6,
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
