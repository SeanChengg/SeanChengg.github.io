import { useState, useEffect, useRef } from 'react';

const slides = [
  { src: '/images/schematic/Head3.2_Nobackground/Head3.2_Nobackground.html', scale: 1 },
  { src: '/images/schematic/Head3.2_Rendered/Head3.2_Rendered.html', scale: 1.5, offsetX: 25 },
  { src: '/images/schematic/Head3.2＿Half/Head3.2_Half.html', scale: 1.5 },
  { src: '/images/schematic/Head_Trans_6:6/Head_Trans_6:6.html', scale: 1.5 },
  { src: '/images/schematic/Head_Trans_4:6/Head_Trans_4:6.html', scale: 1.5 },
];

const thumbConfigs = [
  { src: '/images/schematic/Head3.2_Nobackground.png', style: { top: 17, left: -10, width: 240, height: 186 }, thumbStyle: { width: 220, height: 220 } },
  { src: '/images/schematic/Head3.2_Rendered.png', style: { top: -5.5, left: -44, width: 308, height: 231 }, thumbStyle: { width: 220, height: 220 } },
  { src: '/images/schematic/Head3.2_Half.png', style: { top: -8, left: -49, width: 323, height: 242 }, thumbStyle: { width: 225, height: 225 } },
  { src: '/images/schematic/Head_Trans_6:6.png', style: { top: 0, left: -90, width: 400, height: 225 }, thumbStyle: { width: 220, height: 220 } },
  { src: '/images/schematic/Head_Trans_4:6.png', style: { top: 3, left: -85, width: 390, height: 219 }, thumbStyle: { width: 220, height: 220 } },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayRef = useRef(null);

  const updateGallery = () => {
    if (!displayRef.current) return;
    const slide = slides[currentIndex];
    displayRef.current.src = slide.src;
    displayRef.current.style.transform = `scale(${slide.scale}) translateX(${slide.offsetX || 0}px)`;
    displayRef.current.style.transformOrigin = 'center center';
  };

  useEffect(updateGallery, [currentIndex]);

  return (
    <div id="scroll-gallery" style={{ width: 1289, height: 1100, left: 460, top: 672, position: 'absolute', background: 'rgba(25,25,25,0.03)', borderRadius: 16, overflow: 'hidden' }}>
      <iframe
        ref={displayRef}
        id="gallery-display"
        src={slides[0].src}
        style={{ position: 'absolute', top: 30, left: 141, width: 1007.9, height: 780, border: 'none', pointerEvents: 'none' }}
        scrolling="no"
        frameBorder="0"
        title="Gallery display"
      />
      <img
        src="/images/schematic/Previous_Page_Arrow.svg"
        style={{ position: 'absolute', top: 350, left: 0, width: 61, height: 140, cursor: 'pointer', zIndex: 10, objectFit: 'contain' }}
        onClick={() => setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length)}
        alt="Previous"
      />
      <img
        src="/images/schematic/Next_Page_Arrow.svg"
        style={{ position: 'absolute', top: 350, right: 0, width: 61, height: 140, cursor: 'pointer', zIndex: 10, objectFit: 'contain' }}
        onClick={() => setCurrentIndex(prev => (prev + 1) % slides.length)}
        alt="Next"
      />
      <div style={{ position: 'absolute', top: 840, left: '50%', transform: 'translateX(-50%)', height: 223, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        {thumbConfigs.map((t, i) => (
          <div
            key={i}
            className="gallery-thumb"
            onClick={() => setCurrentIndex(i)}
            style={{
              ...t.thumbStyle,
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'rgba(200,200,200,0.3)',
              border: i === currentIndex ? '2px solid rgba(255,216,48,0.25)' : '3px solid transparent',
              boxShadow: i === currentIndex ? '0 0 15px rgba(255,216,48,0.35), 0 0 30px rgba(255,216,48,0.2)' : 'none',
              opacity: i === currentIndex ? 1 : 0.6,
            }}
          >
            <img src={t.src} style={{ position: 'absolute', ...t.style, objectFit: 'cover', pointerEvents: 'none' }} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
