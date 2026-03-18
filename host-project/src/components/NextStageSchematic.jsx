import GlassWidget from './GlassWidget';
import ServoRow from './ServoRow';

const wires = [
  { left: 302, top: 807, w: 120, h: 17, src: 'Wire_USB-ESP.svg' },
  { left: 722, top: 807, w: 130, h: 17, src: 'Wire_I²C_Bus_SDA+SCL.svg' },
  { left: 1152, top: 730, w: 130, h: 6, src: 'Wire_PWM_Bus(PCA-Servos)2.svg' },
  { left: 1152, top: 810, w: 130, h: 6, src: 'Wire_PWM_Bus(PCA-Servos)3.svg' },
  { left: 1152, top: 890, w: 130, h: 6, src: 'Wire_PWM_Bus(PCA-Servos)4.svg' },
  { left: 1090, top: 652, w: 199, h: 35, src: 'Wire_PWM_Bus(PCA-Servos)1.svg' },
  { left: 1090, top: 937, w: 199, h: 35, src: 'Wire_PWM_Bus(PCA-Servos)5.svg' },
  { left: 1565, top: 652, w: 36, h: 321, src: 'Wire_6VServo_Power_Rail.svg' },
  { left: 564, top: 937, w: 17, h: 130, src: 'Wire_5VPower(PSU-ESP_V-).svg' },
  { left: 722, top: 1125, w: 130, h: 17, src: 'Wire_6V_Power(PSU-Caps).svg' },
  { left: 993, top: 937, w: 17, h: 130, src: 'Wire_6VPower(Caps_PCA_V+).svg' },
  { left: 1152, top: 1125, w: 130, h: 17, src: 'Wire_6VPower(Caps-LM).svg' },
];

const servos = [
  { top: 638, name: 'RDS3225 #1 — Jaw', channel: 'PWM Ch 0 · 25kg·cm · 270°' },
  { top: 718, name: 'RDS3225 #2 — Left Midface', channel: 'PWM Ch 1 · 25kg·cm · 270°' },
  { top: 798, name: 'RDS3225 #3 — Right Midface', channel: 'PWM Ch 2 · 25kg·cm · 270°' },
  { top: 878, name: 'RDS3225 #4 — Left Cheek', channel: 'PWM Ch 3 · 25kg·cm · 270°' },
  { top: 958, name: 'RDS3225 #5 — Right Cheek', channel: 'PWM Ch 4 · 25kg·cm · 270°' },
];

export default function NextStageSchematic() {
  return (
    <>
      {/* Title icon */}
      <div style={{ position: 'absolute', left: 515, top: 126, width: 50, height: 64, zIndex: 5 }}>
        <img src="/images/schematic/Head_YB_Vector.svg" alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>
      {/* Title text */}
      <div style={{ width: 737, height: 28, left: 571, top: 147, position: 'absolute', textAlign: 'center', color: '#fff', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '28.8px', zIndex: 5 }}>
        Next Stage - Mechatronics System-level Overview
      </div>
      {/* Description */}
      <div style={{ width: 1600, left: 112, top: 250, position: 'absolute', textAlign: 'justify', color: 'rgba(255,255,255,0.85)', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', zIndex: 5 }}>
        The block diagram maps the electronics architecture of the Panel Head — from the control interface down to the five face panel actuators. The ESP32 handles serial communication and translates commands into I²C signals for the PCA9685, which manages independent PWM output for each servo. The 6V power rail, buffered through a capacitor bank and stepped down for the logic side, ensures servos can draw peak current without destabilising the microcontroller. This is a system-level overview; the detailed connection work comes next — physically connecting the components, validating each servo channel, completing the control interface and its communication with the hardware, then installing the servos into the skull and calibrating each panel's range of motion.
      </div>

      {/* Wires */}
      {wires.map((w, i) => (
        <div key={i} className="wire-img" style={{ left: w.left, top: w.top, width: w.w, height: w.h }}>
          <img src={`/images/schematic/${w.src}`} alt="" />
        </div>
      ))}

      {/* Host PC */}
      <div className="rect-bg" style={{ left: 0, top: 689, width: 384, height: 250, opacity: 1 }}>
        <img src="/images/schematic/Host_PC_Rectangle.png" style={{ top: 0, left: 0, width: '100%', height: '100%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <GlassWidget small style={{ left: 82, top: 754, width: 220, height: 120 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 16px' }}>
          <img src="/images/schematic/PC_Icon.png" alt="" style={{ width: 25, height: 19 }} />
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 16, whiteSpace: 'nowrap' }}>HOST PC</div>
          <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666666', fontSize: 12, textAlign: 'center' }}>ElectronBotStudio<br />USB Serial / Wi-Fi</div>
        </div>
      </GlassWidget>

      {/* ESP32 */}
      <div className="rect-bg" style={{ left: 437, top: 712, width: 270, height: 200 }}>
        <img src="/images/schematic/ESP32_blue_rectangle.png" style={{ top: '-6%', left: '-5%', width: '110%', height: '112%', filter: 'blur(30px) brightness(1.2)' }} alt="" />
      </div>
      <div className="rect-bg" style={{ left: 442, top: 717, width: 260, height: 190 }}>
        <img src="/images/schematic/ESP32_white_rectangle.png" style={{ top: '-1%', left: '-1%', width: '102%', height: '102%', filter: 'blur(30px) brightness(1.2)' }} alt="" />
      </div>
      <GlassWidget style={{ left: 422, top: 687, width: 300, height: 250 }}>
        <div>
          <div style={{ position: 'absolute', left: 67, top: 37, width: 165, height: 32, display: 'flex', alignItems: 'center', fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 16 }}>ESP32-WROOM-32D</div>
          <p style={{ position: 'absolute', left: 67, top: 67, width: 165, fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666666', fontSize: 15, lineHeight: 1.4, margin: 0 }}>
            <span style={{ fontWeight: 500, color: '#666666' }}>Microcontroller</span><br /><br />
            GPIO21 → SDA<br />GPIO22 → SCL<br />USB → Programming<br />3.3V Logic Level<br />Wi-Fi / Bluetooth
          </p>
          <img src="/images/schematic/ESP32.png" alt="" style={{ position: 'absolute', top: 100, left: 'calc(50% + 28px)', width: 60, height: 45, objectFit: 'cover' }} />
        </div>
      </GlassWidget>

      {/* PCA9685 */}
      <div className="rect-bg" style={{ left: 867, top: 712, width: 270, height: 200 }}>
        <img src="/images/schematic/PCA9685_blue_rectangle.png" style={{ top: '-6%', left: '-5%', width: '110%', height: '112%', filter: 'blur(30px) brightness(1.2)' }} alt="" />
      </div>
      <div className="rect-bg" style={{ left: 872, top: 717, width: 260, height: 190 }}>
        <img src="/images/schematic/PCA9685_white_rectangle.png" style={{ top: '-1%', left: '-1%', width: '102%', height: '102%', filter: 'blur(30px) brightness(1.2)' }} alt="" />
      </div>
      <GlassWidget style={{ left: 852, top: 687, width: 300, height: 250 }}>
        <div>
          <div style={{ position: 'absolute', top: 63, left: 'calc(50% - 39px)', fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 16, textAlign: 'center', whiteSpace: 'nowrap' }}>PCA9685</div>
          <p style={{ position: 'absolute', top: 89, left: 77, fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666666', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
            <span style={{ fontWeight: 500, color: '#666666' }}>16-Channels PWM Servo Driver</span><br /><br />
            I²C Address: 0x40<br />SDA ← ESP32 GPIO21<br />SCL ← ESP32 GPIO22<br />V+ ← 6V Servo Power<br />Ch 0–4 → 5 Servos
          </p>
          <img src="/images/schematic/PCA9685.png" alt="" style={{ position: 'absolute', top: 113, right: 46, width: 66, height: 50, objectFit: 'cover' }} />
        </div>
      </GlassWidget>

      {/* Servos label */}
      <div style={{ position: 'absolute', left: 1314, top: 599, color: '#fff', fontSize: 12, fontFamily: 'Arial', fontWeight: 700, whiteSpace: 'nowrap', zIndex: 5 }}>
        5× RDS3225 SERVOS (25 kg·cm, 270°)
      </div>

      {servos.map((s, i) => <ServoRow key={i} {...s} />)}

      {/* Power Row - 6V PSU */}
      <div className="rect-bg" style={{ left: 426, top: 1087, width: 292, height: 90 }}>
        <img src="/images/schematic/PSU_blue_rectangle.png" style={{ top: '-12%', left: '-5%', width: '110%', height: '124%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <div className="rect-bg" style={{ left: 421, top: 1085, width: 302, height: 95 }}>
        <img src="/images/schematic/PSU_white_rectangle.png" style={{ top: '-5%', left: '2%', width: '97%', height: '110%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <GlassWidget style={{ left: 422, top: 1067, width: 300, height: 130 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '12px 16px' }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 15, whiteSpace: 'nowrap' }}>6V 10A DC PSU</div>
          <p style={{ width: 147, fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666666', fontSize: 11, margin: 0 }}>
            Regulated Switch-Mode<br />Input: 240V AC Mains<br />Output: 6V DC @ 10A (60W)<br />Powering all servos
          </p>
          <img src="/images/schematic/PSU.png" alt="" style={{ position: 'absolute', top: 49, right: 56, width: 40, height: 33, objectFit: 'cover' }} />
        </div>
      </GlassWidget>

      {/* Capacitor Bank */}
      <div className="rect-bg" style={{ left: 857, top: 1087, width: 290, height: 90 }}>
        <img src="/images/schematic/Capacitor_blue_rectangle.png" style={{ top: '-12%', left: '-5%', width: '110%', height: '124%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <div className="rect-bg" style={{ left: 852, top: 1085, width: 300, height: 95 }}>
        <img src="/images/schematic/Capacitor_white_rectangle.png" style={{ top: '-5%', left: '2%', width: '97%', height: '110%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <GlassWidget style={{ left: 852, top: 1067, width: 300, height: 130 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '12px 16px' }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 15, whiteSpace: 'nowrap' }}>CAPACITOR BANK</div>
          <p style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666666', fontSize: 11, margin: 0, whiteSpace: 'nowrap' }}>
            3× 2200µF 10V Electrolytic<br />Absorbs servo inrush current<br />Parallel across V+ / GND rail<br />Prevents brownout on startup
          </p>
          <img src="/images/schematic/Capacitor.png" alt="" style={{ position: 'absolute', top: 56, right: 38, width: 40, height: 40, objectFit: 'cover' }} />
        </div>
      </GlassWidget>

      {/* LM7805 */}
      <div className="rect-bg" style={{ left: 1287, top: 1103, width: 271, height: 60 }}>
        <img src="/images/schematic/LM7805_blue_rectangle.png" style={{ top: '-16%', left: '-5%', width: '110%', height: '132%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <div className="rect-bg" style={{ left: 1282, top: 1102, width: 280, height: 62 }}>
        <img src="/images/schematic/LM7805_white_rectangle.png" style={{ top: '-11%', left: 0, width: '101%', height: '123%', filter: 'blur(20px) brightness(1.2)' }} alt="" />
      </div>
      <GlassWidget small style={{ left: 1282, top: 1088, width: 280, height: 90 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '10px 14px' }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 13, whiteSpace: 'nowrap' }}>LM7805 5V REGULATOR</div>
          <p style={{ width: 156, fontFamily: "'Zilla Slab',serif", fontWeight: 400, color: '#666666', fontSize: 11, margin: 0 }}>
            Steps 6V → 5V for ESP32 VIN<br />(or use USB during dev)
          </p>
          <img src="/images/schematic/LM7805.png" alt="" style={{ position: 'absolute', top: 38, right: 22, width: 44, height: 37, objectFit: 'cover' }} />
        </div>
      </GlassWidget>

      {/* Labels */}
      <div className="lbl-blue" style={{ left: 310, top: 788 }}>USB Serial</div>
      <div className="lbl-blue" style={{ left: 737, top: 760 }}>I²C Bus<br />SDA + SCL</div>
      <div className="lbl-blue" style={{ left: 1129, top: 613 }}>PWM Signal</div>
      <div className="lbl-gold" style={{ left: 757, top: 1100 }}>6V DC</div>
      <div className="lbl-gold" style={{ left: 1017, top: 989 }}>V+ 6V<br />to PCA9685</div>
      <div className="lbl-gold" style={{ left: 587, top: 984 }}>5V VIN<br />to ESP32</div>
      <div className="lbl-gold" style={{ left: 1613, top: 790, fontFamily: 'Inter,sans-serif' }}>6V Servo<br />Power Rail</div>

      {/* Legend */}
      <div style={{ display: 'flex', width: 1660, height: 60, alignItems: 'center', padding: '10px 20px', position: 'absolute', top: 1259, left: 82, background: 'linear-gradient(180deg,#dadada 0%,#cecece 100%)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 0 15px rgba(255,255,255,0.25), inset 0 0 12px rgba(255,255,255,0.15)', zIndex: 5 }}>
        <div style={{ color: '#444444', fontSize: 16, fontFamily: "'Zilla Slab'", fontWeight: 700, whiteSpace: 'nowrap' }}>Signal Flow: PC → USB → ESP32 → I²C → PCA9685 → PWM → RDS3225 Servos</div>
      </div>
    </>
  );
}
