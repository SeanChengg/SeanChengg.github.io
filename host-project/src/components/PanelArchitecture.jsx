import PanelViewer from './PanelViewer';

function PanelBox({ title, base, frames, style }) {
  return (
    <div style={{ width: 644, height: 492, position: 'absolute', background: 'rgba(255,255,255,0.5)', borderRadius: 8, ...style }}>
      <div style={{ left: 24, top: 20, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '38.4px' }}>
        {title}
      </div>
      <PanelViewer base={base} total={frames} />
      <div style={{ left: 251, top: 428, position: 'absolute' }}>
        <span style={{ color: '#8C8C8C', fontSize: 20, fontFamily: 'Arial' }}>↔ </span>
        <span style={{ color: '#8C8C8C', fontSize: 18, fontFamily: 'Arial' }}>Drag to control</span>
      </div>
    </div>
  );
}

export default function PanelArchitecture() {
  return (
    <div id="panel-architecture" style={{ width: 1919, height: 1499, left: 1, top: 818, position: 'absolute' }}>
      <div style={{ width: 50, height: 64, left: 452, top: -1, position: 'absolute', overflow: 'hidden' }}>
        <img src="/images/schematic/Head_YB_Vector.svg" alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>
      <div style={{ width: 328, height: 28, left: 515, top: 20, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '28.8px' }}>
        Panel Architecture
      </div>
      <div style={{ width: 1300, height: 356, left: 452, top: 84, position: 'absolute', textAlign: 'justify', color: 'black', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', letterSpacing: '0.6px' }}>
        Most humanoid robots try to replicate human appearance — silicone skins, dense actuator arrays, complex control systems — only to land in the uncanny valley. Inspired by the panel-based synthetic hosts in HBO's "West World", this design takes the opposite approach: seven independently actuated face panels form a humanoid robotic head that is deliberately mechanical. No skin, no realism. The panels slide open and closed — mechanical motion instead of simulated facial expression.
      </div>
      <div style={{ width: 1199, height: 38, left: 453, top: 402, position: 'absolute', color: 'rgba(0,0,0,0.5)', fontSize: 25, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '38.4px' }}>
        Panel groups actuates independently. Watch the automated sequence, or drag to control it
      </div>

      <PanelBox title="Midface Panels" base="/images/schematic/Head_YB_Midface/Head_Midface_Frame" frames={10} style={{ left: 452, top: 456 }} />
      <PanelBox title="Cheek Panels" base="/images/schematic/Head_YB_Cheek/Head_Cheek_Frame" frames={9} style={{ left: 1107, top: 456 }} />
      <PanelBox title="Jaw Panel" base="/images/schematic/Head_YB_Jaw/Head_Jaw_Frame" frames={9} style={{ left: 452, top: 959 }} />
      <PanelBox title="Full Panels" base="/images/schematic/Head_YB_Full/Head_Full_Frame" frames={9} style={{ left: 1107, top: 959 }} />
    </div>
  );
}
