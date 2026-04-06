import { useState, useEffect, useRef } from 'react';
import { withBase } from '../publicUrl';
import SectionHeading from './SectionHeading';
import PixelBlocksBg from './PixelBlocksBg';
import { LINE_DETECTION_TOP, LINE_DETECTION_HEIGHT, SECTION_BODY_TOP, SECTION_SHELL_WIDTH } from '../pageLayout';

/* ── SVG icons for each pipeline stage ── */

function IconCapture() {
  return (
    <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="8" width="28" height="28" rx="4" stroke="#555" strokeWidth="1.8" fill="none" />
      <circle cx="22" cy="22" r="7" stroke="#555" strokeWidth="1.6" fill="none" />
      <circle cx="22" cy="22" r="3" fill="#888" />
      <rect x="17" y="6" width="10" height="4" rx="1.5" fill="#888" />
      <line x1="15" y1="8" x2="15" y2="36" stroke="#bbb" strokeWidth="0.5" />
      <line x1="22" y1="8" x2="22" y2="36" stroke="#bbb" strokeWidth="0.5" />
      <line x1="29" y1="8" x2="29" y2="36" stroke="#bbb" strokeWidth="0.5" />
      <line x1="8" y1="15" x2="36" y2="15" stroke="#bbb" strokeWidth="0.5" />
      <line x1="8" y1="22" x2="36" y2="22" stroke="#bbb" strokeWidth="0.5" />
      <line x1="8" y1="29" x2="36" y2="29" stroke="#bbb" strokeWidth="0.5" />
    </svg>
  );
}

function IconGrayscale() {
  return (
    <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="gs-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#222" />
          <stop offset="100%" stopColor="#eee" />
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="32" height="12" rx="3" fill="url(#gs-grad)" />
      <line x1="22" y1="8" x2="22" y2="24" stroke="#c44" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="6" y="28" width="14" height="8" rx="2" fill="#222" />
      <rect x="24" y="28" width="14" height="8" rx="2" fill="#eee" stroke="#ccc" strokeWidth="0.5" />
      <text x="13" y="34" textAnchor="middle" fill="#fff" fontSize="6" fontFamily="Arial" fontWeight="700">0</text>
      <text x="31" y="34" textAnchor="middle" fill="#333" fontSize="6" fontFamily="Arial" fontWeight="700">255</text>
    </svg>
  );
}

function IconSlidingWindow() {
  return (
    <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="6" width="28" height="32" rx="3" stroke="#888" strokeWidth="1.2" fill="none" />
      <path d="M20 38 Q18 28, 22 22 Q26 16, 24 6" stroke="#aaa" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="12" y="28" width="20" height="7" rx="1.5" stroke="#d4a017" strokeWidth="1.4" fill="rgba(235,216,122,0.15)" />
      <rect x="13" y="19" width="18" height="7" rx="1.5" stroke="#d4a017" strokeWidth="1.2" fill="rgba(235,216,122,0.10)" />
      <rect x="15" y="10" width="16" height="7" rx="1.5" stroke="#d4a017" strokeWidth="1.0" fill="rgba(235,216,122,0.06)" />
      <path d="M38 32 L38 12" stroke="#999" strokeWidth="1.2" />
      <path d="M36 14 L38 10 L40 14" stroke="#999" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function IconPosition() {
  return (
    <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
      <rect x="4" y="18" width="36" height="8" rx="4" fill="rgba(0,0,0,0.06)" stroke="#bbb" strokeWidth="0.8" />
      <line x1="7" y1="27" x2="7" y2="31" stroke="#999" strokeWidth="1" />
      <line x1="22" y1="27" x2="22" y2="31" stroke="#999" strokeWidth="1" />
      <line x1="37" y1="27" x2="37" y2="31" stroke="#999" strokeWidth="1" />
      <text x="7" y="37" textAnchor="middle" fill="#888" fontSize="7" fontFamily="Arial">0</text>
      <text x="22" y="37" textAnchor="middle" fill="#888" fontSize="7" fontFamily="Arial">10</text>
      <text x="37" y="37" textAnchor="middle" fill="#888" fontSize="7" fontFamily="Arial">20</text>
      <circle cx="15" cy="22" r="4" fill="rgba(235,216,122,0.9)" stroke="#c9a800" strokeWidth="1" />
      <path d="M15 14 L15 17" stroke="#c9a800" strokeWidth="1.5" />
      <path d="M13 15.5 L15 12 L17 15.5" stroke="#c9a800" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function IconUart() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 48" fill="none">
      <text x="16" y="8" textAnchor="middle" fill="#aaa" fontSize="5" fontFamily="Arial">115200</text>
      <polyline points="2,24 5,24 6,14 8,14 9,24 11,24 12,34 14,34 15,24 18,24 19,14 21,14 22,24 25,24" stroke="#555" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M27 24 L37 24" stroke="#999" strokeWidth="1.4" />
      <path d="M35 21 L39 24 L35 27" stroke="#999" strokeWidth="1.2" fill="none" />
      <rect x="43" y="18" width="18" height="12" rx="3" fill="#eee" stroke="#999" strokeWidth="0.8" />
      <text x="52" y="26" textAnchor="middle" fill="#555" fontSize="6" fontFamily="Arial" fontWeight="700">PICO</text>
    </svg>
  );
}

const STEP_ICONS = [IconCapture, IconGrayscale, IconSlidingWindow, IconPosition, IconUart];

function TireTrackArches() {
  const cW = 1284, cardW = 220, gapPx = 16, numCards = 5;
  const archScale = 1.12;
  const stretchX = 1.14;
  const rowW = numCards * cardW + (numCards - 1) * gapPx;
  const mL = (cW - rowW) / 2;
  const cx = [];
  for (let i = 0; i < numCards; i++) cx.push(mL + i * (cardW + gapPx) + cardW / 2);
  const midY = cardW / 2;
  return (
    <>
      {[0, 1, 2, 3].map(i => {
        const span = cx[i + 1] - cx[i];
        const base = span * archScale;
        const archH = base;
        const archW = base * stretchX;
        const centerX = (cx[i] + cx[i + 1]) / 2;
        const left = centerX - archW / 2;
        const flipped = i % 2 === 1;
        return (
          <img
            key={`arch-${i}`}
            src={withBase('images/path_finder/tire_arch.png')}
            alt=""
            style={{
              position: 'absolute',
              left,
              top: flipped ? midY : midY - archH,
              width: archW,
              height: archH,
              opacity: 0.16,
              pointerEvents: 'none',
              transform: flipped ? 'scaleY(-1)' : 'none',
              zIndex: 0,
            }}
          />
        );
      })}
    </>
  );
}


const STEPS = [
  {
    label: 'Capture 32\u00d732\nframe',
    title: 'ArduCAM OV2640 \u2014 Raw Capture',
    body: 'A downward-facing ArduCAM captures a 32\u00d732-pixel colour snapshot of the track each cycle. Below is what the camera actually sees \u2014 the purple runway with a white guide strip the robot must follow.',
    image: 'colored.jpg',
    imageCaption: 'Purple runway with white guide line \u2014 actual ArduCAM output',
    imageAlt: 'Colour capture of white line on purple track',
    detail: '32\u00d732 px \u00b7 3 channels (RGB) \u00b7 ~3 KB per frame',
  },
  {
    label: 'Grayscale +\nThreshold',
    title: 'Grayscale Conversion + Binarisation',
    body: 'RGB becomes one brightness per pixel: 8-bit intensity from 0 (black) to 255 (white). The threshold 150 is the cutoff on that 0\u2013255 scale: pixels brighter than 150 become white, 150 or below become black. The purple floor reads darker than the white strip, so after thresholding the line stays bright and the floor drops out.',
    image: 'grayscale_capture.jpg',
    imageCaption: 'After grayscale + threshold \u2014 line isolated from floor',
    imageAlt: 'Grayscale capture showing white line on dark background',
    detail: 'Brightness > 150 \u2192 white (255). Brightness \u2264 150 \u2192 black (0).',
    codeSnippet: "image.convert('L')  # grayscale\nbinary = (arr > 150).astype(uint8)",
  },
  {
    label: 'Sliding Window\nSearch',
    title: 'Sliding Window Histogram Search',
    body: 'Take the bottom half of the 32\u00d732 binary image (16 rows). For each of the 32 columns, count white pixels \u2014 the tallest bar is where the line sits. Then a search box starts at that column at the bottom and slides upward through the image, re-centring on white pixels each step. This traces the line from bottom to top, even through curves.',
    codeSnippet: 'histogram = np.sum(bottom_half, axis=0)\nleftx_base = np.argmax(histogram[:mid])',
    visual: 'slidingWindow',
  },
  {
    label: 'line_position\n(0\u201320)',
    title: 'Position Mapping \u2014 0 to 20 Scale',
    body: 'After detection, the line\u2019s horizontal centre sits somewhere across the 32-pixel-wide frame \u2014 that raw column value is called line_center (range 0\u201331). To make steering simpler, we squeeze it onto a 0\u201320 scale: divide by 32 (the frame width) to get a 0\u20131 fraction, then multiply by 20. The result is line_position: 0 = far left, 10 = dead centre, 20 = far right. The Pico\u2019s PID loop compares line_position to 10 every cycle and adjusts the wheel motors to steer back toward centre.',
    codeSnippet: 'line_position = int((line_center / 32) \u00d7 20)\n\n# line_center  \u2014 raw column of the line (0\u201331)\n# 32           \u2014 frame width in pixels\n# 20           \u2014 target scale range\n# line_position \u2014 integer sent to Pico (0\u201320)',
    visual: 'scale',
  },
  {
    label: 'UART TX\nto Pico',
    title: 'UART Serial Transmission',
    body: 'The previous step produced a single integer \u2014 line_position, a number from 0 to 20 (e.g. "12"). The Pi Zero sends that number to the Pico over a two-wire serial link called UART. It travels as plain text: the digits "1", "2", then a newline character so the Pico knows the value is complete. The entire send takes about 0.26 milliseconds \u2014 essentially instant.\n\nOn the Pico side, an interrupt fires the moment a full line of text arrives. It reads the number, stores it in a variable called line_position, and the PID motor-control loop (next section) picks it up on its very next cycle. So the flow is: camera \u2192 image processing \u2192 position number \u2192 UART wire \u2192 Pico \u2192 PID steering.',
    detail: 'Example: line is slightly right of centre \u2192 line_position = 12 \u2192 Pi sends "12\\n" over UART \u2192 Pico receives 12 \u2192 PID sees error = 12 \u2212 10 = +2 \u2192 steers left to correct.',
    codeSnippet: 'zeroToPico.send_message(line_position)\n# e.g. sends "12\\n" over UART\n# Pico interrupt reads 12 → PID loop steers',
  },
];

/* ── Inline visuals for expanded cards ── */

function SlidingWindowVisual() {
  const [scanStep, setScanStep] = useState(-1);
  const gridSize = 32;
  const cell = 7;
  const pad = { l: 34, t: 12, r: 50, b: 8 };
  const gridPx = gridSize * cell;
  const svgW = pad.l + gridPx + pad.r;
  const svgH = pad.t + gridPx + pad.b;

  const lineCol = (row) => 16 + 5 * Math.sin((row / 31) * Math.PI * 1.2);

  const pixels = [];
  for (let r = 0; r < gridSize; r++) {
    const center = lineCol(r);
    const row = [];
    for (let c = 0; c < gridSize; c++) {
      row.push(Math.abs(c - center) <= 1.6 ? 1 : 0);
    }
    pixels.push(row);
  }

  const winH = 6;
  const winW = 12;
  const numWins = 5;
  const scans = [];
  for (let i = 0; i < numWins; i++) {
    const centerRow = 31 - i * 6 - 3;
    const cx = Math.round(lineCol(centerRow));
    scans.push({
      row: Math.max(0, Math.round(centerRow - winH / 2)),
      col: Math.max(0, Math.min(gridSize - winW, cx - Math.floor(winW / 2))),
    });
  }

  const histCols = [];
  for (let c = 0; c < gridSize; c++) {
    let count = 0;
    for (let r = 16; r < 32; r++) count += pixels[r][c];
    histCols.push(count);
  }
  const histMax = Math.max(...histCols, 1);

  useEffect(() => {
    let step = -1;
    const id = setInterval(() => {
      step = step >= numWins ? -1 : step + 1;
      setScanStep(step);
    }, 900);
    return () => clearInterval(id);
  }, []);

  const barH = 48;

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#444', fontFamily: 'Arial', marginBottom: 6 }}>
        What the robot sees — 32×32 binary frame
      </div>
      <div style={{ fontSize: 13, color: '#666', fontFamily: "'Zilla Slab', serif", marginBottom: 10, lineHeight: 1.45 }}>
        Each square is one pixel. White = above threshold, black = below. The scan windows slide from bottom (row 31, closest to wheels) upward, re-centering on the white line at each step.
      </div>

      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: 'block', maxWidth: 420 }}>
        <rect x={pad.l} y={pad.t} width={gridPx} height={gridPx} rx={4} fill="#0d0d1a" />

        {pixels.map((row, r) =>
          row.map((v, c) =>
            v === 1 ? (
              <rect
                key={`${r}-${c}`}
                x={pad.l + c * cell + 0.5}
                y={pad.t + r * cell + 0.5}
                width={cell - 1}
                height={cell - 1}
                fill="rgba(255,255,255,0.92)"
                rx={1}
              />
            ) : null
          )
        )}

        <line
          x1={pad.l} y1={pad.t + 16 * cell}
          x2={pad.l + gridPx} y2={pad.t + 16 * cell}
          stroke="rgba(212,160,23,0.35)" strokeWidth={0.8} strokeDasharray="4 3"
        />

        {scans.map((s, i) => {
          if (i >= scanStep) return null;
          const active = i === scanStep - 1;
          return (
            <g key={i}>
              <rect
                x={pad.l + s.col * cell - 1}
                y={pad.t + s.row * cell - 1}
                width={winW * cell + 2}
                height={winH * cell + 2}
                rx={3}
                fill={active ? 'rgba(212,160,23,0.22)' : 'rgba(212,160,23,0.06)'}
                stroke={active ? '#d4a017' : 'rgba(212,160,23,0.35)'}
                strokeWidth={active ? 2.2 : 1}
              />
              <text
                x={pad.l + (s.col + winW) * cell + 5}
                y={pad.t + s.row * cell + winH * cell / 2 + 3}
                fontSize={9} fill={active ? '#d4a017' : 'rgba(212,160,23,0.5)'}
                fontFamily="Arial" fontWeight={600}
              >
                scan {i + 1}
              </text>
            </g>
          );
        })}

        <text x={pad.l - 3} y={pad.t + 7} textAnchor="end" fontSize={8} fill="#777" fontFamily="Arial">0</text>
        <text x={pad.l - 3} y={pad.t + 16 * cell + 4} textAnchor="end" fontSize={8} fill="#777" fontFamily="Arial">16</text>
        <text x={pad.l - 3} y={pad.t + 31 * cell + 7} textAnchor="end" fontSize={8} fill="#777" fontFamily="Arial">31</text>

        <line
          x1={svgW - 18} y1={pad.t + gridPx - 8}
          x2={svgW - 18} y2={pad.t + 14}
          stroke="#888" strokeWidth={1.1}
        />
        <path d={`M${svgW - 21} ${pad.t + 19} L${svgW - 18} ${pad.t + 10} L${svgW - 15} ${pad.t + 19}`} stroke="#888" strokeWidth={1.1} fill="none" />
        <text
          x={svgW - 10}
          y={pad.t + gridPx / 2}
          fontSize={8.5} fill="#888" fontFamily="Arial"
          transform={`rotate(-90 ${svgW - 10} ${pad.t + gridPx / 2})`}
        >scan direction</text>
      </svg>

      <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: '#444', fontFamily: 'Arial', marginBottom: 4 }}>
        Bottom-half histogram (columns 0–31)
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: barH, borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: 4 }}>
        {histCols.map((v, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 0,
            height: Math.max(1, (v / histMax) * barH),
            background: v > 3 ? 'rgba(212,160,23,0.75)' : 'rgba(140,140,140,0.15)',
            borderRadius: '2px 2px 0 0',
            margin: '0 0.5px',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#999', fontFamily: 'Arial' }}>
        <span>col 0</span><span>col 15</span><span>col 31</span>
      </div>
    </div>
  );
}

function ScaleVisual() {
  const ticks = [0, 5, 10, 15, 20];
  const [t, setT] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      setT((ts - start) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const roadW = 220;
  const roadH = 300;
  const roadX = 20;
  const roadY = 10;
  const cx = roadX + roadW / 2;
  const speed = 50;
  const scrollY = (t * speed) % roadH;

  const lineFn = (y) => cx + 38 * Math.sin((y + t * speed) * 0.018);

  const vehicleY = roadY + roadH * 0.62;
  const lineAtVehicle = lineFn(vehicleY);
  const lineOffset = lineAtVehicle - cx;
  const linePos = Math.round(((lineAtVehicle - roadX) / roadW) * 20);
  const clampedPos = Math.max(0, Math.min(20, linePos));
  const pct = (clampedPos / 20) * 100;

  const slope = lineFn(vehicleY - 3) - lineFn(vehicleY + 3);
  const steerAngle = Math.max(-30, Math.min(30, slope * 2.5));

  let linePath = '';
  for (let py = -roadH; py <= roadH * 2; py += 3) {
    linePath += (py === -roadH ? 'M' : 'L') + `${lineFn(py)},${py} `;
  }

  const bodyW = 40;
  const bodyH = 64;
  const wheelR = 20;
  const wheelW = 10;

  const label = clampedPos < 9 ? 'steer right' : clampedPos > 11 ? 'steer left' : 'centred';

  return (
    <div style={{ padding: '10px 0 6px' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#555', fontFamily: 'Arial', marginBottom: 8 }}>
        line_position = {clampedPos} → {label}
      </div>
      <div style={{ position: 'relative', height: 28, background: 'rgba(0,0,0,0.05)', borderRadius: 14, overflow: 'hidden', marginBottom: 2 }}>
        <div style={{
          position: 'absolute', left: `${pct}%`, top: 0, bottom: 0, width: 6,
          background: 'rgba(212,160,23,0.9)', borderRadius: 3,
          transform: 'translateX(-50%)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, marginBottom: 10 }}>
        {ticks.map(tk => (
          <span key={tk} style={{ fontSize: 11, color: 'rgba(40,40,40,0.5)', fontFamily: 'Arial', fontWeight: tk === 10 ? 700 : 400 }}>
            {tk === 0 ? '0 (left)' : tk === 10 ? '10 (centre)' : tk === 20 ? '20 (right)' : tk}
          </span>
        ))}
      </div>

      <svg width="100%" viewBox={`0 0 260 ${roadH + 20}`} style={{ display: 'block', maxWidth: 380, borderRadius: 10, background: 'rgba(0,0,0,0.02)' }}>
        <defs>
          <clipPath id="road-clip"><rect x={roadX} y={roadY} width={roadW} height={roadH} rx={10} /></clipPath>
          <linearGradient id="road-g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9b8de" />
            <stop offset="100%" stopColor="#b8a4d0" />
          </linearGradient>
        </defs>

        <rect x={roadX} y={roadY} width={roadW} height={roadH} rx={10} fill="url(#road-g2)" />

        <g clipPath="url(#road-clip)">
          {[0, 1, 2, 3, 4, 5, 6].map(i => {
            const dashY = roadY + ((i * 50 + scrollY) % (roadH + 50)) - 50;
            return (
              <rect key={i} x={roadX + 8} y={dashY} width={3} height={22} rx={1.5}
                fill="rgba(255,255,255,0.18)" />
            );
          })}
          {[0, 1, 2, 3, 4, 5, 6].map(i => {
            const dashY = roadY + ((i * 50 + scrollY) % (roadH + 50)) - 50;
            return (
              <rect key={i} x={roadX + roadW - 11} y={dashY} width={3} height={22} rx={1.5}
                fill="rgba(255,255,255,0.18)" />
            );
          })}

          <path d={linePath} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <path d={linePath} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />

          <g transform={`translate(${lineAtVehicle}, ${vehicleY}) rotate(${steerAngle * 0.95})`}>
            <rect x={-bodyW / 2} y={-bodyH / 2} width={bodyW} height={bodyH} rx={8}
              fill="rgba(50,50,55,0.18)" stroke="rgba(80,80,80,0.5)" strokeWidth={1.2} />

            <g transform={`translate(${-bodyW / 2 - wheelW / 2 - 1}, 0) rotate(${steerAngle * 0.65})`}>
              <rect x={-wheelW / 2} y={-wheelR} width={wheelW} height={wheelR * 2} rx={3.5}
                fill="#d4a017" stroke="#b8900f" strokeWidth={1.2} />
            </g>
            <g transform={`translate(${bodyW / 2 + wheelW / 2 + 1}, 0) rotate(${steerAngle * 0.65})`}>
              <rect x={-wheelW / 2} y={-wheelR} width={wheelW} height={wheelR * 2} rx={3.5}
                fill="#d4a017" stroke="#b8900f" strokeWidth={1.2} />
            </g>

            <circle cx={0} cy={0} r={2.5} fill="rgba(100,100,100,0.3)" />
          </g>
        </g>
      </svg>
      <div style={{ fontSize: 11.5, color: '#888', fontFamily: "'Zilla Slab', serif", marginTop: 6, lineHeight: 1.4 }}>
        When line_position {'<'} 10 the line is left of centre — PID speeds up the left motor to steer right, back toward the line. When {'>'} 10, the opposite. At 10, both motors run equally.
      </div>
    </div>
  );
}

/* ── Card component ── */

function PipelineCard({ step, index, isActive, onHover, onLeave }) {
  const hasImage = !!step.image;
  const cls = 'pf-ld-card'
    + (isActive ? ' pf-ld-card--active' : '')
    + (isActive && hasImage ? ' pf-ld-card--active-has-image' : '');

  const Icon = STEP_ICONS[index];

  return (
    <div
      className={cls}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <PixelBlocksBg maxBlocks={isActive ? 16 : 8} style={{ opacity: isActive ? 0.55 : 0.65 }} />
      <div className="pf-liquid-glass pf-liquid-glass--diagram" style={{ borderRadius: 'inherit' }} />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: isActive ? '24px 30px 20px' : '18px 14px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        <div style={{
          textAlign: 'center',
          display: isActive ? 'block' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: isActive ? 'auto' : '100%',
          gap: 8,
        }}>
          {!isActive && <Icon />}
          <div style={{
            fontSize: isActive ? 20 : 17,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            color: '#1a1a1a',
            whiteSpace: 'pre-line',
            lineHeight: 1.3,
            marginBottom: isActive ? 14 : 0,
            textAlign: isActive ? 'left' : 'center',
          }}>
            {isActive ? step.title : step.label}
          </div>
        </div>

        <div className="pf-ld-detail" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
          {hasImage && (
            <div style={{
              marginBottom: 10,
              borderRadius: 10,
              background: 'rgba(0,0,0,0.04)',
              textAlign: 'center',
              padding: '6px 0',
            }}>
              <img
                src={withBase(`images/path_finder/${step.image}`)}
                alt={step.imageAlt || ''}
                style={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 8,
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />
              {step.imageCaption && (
                <div style={{
                  fontSize: 12.5, fontStyle: 'italic', color: 'rgba(60,60,60,0.6)',
                  fontFamily: 'Arial', marginTop: 5, textAlign: 'center',
                }}>
                  {step.imageCaption}
                </div>
              )}
            </div>
          )}

          <div style={{
            fontSize: 15.5, fontFamily: "'Zilla Slab', serif", fontWeight: 400,
            color: '#2a2a2a', lineHeight: 1.6, marginBottom: 12,
          }}>
            {step.body}
          </div>

          {step.visual === 'slidingWindow' && <SlidingWindowVisual />}
          {step.visual === 'scale' && <ScaleVisual />}

          {step.codeSnippet && (
            <pre style={{
              background: 'rgba(25,25,25,0.06)', borderRadius: 8, padding: '12px 16px',
              fontSize: 13.5, fontFamily: "'SF Mono', Menlo, monospace", color: '#333',
              overflowX: 'auto', marginBottom: 10, whiteSpace: 'pre-wrap', lineHeight: 1.55,
            }}>
              {step.codeSnippet}
            </pre>
          )}

          {step.detail && (
            <div style={{
              fontSize: 13.5, fontFamily: 'Arial', fontWeight: 600,
              color: 'rgba(40,40,40,0.5)', letterSpacing: 0.3,
              whiteSpace: 'pre-line',
            }}>
              {step.detail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */

const SIDEBAR_Z_BASE = '1000';
const SIDEBAR_Z_WHILE_CARD_EXPANDED = '0';

export default function LineDetection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sb = document.getElementById('sidebar-nav');
    if (!sb) return;
    sb.style.zIndex = active !== null ? SIDEBAR_Z_WHILE_CARD_EXPANDED : SIDEBAR_Z_BASE;
    return () => {
      sb.style.zIndex = SIDEBAR_Z_BASE;
    };
  }, [active]);

  return (
    <div id="line-detection" style={{ width: SECTION_SHELL_WIDTH, height: LINE_DETECTION_HEIGHT, left: 0.75, top: LINE_DETECTION_TOP, position: 'absolute', overflow: 'hidden', zIndex: 3 }}>

      <SectionHeading>Line Detection</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: SECTION_BODY_TOP, position: 'absolute', zIndex: 2,
        minHeight: 360,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        {`The Pi Zero\u2019s camera module captures a downward-facing 32\u00d732 grayscale image of the track surface. A Python script processes each frame: applying a binary threshold at intensity 150 to isolate the dark line from the light background, then using a sliding-window histogram search on the bottom half of the image to locate left and right lane boundaries. The centroid of these boundaries maps to a position on a 0-to-20 integer scale \u2014 0 meaning the line is at the far left, 20 at the far right, and 10 dead center. The position transmits as a simple ASCII string over UART \u2014 for example, \u201c12\\n\u201d \u2014 taking roughly 260 microseconds. The Pico\u2019s interrupt handler catches each incoming value and updates the global line_position variable in real time.`}
      </div>

      <div style={{
        left: 460, top: 748, position: 'absolute',
        width: 1284,
        zIndex: 2,
      }}>
        <TireTrackArches />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {STEPS.map((step, i) => (
            <PipelineCard
              key={i}
              step={step}
              index={i}
              isActive={active === i}
              onHover={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
