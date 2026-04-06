import { withBase } from '../publicUrl';
import { SECTION_BODY_SCREEN_LEFT, SECTION_BODY_RIGHT_GAP } from '../pageLayout';

/** Same grid on every row so copy lines up identically in dev, preview, and GitHub Pages. */
const FOOTER_COLS = '267px 246px minmax(0, 1fr)';

export default function SimpleFooter() {
  return (
    <div
      id="site-footer"
      style={{
        width: '100%',
        position: 'relative',
        minHeight: '100%',
        paddingBottom: 60,
        paddingLeft: SECTION_BODY_SCREEN_LEFT,
        paddingRight: SECTION_BODY_RIGHT_GAP,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: FOOTER_COLS,
          columnGap: 0,
          alignItems: 'start',
          width: '100%',
          paddingTop: 48,
        }}
      >
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
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: '20.8px', fontFamily: 'Arial', fontWeight: 700, lineHeight: '22px' }}>Expertise</div>
          <div style={{ marginTop: 34, opacity: 0.7, color: '#F3F3F3', fontSize: 18, fontFamily: 'Arial', fontWeight: 400, lineHeight: '28.8px' }}>
            3D Modeling, Sculpting, Mechanical structure<br />
            UIUX design<br />
            Mechatronics design
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 1, margin: '40px 0 0', background: 'rgba(245,243,240,0.18)' }} />

      {/* 1fr | auto | 1fr — true center for the tagline; icons in the right third (no position:absolute → same in dev + prod). */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          width: '100%',
          marginTop: 20,
          columnGap: 12,
        }}
      >
        <div />
        <div
          style={{
            textAlign: 'center',
            opacity: 0.7,
            color: '#F3F3F3',
            fontSize: 16,
            fontFamily: 'Arial',
            fontWeight: 400,
            lineHeight: '25.6px',
          }}
        >
          Design by Sean
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ width: 64, height: 64, background: '#212121', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src={withBase('images/schematic/Instagram.svg')} alt="Instagram" style={{ width: 24, height: 24 }} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={{ width: 64, height: 64, background: '#212121', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src={withBase('images/schematic/Linkedin.svg')} alt="LinkedIn" style={{ width: 24, height: 24 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
