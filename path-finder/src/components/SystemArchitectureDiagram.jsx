import GlassWidget from './GlassWidget';

/** SVG wire overlay — coordinates in `.ns` local space (1289×620) */
function ArchWires() {
  const gold = '#B8A977';
  const blue = '#5985AD';
  const dash = 'rgba(255,255,255,0.35)';

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      viewBox="0 0 1289 620"
    >
      <defs>
        <marker
          id="arch-arrow-blue"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M2 2L8 5L2 8" fill="none" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        </marker>
        <marker
          id="arch-arrow-gold"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M2 2L8 5L2 8" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>

      {/* Pi Zero → UART */}
      <line x1="330" y1="180" x2="380" y2="195" stroke={gold} strokeWidth="1.5" markerEnd="url(#arch-arrow-gold)" />
      {/* UART → Pico */}
      <line x1="520" y1="195" x2="550" y2="180" stroke={gold} strokeWidth="1.5" markerEnd="url(#arch-arrow-gold)" />
      {/* Pico → fork */}
      <line x1="830" y1="180" x2="855" y2="180" stroke={blue} strokeWidth="1.5" />
      <line x1="855" y1="180" x2="855" y2="115" stroke={blue} strokeWidth="1.5" />
      <line x1="855" y1="180" x2="855" y2="205" stroke={blue} strokeWidth="1.5" />
      <line x1="855" y1="115" x2="880" y2="115" stroke={blue} strokeWidth="1.5" markerEnd="url(#arch-arrow-blue)" />
      <line x1="855" y1="205" x2="880" y2="205" stroke={blue} strokeWidth="1.5" markerEnd="url(#arch-arrow-blue)" />
      {/* Motors → encoders */}
      <line x1="1040" y1="115" x2="1080" y2="115" stroke={blue} strokeWidth="1.5" markerEnd="url(#arch-arrow-blue)" />
      <line x1="1040" y1="205" x2="1080" y2="205" stroke={blue} strokeWidth="1.5" markerEnd="url(#arch-arrow-blue)" />
      {/* Feedback encoders → Pico (dashed) */}
      <path
        d="M 1160 150 L 1160 300 L 700 300 L 700 250 L 550 250"
        fill="none"
        stroke={dash}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

export default function SystemArchitectureDiagram() {
  return (
    <div
      className="ns"
      style={{
        width: 1289,
        height: 620,
        left: 460,
        top: 510,
        position: 'absolute',
        borderRadius: 24,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 30,
          color: '#5DCAA5',
          fontSize: 14,
          fontFamily: 'Inter,sans-serif',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        Vision brain
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 50,
          color: 'rgba(255,255,255,0.5)',
          fontSize: 12,
          fontFamily: "'Zilla Slab',serif",
        }}
      >
        Raspberry Pi Zero W · Python
      </div>

      <GlassWidget
        pixelColor="teal"
        pixelCount={12}
        style={{ left: 50, top: 80, width: 280, height: 200 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            padding: '16px 20px',
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 15 }}>
            Raspberry Pi Zero W
          </div>
          <div
            style={{
              fontFamily: "'Zilla Slab',serif",
              fontWeight: 400,
              color: '#666',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            ArduCAM OV2640 (32×32)
            <br />
            Grayscale + threshold (150)
            <br />
            Sliding window search
            <br />
            Centroid → Position (0–20)
            <br />
            UART TX to Pico
          </div>
        </div>
      </GlassWidget>

      <GlassWidget pixelColor="amber" pixelCount={5} small style={{ left: 380, top: 170, width: 140, height: 50 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 6,
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13 }}>UART</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#888', fontSize: 11 }}>115200</div>
        </div>
      </GlassWidget>

      <div
        style={{
          position: 'absolute',
          left: 570,
          top: 30,
          color: '#AFA9EC',
          fontSize: 14,
          fontFamily: 'Inter,sans-serif',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        Motor brain
      </div>
      <div
        style={{
          position: 'absolute',
          left: 570,
          top: 50,
          color: 'rgba(255,255,255,0.5)',
          fontSize: 12,
          fontFamily: "'Zilla Slab',serif",
        }}
      >
        RP2040 Pico · Bare-metal C
      </div>

      <GlassWidget
        pixelColor="purple"
        pixelCount={12}
        style={{ left: 550, top: 80, width: 280, height: 200 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            padding: '16px 20px',
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 15 }}>
            RP2040 Pico
          </div>
          <div
            style={{
              fontFamily: "'Zilla Slab',serif",
              fontWeight: 400,
              color: '#666',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            Dual ARM Cortex-M0+ · 125 MHz
            <br />
            PID controller (Kp=0.1, Kd=0.1)
            <br />
            PWM motor control (2 kHz)
            <br />
            ADC encoder feedback
            <br />
            UART RX from Pi Zero
          </div>
        </div>
      </GlassWidget>

      <GlassWidget pixelColor="purple" pixelCount={4} small style={{ left: 880, top: 80, width: 160, height: 70 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13 }}>Left motor</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#888', fontSize: 11 }}>PWM · GPIO 6</div>
        </div>
      </GlassWidget>

      <GlassWidget pixelColor="purple" pixelCount={4} small style={{ left: 880, top: 170, width: 160, height: 70 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13 }}>Right motor</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#888', fontSize: 11 }}>PWM · GPIO 7</div>
        </div>
      </GlassWidget>

      <GlassWidget pixelColor="gray" pixelCount={3} small style={{ left: 1080, top: 80, width: 160, height: 70 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13 }}>Left encoder</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#888', fontSize: 11 }}>ADC · GPIO 26</div>
        </div>
      </GlassWidget>

      <GlassWidget pixelColor="gray" pixelCount={3} small style={{ left: 1080, top: 170, width: 160, height: 70 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
          }}
        >
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13 }}>Right encoder</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#888', fontSize: 11 }}>ADC · GPIO 27</div>
        </div>
      </GlassWidget>

      <div
        style={{
          position: 'absolute',
          left: 340,
          top: 145,
          color: '#B8A977',
          fontSize: 11,
          fontFamily: 'Arial',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          zIndex: 5,
        }}
      >
        Position data
      </div>

      <div
        style={{
          position: 'absolute',
          left: 835,
          top: 110,
          color: '#5985AD',
          fontSize: 11,
          fontFamily: 'Arial',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          zIndex: 5,
        }}
      >
        PWM
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1045,
          top: 110,
          color: '#888',
          fontSize: 11,
          fontFamily: 'Arial',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          zIndex: 5,
        }}
      >
        ADC
      </div>

      <ArchWires />

      <div
        style={{
          display: 'flex',
          width: 1180,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 20px',
          position: 'absolute',
          bottom: 30,
          left: 55,
          background: 'linear-gradient(180deg, rgba(218,218,218,0.08) 0%, rgba(206,206,206,0.05) 100%)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.08)',
          zIndex: 5,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 13,
            fontFamily: "'Zilla Slab',serif",
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          Camera → Pi Zero → UART → Pi Pico → PWM → Motors → Encoders → PID ↻
        </div>
      </div>
    </div>
  );
}
