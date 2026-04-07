import { withBase } from '../publicUrl';

/**
 * Footer — matches Runaway Teapot FooterSection.tsx layout exactly.
 * Uses absolute positioning with the same offsets (96px left, 1727px content width).
 */
export default function SimpleFooter() {
  return (
    <div
      id="site-footer"
      style={{
        width: '100%',
        height: '342px',
        position: 'relative',
        background: '#2A2A2A',
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
      }}
    >
      {/* Info columns — left: 96px from container */}
      <div style={{ position: 'absolute', left: '96px', top: '48px', width: '1727px' }}>
        {/* Contact */}
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: '21px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: '22px' }}>
            Contact
          </div>
          <div style={{ marginTop: '28px', opacity: 0.7, color: '#F3F3F3', fontSize: '16px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, lineHeight: '25.6px' }}>
            <a href="mailto:sean.c1121@gmail.com" style={{ color: '#F3F3F3', textDecoration: 'none' }}>
              sean.c1121@gmail.com
            </a>
          </div>
        </div>

        {/* Services */}
        <div style={{ position: 'absolute', left: '267px', top: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: '21px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: '22px' }}>
            Services
          </div>
          <div style={{ marginTop: '28px', opacity: 0.7, color: '#F3F3F3', fontSize: '18px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, lineHeight: '28.8px' }}>
            Content & Creative
          </div>
        </div>

        {/* Expertise */}
        <div style={{ position: 'absolute', left: '513px', top: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: '21px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: '22px' }}>
            Expertise
          </div>
          <div style={{ marginTop: '28px', opacity: 0.7, color: '#F3F3F3', fontSize: '18px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, lineHeight: '28.8px' }}>
            3D Modeling, Sculpting, Mechanical structure
            <br />
            UIUX design
            <br />
            Mechatronics design
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          position: 'absolute',
          left: '96px',
          top: '240px',
          width: '1727px',
          height: '1px',
          background: 'rgba(245,243,240,0.18)',
        }}
      />

      {/* Design by Sean */}
      <div
        style={{
          position: 'absolute',
          left: '868px',
          top: '259px',
          opacity: 0.7,
          color: '#F3F3F3',
          fontSize: '16px',
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 400,
          lineHeight: '25.6px',
        }}
      >
        Design by Sean
      </div>

      {/* Social icons */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          left: '1715px',
          top: '259px',
          width: '48px',
          height: '48px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
      >
        <img src={withBase('images/schematic/Instagram.svg')} alt="Instagram" style={{ width: '24px', height: '24px' }} />
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          left: '1775px',
          top: '259px',
          width: '48px',
          height: '48px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
      >
        <img src={withBase('images/schematic/Linkedin.svg')} alt="LinkedIn" style={{ width: '24px', height: '24px' }} />
      </a>
    </div>
  );
}
