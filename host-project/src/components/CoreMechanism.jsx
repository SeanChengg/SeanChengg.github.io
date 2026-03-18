import Gallery from './Gallery';

export default function CoreMechanism() {
  return (
    <div id="core-mechanism" style={{ width: 1919, height: 2135, left: 0.75, top: 2269.37, position: 'absolute' }}>
      <div style={{ width: 50, height: 64, left: 460, top: 103, position: 'absolute', overflow: 'hidden' }}>
        <img src="/images/schematic/Head_YB_Vector.svg" alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>
      <div style={{ width: 328, height: 28, left: 523, top: 124, position: 'absolute', color: '#212121', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '28.8px' }}>
        Core Mechanism
      </div>
      <div style={{ width: 1284, height: 450, left: 460, top: 187, position: 'absolute', textAlign: 'justify', color: 'black', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', letterSpacing: '0.6px' }}>
        The head is divided into six regions — mid face (forehead to cheekbone to upper lip), left and right cheeks, and lower jaw — with 7 panels driven by 5 mechanism sets. Each set uses the same principle: an RDS3225 dual-axle digital servo drives custom-profiled linkage arms, with meshed spur gears at the panel-end pivots — where the arms meet the panel connector — to keep them synchronized and prevent the panel from twisting or drifting under load. The RDS3225 was chosen for its availability, low cost, dual-shaft U-bracket mounting, and 25 kg·cm torque at 6V — more than sufficient for the loads involved. Three mechanism variants — mid face, cheek and jaw — each use a different number of linkage arms and gears, with arm profiles custom-shaped to suit each region's confined geometry and required panel trajectory, but all share the same servo-linkage-gear architecture.
      </div>
      <Gallery />
    </div>
  );
}
