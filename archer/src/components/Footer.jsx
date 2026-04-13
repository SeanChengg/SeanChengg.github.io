export default function Footer({ top = 3858 }) {
  return (
    <div
      style={{
        width: 1900,
        height: 342,
        left: 0,
        top,
        position: 'absolute',
        background: '#2A2A2A',
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
      }}
    >
      {/* Info columns */}
      <div style={{ position: 'absolute', left: 96, top: 48, width: 1727 }}>
        {/* Contact */}
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: 21, fontFamily: "'Space Grotesk','Zilla Slab',sans-serif", fontWeight: 700, lineHeight: '22px' }}>
            Contact
          </div>
          <div style={{ marginTop: 28, opacity: 0.7, color: '#F3F3F3', fontSize: 16, fontFamily: "'Space Grotesk','Zilla Slab',sans-serif", fontWeight: 400, lineHeight: '25.6px' }}>
            <a href="mailto:sean.c1121@gmail.com" style={{ color: '#F3F3F3', textDecoration: 'none' }}>
              sean.c1121@gmail.com
            </a>
          </div>
        </div>

        {/* Services */}
        <div style={{ position: 'absolute', left: 267, top: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: 21, fontFamily: "'Space Grotesk','Zilla Slab',sans-serif", fontWeight: 700, lineHeight: '22px' }}>
            Services
          </div>
          <div style={{ marginTop: 28, opacity: 0.7, color: '#F3F3F3', fontSize: 18, fontFamily: "'Space Grotesk','Zilla Slab',sans-serif", fontWeight: 400, lineHeight: '28.8px' }}>
            Content & Creative
          </div>
        </div>

        {/* Expertise */}
        <div style={{ position: 'absolute', left: 513, top: 0 }}>
          <div style={{ color: '#F3F3F3', fontSize: 21, fontFamily: "'Space Grotesk','Zilla Slab',sans-serif", fontWeight: 700, lineHeight: '22px' }}>
            Expertise
          </div>
          <div style={{ marginTop: 28, opacity: 0.7, color: '#F3F3F3', fontSize: 18, fontFamily: "'Space Grotesk','Zilla Slab',sans-serif", fontWeight: 400, lineHeight: '28.8px' }}>
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
          left: 96,
          top: 240,
          width: 1727,
          height: 1,
          background: 'rgba(245,243,240,0.18)',
        }}
      />

      {/* Design by Sean */}
      <div
        style={{
          position: 'absolute',
          left: 868,
          top: 259,
          opacity: 0.7,
          color: '#F3F3F3',
          fontSize: 16,
          fontFamily: "'Space Grotesk','Zilla Slab',sans-serif",
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
          left: 1715,
          top: 259,
          width: 48,
          height: 48,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#F3F3F3',
          fontSize: 20,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          left: 1775,
          top: 259,
          width: 48,
          height: 48,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#F3F3F3',
          fontSize: 20,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
    </div>
  );
}
