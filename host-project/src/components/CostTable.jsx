const rows = [
  { category: 'Linkage Components', details: '9 Profile-cut parts + 2 rods', material: '5052 Aluminum (TIG Welded)', cost: '$150.00*' },
  { category: 'Linkage Components', details: '2 Bearing housings (3 bearings each)', material: '3D-Printed Hard Plastic', cost: '$20.00' },
  { category: 'Hardware', details: 'Industrial fasteners, spur gears and bearings', material: 'Standardized Steel / Chrome', cost: '$82.75' },
  { category: 'Actuation', details: 'RDS3225 digital actuator', material: 'Pre-assembled Module', cost: '$18.50' },
];

const rowStyle = { alignSelf: 'stretch', padding: '14px 24px', background: '#FBFBFB', outline: '1px #E6E6E6 solid', outlineOffset: -1, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' };
const headerStyle = { alignSelf: 'stretch', padding: '16px 24px', background: '#F0F0F0', overflow: 'hidden', outline: '1px #E0E0E0 solid', outlineOffset: -1, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' };
const footerStyle = { alignSelf: 'stretch', padding: '18px 24px 19px', background: '#F0F0F0', outline: '1px #E6E6E6 solid', outlineOffset: -1, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex' };

export default function CostTable() {
  return (
    <div style={{ width: 1290, left: 460, top: 740, position: 'absolute', background: '#F7F7F7', overflow: 'hidden', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
      <div style={headerStyle}>
        <div style={{ width: 219, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>CATEGORY</div>
        <div style={{ width: 379, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>COMPONENT DETAILS</div>
        <div style={{ width: 378, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>MATERIAL / PROCESS</div>
        <div style={{ width: 261, height: 18, color: '#666', fontSize: 15, fontFamily: 'Arial', fontWeight: 700 }}>UNIT COST</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={rowStyle}>
          <div style={{ width: 220, color: '#121212', fontSize: 14, fontFamily: 'Arial', fontWeight: 700 }}>{r.category}</div>
          <div style={{ width: 380, color: '#404040', fontSize: 14, fontFamily: 'Arial', fontWeight: 400 }}>{r.details}</div>
          <div style={{ width: 380, color: '#404040', fontSize: 14, fontFamily: 'Arial', fontWeight: 400 }}>{r.material}</div>
          <div style={{ width: 262, color: '#121212', fontSize: 14, fontFamily: 'Inter', fontWeight: 600 }}>{r.cost}</div>
        </div>
      ))}
      <div style={footerStyle}>
        <div style={{ width: 220, color: 'black', fontSize: 14, fontFamily: 'Arial', fontWeight: 700 }}>Total Per Joint</div>
        <div style={{ width: 380 }} />
        <div style={{ width: 380 }} />
        <div style={{ width: 262, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: 700 }}>$271.25</div>
      </div>
    </div>
  );
}
