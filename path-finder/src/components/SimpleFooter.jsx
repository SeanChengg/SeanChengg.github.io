import { withBase } from '../publicUrl';

export default function SimpleFooter() {
  return (
    <div
      id="site-footer"
      style={{
        width: '100%',
        position: 'relative',
        background: '#212121',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 60,
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        width: 1727,
        margin: '0 auto',
        paddingTop: 48,
        display: 'flex',
        gap: 0,
        position: 'relative'
      }}>
        <div style={{ width: 267 }}>
          <div style={{ color: '#F3F3F3', fontSize: '20.8px', fontFamily: 'Arial', fontWeight: 700, lineHeight: '22px' }}>Contact</div>
          <a href="mailto:sean.c1121@gmail.com" style={{
            display: 'block', marginTop: 34, opacity: 0.7,
            color: '#F3F3F3', fontSize: 16, fontFamily: 'Arial',
            fontWeight: 400, lineHeight: '25.6px', textDecoration: 'none'
          }}>sean.c1121@gmail.com</a>
        </div>
        <div style={{ width: 246 }}>
          <div style={{ color: '#F3F3F3', fontSize: '21.1px', fontFamily: 'Arial', fontWeight: 700, lineHeight: '22px' }}>Services</div>
          <div style={{ marginTop: 34, opacity: 0.7, color: '#F3F3F3', fontSize: 18, fontFamily: 'Arial', fontWeight: 400, lineHeight: '28.8px' }}>Content & Creative</div>
        </div>
        <div>
          <div style={{ color: '#F3F3F3', fontSize: '20.8px', fontFamily: 'Arial', fontWeight: 700, lineHeight: '22px' }}>Expertise</div>
          <div style={{ marginTop: 34, opacity: 0.7, color: '#F3F3F3', fontSize: 18, fontFamily: 'Arial', fontWeight: 400, lineHeight: '28.8px' }}>
            3D Modeling, Sculpting, Mechanical structure<br />
            UIUX design<br />
            Mechatronics design
          </div>
        </div>
      </div>
      <div style={{ width: 1727, height: 1, margin: '40px auto 0', background: 'rgba(245,243,240,0.18)' }} />
      <div style={{ width: 1727, margin: '20px auto 0', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ opacity: 0.7, color: '#F3F3F3', fontSize: 16, fontFamily: 'Arial', fontWeight: 400, lineHeight: '25.6px' }}>Design by Sean</div>
        <div style={{ position: 'absolute', right: 0, display: 'flex', gap: 8 }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ width: 64, height: 64, background: '#212121', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <img src={withBase('images/schematic/Instagram.svg')} alt="Instagram" style={{ width: 24, height: 24 }} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={{ width: 64, height: 64, background: '#212121', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <img src={withBase('images/schematic/Linkedin.svg')} alt="LinkedIn" style={{ width: 24, height: 24 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
