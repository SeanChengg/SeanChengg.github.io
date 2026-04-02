import { useState } from 'react';
import { withBase } from '../publicUrl';
import SectionHeading from './SectionHeading';
import PixelBlocksBg from './PixelBlocksBg';
import { LINE_DETECTION_TOP, LINE_DETECTION_HEIGHT, SECTION_BODY_TOP } from '../pageLayout';

/* ── SVG icons for each pipeline stage ── */

function IconCapture() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="8" width="28" height="28" rx="4" stroke="#555" strokeWidth="1.8" fill="none" />
      <circle cx="22" cy="22" r="7" stroke="#555" strokeWidth="1.6" fill="none" />
      <circle cx="22" cy="22" r="3" fill="#888" />
      <rect x="17" y="6" width="10" height="4" rx="1.5" fill="#888" />
      {/* 32×32 grid hint */}
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
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="gs-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#222" />
          <stop offset="100%" stopColor="#eee" />
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="32" height="12" rx="3" fill="url(#gs-grad)" />
      {/* threshold line */}
      <line x1="22" y1="8" x2="22" y2="24" stroke="#c44" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* binary output */}
      <rect x="6" y="28" width="14" height="8" rx="2" fill="#222" />
      <rect x="24" y="28" width="14" height="8" rx="2" fill="#eee" stroke="#ccc" strokeWidth="0.5" />
      <text x="13" y="34" textAnchor="middle" fill="#fff" fontSize="6" fontFamily="Arial" fontWeight="700">0</text>
      <text x="31" y="34" textAnchor="middle" fill="#333" fontSize="6" fontFamily="Arial" fontWeight="700">255</text>
    </svg>
  );
}

function IconSlidingWindow() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* image frame */}
      <rect x="8" y="6" width="28" height="32" rx="3" stroke="#888" strokeWidth="1.2" fill="none" />
      {/* white line through image */}
      <path d="M20 38 Q18 28, 22 22 Q26 16, 24 6" stroke="#aaa" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* scanning windows bottom-to-top */}
      <rect x="12" y="28" width="20" height="7" rx="1.5" stroke="#d4a017" strokeWidth="1.4" fill="rgba(235,216,122,0.15)" />
      <rect x="13" y="19" width="18" height="7" rx="1.5" stroke="#d4a017" strokeWidth="1.2" fill="rgba(235,216,122,0.10)" />
      <rect x="15" y="10" width="16" height="7" rx="1.5" stroke="#d4a017" strokeWidth="1.0" fill="rgba(235,216,122,0.06)" />
      {/* upward arrow */}
      <path d="M38 32 L38 12" stroke="#999" strokeWidth="1.2" />
      <path d="M36 14 L38 10 L40 14" stroke="#999" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function IconPosition() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* ruler bar */}
      <rect x="4" y="18" width="36" height="8" rx="4" fill="rgba(0,0,0,0.06)" stroke="#bbb" strokeWidth="0.8" />
      {/* ticks */}
      <line x1="7" y1="27" x2="7" y2="31" stroke="#999" strokeWidth="1" />
      <line x1="22" y1="27" x2="22" y2="31" stroke="#999" strokeWidth="1" />
      <line x1="37" y1="27" x2="37" y2="31" stroke="#999" strokeWidth="1" />
      <text x="7" y="37" textAnchor="middle" fill="#888" fontSize="7" fontFamily="Arial">0</text>
      <text x="22" y="37" textAnchor="middle" fill="#888" fontSize="7" fontFamily="Arial">10</text>
      <text x="37" y="37" textAnchor="middle" fill="#888" fontSize="7" fontFamily="Arial">20</text>
      {/* position marker */}
      <circle cx="15" cy="22" r="4" fill="rgba(235,216,122,0.9)" stroke="#c9a800" strokeWidth="1" />
      <path d="M15 14 L15 17" stroke="#c9a800" strokeWidth="1.5" />
      <path d="M13 15.5 L15 12 L17 15.5" stroke="#c9a800" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function IconUart() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* TX signal waveform */}
      <polyline points="4,22 8,22 9,12 11,12 12,22 14,22 15,32 17,32 18,22 22,22 23,12 25,12 26,22 28,22" stroke="#555" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      {/* arrow to chip */}
      <path d="M30 22 L38 22" stroke="#999" strokeWidth="1.4" />
      <path d="M36 20 L39 22 L36 24" stroke="#999" strokeWidth="1.2" fill="none" />
      {/* pico chip */}
      <rect x="32" y="30" width="10" height="8" rx="2" fill="#ddd" stroke="#999" strokeWidth="0.8" />
      <text x="37" y="36" textAnchor="middle" fill="#666" fontSize="5" fontFamily="Arial" fontWeight="700">PICO</text>
      {/* baud label */}
      <text x="16" y="9" textAnchor="middle" fill="#aaa" fontSize="5.5" fontFamily="Arial">115200</text>
    </svg>
  );
}

const STEP_ICONS = [IconCapture, IconGrayscale, IconSlidingWindow, IconPosition, IconUart];

const STEPS = [
  {
    label: 'Capture 32×32\nframe',
    title: 'ArduCAM OV2640 — Raw Capture',
    body: 'The downward-facing ArduCAM module captures a tiny 32×32-pixel colour image of the track surface at each processing cycle. Even at this low resolution the white line is clearly visible against the purple runway.',
    image: 'colored.jpg',
    imageAlt: 'Colour capture of white line on purple track',
    detail: '32×32 px · 3 channels (RGB) · ~3 KB per frame',
  },
  {
    label: 'Grayscale +\nThreshold',
    title: 'Grayscale Conversion + Binarisation',
    body: 'First, the RGB image is converted to single-channel grayscale (0–255 brightness). Then a binary threshold at intensity 150 turns every pixel into pure black (floor) or pure white (line). This eliminates colour noise and reduces processing to simple binary math.',
    image: 'grayscale_capture.jpg',
    imageAlt: 'Grayscale capture showing white line on dark background',
    detail: 'pixel > 150 → white (255)  •  pixel ≤ 150 → black (0)',
    codeSnippet: "image.convert('L')  # grayscale\nbinary = (arr > 150).astype(uint8)",
  },
  {
    label: 'Sliding Window\nSearch',
    title: 'Sliding Window Histogram Search',
    body: 'Starting from the bottom of the binary image (closest to the robot), a histogram counts white pixels per column to find the line\'s base position. Rectangular search windows then scan upward — each window re-centres on the densest cluster of white pixels, tracing the line from bottom to top even through curves.',
    detail: 'window height = 20 px · margin = ±25 px · min pixels = 50',
    codeSnippet: 'histogram = np.sum(bottom_half, axis=0)\nleftx_base = np.argmax(histogram[:mid])',
    visual: 'histogram',
  },
  {
    label: 'line_position\n(0–20)',
    title: 'Position Mapping — 0 to 20 Scale',
    body: 'The average column index of the detected line is scaled to a 0–20 integer: 0 = line at the far left, 10 = centred, 20 = far right. This compact value is all the Pico\'s PID controller needs to calculate steering corrections.',
    detail: 'line_position = int((line_center / 32) × 20)',
    visual: 'scale',
  },
  {
    label: 'UART TX\nto Pico',
    title: 'UART Serial Transmission',
    body: 'The position integer is sent as a simple ASCII string (e.g. "12\\n") over UART at 115 200 baud — taking roughly 260 µs. The Pico\'s interrupt handler catches each value and updates the global line_position variable that the PID loop reads every cycle.',
    detail: '115 200 baud · ~260 µs per value · ASCII + newline',
    codeSnippet: 'zeroToPico.send_message(line_position)',
  },
];

/* ── Inline visuals for expanded cards ── */

function HistogramVisual() {
  const cols = [0, 0, 1, 2, 5, 9, 8, 7, 9, 8, 3, 1, 0, 0, 0, 0];
  const max = Math.max(...cols);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 58, padding: '8px 0' }}>
      {cols.map((v, i) => (
        <div key={i} style={{
          width: 16, height: Math.max(3, (v / max) * 50),
          background: v > 4 ? 'rgba(235, 216, 122, 0.85)' : 'rgba(100,100,100,0.25)',
          borderRadius: 2,
        }} />
      ))}
      <div style={{ marginLeft: 10, fontSize: 12, color: 'rgba(40,40,40,0.55)', fontFamily: 'Arial', alignSelf: 'center' }}>
        ← peak = line position
      </div>
    </div>
  );
}

function ScaleVisual() {
  const ticks = [0, 5, 10, 15, 20];
  return (
    <div style={{ padding: '8px 0 4px' }}>
      <div style={{ position: 'relative', height: 26, background: 'rgba(0,0,0,0.05)', borderRadius: 13, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: '35%', top: 0, bottom: 0, width: 5,
          background: 'rgba(235, 216, 122, 0.9)', borderRadius: 2,
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {ticks.map(t => (
          <span key={t} style={{ fontSize: 11, color: 'rgba(40,40,40,0.5)', fontFamily: 'Arial' }}>
            {t === 0 ? '0 (left)' : t === 10 ? '10 (center)' : t === 20 ? '20 (right)' : t}
          </span>
        ))}
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
        padding: isActive ? '22px 28px' : '14px 16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        {/* Collapsed: icon + label stacked | Expanded: title */}
        <div style={{
          textAlign: 'center',
          display: isActive ? 'block' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: isActive ? 'auto' : '100%',
          gap: 6,
        }}>
          {!isActive && <Icon />}
          <div style={{
            fontSize: isActive ? 18 : 15,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            color: '#1a1a1a',
            whiteSpace: 'pre-line',
            lineHeight: 1.3,
            marginBottom: isActive ? 12 : 0,
            textAlign: isActive ? 'left' : 'center',
          }}>
            {isActive ? step.title : step.label}
          </div>
        </div>

        {/* Expanded detail area */}
        <div className="pf-ld-detail" style={{ flex: 1, overflow: 'hidden' }}>
          {hasImage && (
            <img
              src={withBase(`images/path_finder/${step.image}`)}
              alt={step.imageAlt || ''}
              style={{
                width: '100%', objectFit: 'contain',
                borderRadius: 10, marginBottom: 12,
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          )}

          <div style={{
            fontSize: 14.5, fontFamily: "'Zilla Slab', serif", fontWeight: 400,
            color: '#2a2a2a', lineHeight: 1.55, marginBottom: 10,
          }}>
            {step.body}
          </div>

          {step.visual === 'histogram' && <HistogramVisual />}
          {step.visual === 'scale' && <ScaleVisual />}

          {step.codeSnippet && (
            <pre style={{
              background: 'rgba(25,25,25,0.06)', borderRadius: 6, padding: '10px 14px',
              fontSize: 12.5, fontFamily: "'SF Mono', Menlo, monospace", color: '#333',
              overflowX: 'auto', marginBottom: 8, whiteSpace: 'pre-wrap', lineHeight: 1.5,
            }}>
              {step.codeSnippet}
            </pre>
          )}

          {step.detail && (
            <div style={{
              fontSize: 12.5, fontFamily: 'Arial', fontWeight: 600,
              color: 'rgba(40,40,40,0.5)', letterSpacing: 0.3, marginTop: 4,
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

export default function LineDetection() {
  const [active, setActive] = useState(null);

  return (
    <div id="line-detection" style={{ width: 1919, height: LINE_DETECTION_HEIGHT, left: 0.75, top: LINE_DETECTION_TOP, position: 'absolute' }}>
      <SectionHeading>Line Detection</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: SECTION_BODY_TOP, position: 'absolute', zIndex: 2,
        minHeight: 360,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        The Pi Zero's camera module captures a downward-facing 32×32 grayscale image of the track surface. A Python script processes each frame: applying a binary threshold at intensity 150 to isolate the dark line from the light background, then using a sliding-window histogram search on the bottom half of the image to locate left and right lane boundaries. The centroid of these boundaries maps to a position on a 0-to-20 integer scale — 0 meaning the line is at the far left, 20 at the far right, and 10 dead center. The position transmits as a simple ASCII string over UART — for example, "12\n" — taking roughly 260 microseconds. The Pico's interrupt handler catches each incoming value and updates the global line_position variable in real time.
      </div>

      <div style={{
        left: 460, top: 590, position: 'absolute',
        display: 'flex', alignItems: 'flex-start', gap: 0,
        width: 1284,
        justifyContent: 'center',
      }}>
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <PipelineCard
              step={step}
              index={i}
              isActive={active === i}
              onHover={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
            {i < STEPS.length - 1 && (
              <div style={{
                fontSize: 24, color: '#999', margin: '50px 10px 0',
                userSelect: 'none', fontFamily: 'Arial',
                flexShrink: 0,
              }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
