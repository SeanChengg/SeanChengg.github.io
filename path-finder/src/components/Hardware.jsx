import Gallery from './Gallery';
import CostTable from './CostTable';
import SectionHeading from './SectionHeading';
import { HARDWARE_TOP, HARDWARE_HEIGHT } from '../pageLayout';

export default function Hardware() {
  return (
    <div id="hardware" style={{ width: 1919, height: HARDWARE_HEIGHT, left: 0.75, top: HARDWARE_TOP, position: 'absolute' }}>
      <SectionHeading>Hardware</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: 187, position: 'absolute',
        minHeight: 270,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        The chassis houses two geared DC motors driving brass-finish wheels with decorative spoke patterns, a caster wheel at the rear for stability, and a vertical camera tower mounting the ArduCAM module at the top. The Raspberry Pi Pico sits on the main PCB at the base, connected to an H-bridge motor driver for bidirectional speed control. IR LED sensors on each wheel provide encoder feedback through the Pico's 12-bit ADC. The Raspberry Pi Zero, running headless Linux, communicates line position data to the Pico over a UART serial link.
      </div>

      <div style={{
        left: 460,
        top: 507,
        position: 'absolute',
        color: '#212121',
        fontSize: 24,
        fontFamily: 'Arial,sans-serif',
        fontWeight: 700,
        lineHeight: '28.8px'
      }}>
        Components
      </div>

      <CostTable top={545} />
      <Gallery top={995} />
    </div>
  );
}
