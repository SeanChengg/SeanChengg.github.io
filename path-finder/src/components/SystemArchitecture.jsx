import SectionHeading from './SectionHeading';
import SystemArchitectureDiagram from './SystemArchitectureDiagram';
import { SYSTEM_ARCHITECTURE_TOP, SYSTEM_ARCHITECTURE_HEIGHT, SECTION_BODY_TOP } from '../pageLayout';

export default function SystemArchitecture() {
  return (
    <div id="system-architecture" style={{ width: 1919, height: SYSTEM_ARCHITECTURE_HEIGHT, left: 0.75, top: SYSTEM_ARCHITECTURE_TOP, position: 'absolute' }}>
      <SectionHeading>System Architecture</SectionHeading>
      <div
        style={{
          width: 1284,
          left: 460,
          top: SECTION_BODY_TOP,
          position: 'absolute',
          zIndex: 2,
          minHeight: 270,
          textAlign: 'justify',
          color: 'black',
          fontSize: 30,
          fontFamily: "'Zilla Slab',serif",
          fontWeight: 400,
          lineHeight: '45px',
          letterSpacing: '0.6px',
        }}
      >
        Path Finder splits its brain in two. A Raspberry Pi Zero handles computer vision — capturing images through an ArduCAM module, detecting the line, and computing its position on a 0-to-20 scale. A Raspberry Pi Pico handles real-time motor control — receiving the line position over UART serial at 115,200 baud, running a PID algorithm, and driving two DC motors via PWM. This separation lets each processor focus on what it does best: the Zero handles computationally heavy image processing in Python, while the Pico delivers deterministic, bare-metal C execution with no OS overhead.
      </div>

      <SystemArchitectureDiagram />
    </div>
  );
}
