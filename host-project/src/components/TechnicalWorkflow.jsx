import CostTable from './CostTable';
import NextStage from './NextStage';

export default function TechnicalWorkflow() {
  return (
    <div id="technical-workflow" style={{ width: 1919, height: 1973, left: 0.75, top: 4040.37, position: 'absolute' }}>
      <div style={{ width: 50, height: 64, left: 460, top: 95, position: 'absolute', overflow: 'hidden' }}>
        <img src="/images/schematic/Head_YB_Vector.svg" alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>
      <div style={{ width: 614, height: 28, left: 523, top: 116, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Arial,sans-serif', fontWeight: 700, lineHeight: '28.8px' }}>
        Technical Design & Production Workflow
      </div>
      <div style={{ width: 1290, left: 460, top: 180, position: 'absolute', textAlign: 'justify', color: 'black', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '45px', letterSpacing: '0.6px' }}>
        To optimize production, the jaw mechanism utilizes 5052 aluminum (3-4mm) for its primary structure, providing the ductility required for cold-formed bends. The process is streamlined to 9 profile-cut parts and 4 precision bends, with secondary work consisting of 23 drilled holes in various sizes and 5 threaded points.<br /><br />
        The design replaces expensive CNC-milled bearing seats with 3D-printed hard plastic housings. Two of these components each hold three bearings, providing the precise internal spacing required for gear train alignment. Additionally, two 2D-cut aluminum components are TIG welded to two rods to form sub-assemblies prior to final construction.<br /><br />
        This strategy maintains mechanical accuracy while reducing machining overhead. The per-joint cost currently is around $270:
      </div>
      <CostTable />
      <iframe
        src="/images/schematic/Jaw_Mechanism/Jaw_Mechanism.html"
        style={{ width: 1920, height: 1080, left: 0, top: 1000, position: 'absolute', border: 'none', pointerEvents: 'none' }}
        scrolling="no"
        frameBorder="0"
        title="Jaw Mechanism"
      />
      <img src="/images/schematic/Jaw_Illustrate.png" alt="" style={{ position: 'absolute', left: 1550, top: 1060, width: 180, height: 274, objectFit: 'cover' }} />
      <NextStage />
    </div>
  );
}
