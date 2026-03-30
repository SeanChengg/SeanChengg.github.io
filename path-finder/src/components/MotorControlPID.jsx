import GlassWidget from './GlassWidget';
import SectionHeading from './SectionHeading';
import { MOTOR_PID_TOP, MOTOR_PID_HEIGHT, SECTION_BODY_TOP } from '../pageLayout';

const codeSnippet = `// PID Controller — pid_control.c
float apply_pid_control(float error, float integral, float derivative) {
    return Kp * error + Ki * integral + Kd * derivative;
}
// Kp = 0.1, Ki = 0.0, Kd = 0.1

// Motor Output — motor_control.c
duty_cycles.left  = target_speed * (1 - output);
duty_cycles.right = target_speed * (1 + output);
// target_speed = 31250 (50% of 62500 wrap)`;

const scenarios = [
  { title: 'Line CENTER (pos=10)', error: 'Error = 0', output: 'Output = 0', motors: 'Both motors 50%', result: 'Go straight', color: '#4CAF50' },
  { title: 'Line RIGHT (pos=15)', error: 'Error = +5', output: 'Left 30%, Right 85%', motors: 'Left slows, Right speeds up', result: 'Turn right', color: '#FF9800' },
  { title: 'Line LEFT (pos=5)', error: 'Error = -5', output: 'Left 85%, Right 30%', motors: 'Left speeds up, Right slows', result: 'Turn left', color: '#2196F3' },
];

export default function MotorControlPID() {
  return (
    <div id="motor-control" style={{ width: 1919, height: MOTOR_PID_HEIGHT, left: 0.75, top: MOTOR_PID_TOP, position: 'absolute' }}>
      <SectionHeading>Motor Control & PID</SectionHeading>
      <div style={{
        width: 1284, left: 460, top: SECTION_BODY_TOP, position: 'absolute', zIndex: 2,
        minHeight: 360,
        textAlign: 'justify', color: 'black', fontSize: 30,
        fontFamily: "'Zilla Slab',serif", fontWeight: 400,
        lineHeight: '45px', letterSpacing: '0.6px'
      }}>
        PID — Proportional, Integral, Derivative — is a feedback algorithm that continuously measures how far the robot has drifted from the line and calculates a correction. If the line drifts right (position {'>'} 10), the PID output goes positive, slowing the left motor and speeding up the right to steer back. If it drifts left (position {'<'} 10), the opposite happens. The proportional term reacts to current error — bigger drift means harder correction. The derivative term reacts to how fast the error is changing, dampening overshoot and preventing zig-zag behavior. The integral term is disabled (Ki=0) to avoid instability in rapid line following.
      </div>

      <div className="ns" style={{ width: 1289, height: 350, left: 460, top: 570, position: 'absolute' }}>
        <GlassWidget small style={{ left: 24, top: 120, width: 100, height: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 12 }}>Target (10)</div>
          </div>
        </GlassWidget>
        <div style={{ position: 'absolute', left: 132, top: 143, width: 36, height: 2, background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', left: 172, top: 123, width: 40, height: 40, border: '2px solid rgba(255,255,255,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Σ</span>
        </div>
        <div style={{ position: 'absolute', left: 218, top: 143, width: 36, height: 2, background: 'rgba(255,255,255,0.3)' }} />
        <GlassWidget small style={{ left: 260, top: 113, width: 150, height: 68 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 8px' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 12, textAlign: 'center' }}>PID<br /><span style={{ fontSize: 10, fontWeight: 400, color: '#666' }}>Kp·e + Kd·de/dt</span></div>
          </div>
        </GlassWidget>
        <div style={{ position: 'absolute', left: 418, top: 143, width: 36, height: 2, background: 'rgba(255,255,255,0.3)' }} />
        <GlassWidget small style={{ left: 460, top: 113, width: 150, height: 68 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, color: '#1a1a1a', fontSize: 11, textAlign: 'center' }}>Motor Calc</div>
          </div>
        </GlassWidget>
        <div style={{ position: 'absolute', left: 618, top: 127, width: 28, height: 2, background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', left: 618, top: 163, width: 28, height: 2, background: 'rgba(255,255,255,0.3)' }} />
        <GlassWidget small style={{ left: 652, top: 103, width: 110, height: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, color: '#1a1a1a', fontSize: 11 }}>L Motor</div>
          </div>
        </GlassWidget>
        <GlassWidget small style={{ left: 652, top: 153, width: 110, height: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, color: '#1a1a1a', fontSize: 11 }}>R Motor</div>
          </div>
        </GlassWidget>
        <div style={{ position: 'absolute', left: 200, top: 170, width: 2, height: 56, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', left: 200, top: 226, width: 520, height: 2, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', left: 718, top: 193, width: 2, height: 35, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', left: 420, top: 233, color: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'Arial', fontWeight: 700 }}>Encoder feedback</div>
      </div>

      <div style={{ left: 460, top: 960, position: 'absolute', display: 'flex', gap: 20, width: 1289 }}>
        {scenarios.map((s, i) => (
          <div key={i} className="pf-scenario-card" style={{ position: 'relative', flex: 1, borderLeft: `4px solid ${s.color}`, minWidth: 0 }}>
            <div style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 14, color: '#212121', marginBottom: 8 }}>{s.title}</div>
            <div style={{ fontFamily: "'Zilla Slab',serif", fontSize: 14, color: '#404040', lineHeight: 1.55 }}>
              {s.error}<br />{s.output}<br />{s.motors}<br />
              <strong style={{ color: s.color }}>{s.result}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Code row bottom drives MOTOR_PID_CONTENT_BOTTOM in pageLayout.js */}
      <div className="pf-code-block" style={{ left: 460, top: 1180, width: 620, position: 'absolute', fontSize: 12, padding: '22px 26px' }}>
        {codeSnippet}
      </div>

      <div style={{ left: 1120, top: 1180, position: 'absolute', width: 620, background: 'rgba(25,25,25,0.04)', borderRadius: 12, padding: '24px 28px', border: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 16, color: '#212121', marginBottom: 12 }}>PID Parameters</div>
        <div style={{ fontFamily: "'Zilla Slab',serif", fontSize: 15, color: '#404040', lineHeight: 1.85 }}>
          <strong>Kp = 0.1</strong> — Responsive steering without oscillation<br />
          <strong>Ki = 0.0</strong> — Disabled to prevent instability<br />
          <strong>Kd = 0.1</strong> — Smooths response, prevents zig-zag
        </div>
      </div>
    </div>
  );
}
