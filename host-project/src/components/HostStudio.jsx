import Footer from './Footer';

export default function HostStudio() {
  const handleButtonClick = (e) => {
    const el = e.currentTarget;
    el.style.transform = 'scale(0.88)';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
    setTimeout(() => { window.location.href = '/head.html'; }, 300);
    e.preventDefault();
  };

  return (
    <div id="host-studio" style={{ width: 1910, height: 1410, left: 0, top: 7515, position: 'absolute', background: '#212121', overflow: 'visible', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
      {/* White dot grain overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: "url('/images/schematic/Backdrop_image1.png') top left / cover no-repeat", opacity: 0.9, pointerEvents: 'none', zIndex: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' }} />
      <div style={{ width: 1823, height: 984, left: 68, top: 0, position: 'absolute', overflow: 'visible', zIndex: 1 }}>
        <a
          href="/head.html"
          className="host-button-link"
          onClick={handleButtonClick}
          style={{ textDecoration: 'none', width: 220, height: 220, left: 802, top: 382, position: 'absolute', cursor: 'pointer', display: 'block' }}
        >
          <div className="host-button-orb" style={{ position: 'absolute', top: 0, left: 0, width: 220, height: 220, background: 'linear-gradient(135deg,#FAFAFA 0%,#DFDAB2 100%)', borderRadius: 9999, outline: '1px white solid' }} />
          <div style={{ position: 'absolute', top: '11.36%', left: '12.73%', right: '12.27%', bottom: '11.03%' }}>
            <img src="/images/schematic/Subtract.svg" alt="" style={{ position: 'absolute', top: 0, left: '-1.21%', width: '102.42%', height: '102.34%', pointerEvents: 'none' }} />
          </div>
        </a>
        <div style={{ position: 'absolute', top: 126, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 50, height: 64, flexShrink: 0, overflow: 'hidden' }}>
            <img src="/images/schematic/Head_YB_Vector.svg" alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
          <div style={{ color: '#F3F3F3', fontSize: 50, fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, lineHeight: 1.2 }}>
            The Host Studio
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
