import SectionHeading from './SectionHeading';
import { LINE_DETECTION_TOP, LINE_DETECTION_HEIGHT, SECTION_BODY_TOP } from '../pageLayout';

export default function LineDetection() {
  const steps = [
    'Camera\nCapture 32×32',
    'Grayscale +\nThreshold (150)',
    'Sliding Window\nHistogram Search',
    'Centroid →\nPosition (0-20)',
    'UART TX\nto Pico'
  ];

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

      <div style={{ left: 460, top: 610, position: 'absolute', display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', maxWidth: 1289 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="pf-pipeline-step" style={{ minWidth: 140, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4, padding: '16px 14px', fontSize: 13 }}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className="pf-pipeline-arrow">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
