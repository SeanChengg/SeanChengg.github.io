import { useState } from 'react';
import { BASE } from '../config';

const slides = [
  'Archer_Scroll_Gallery00.PNG',
  'Archer_Scroll_Gallery01.PNG',
  'Archer_Scroll_Gallery02.PNG',
  'Archer_Scroll_Gallery03.PNG',
  'Archer_Scroll_Gallery04.PNG',
  'Archer_Scroll_Gallery05.PNG',
  'Archer_Scroll_Gallery06.png',
  'Archer_Scroll_Gallery07.PNG',
].map(name => ({
  src: `${BASE}images/archer/${name}`,
  thumb: `${BASE}images/archer/${name}`,
}));

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrentIndex(i => (i + 1) % slides.length);

  return (
    <div
      id="gallery"
      style={{
        width: 1289, height: 1100, left: 460, top: 720,
        position: 'absolute', background: 'rgba(25,25,25,0.03)',
        borderRadius: 16, overflow: 'hidden'
      }}
    >
      {/* Main display */}
      <div style={{ position: 'absolute', top: 60, left: 141, width: 1008, height: 780, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src={slides[currentIndex].src}
          alt={`Archer gallery ${currentIndex + 1}`}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'opacity 0.3s ease' }}
        />
      </div>

      {/* Previous arrow */}
      <div
        className="gallery-arrow"
        onClick={prev}
        style={{ position: 'absolute', top: 350, left: 15, width: 50, height: 140, cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="30" height="60" viewBox="0 0 30 60" fill="none">
          <path d="M25 5 L5 30 L25 55" stroke="#212121" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Next arrow */}
      <div
        className="gallery-arrow"
        onClick={next}
        style={{ position: 'absolute', top: 350, right: 15, width: 50, height: 140, cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="30" height="60" viewBox="0 0 30 60" fill="none">
          <path d="M5 5 L25 30 L5 55" stroke="#212121" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Thumbnails */}
      <div style={{ position: 'absolute', top: 860, left: '50%', transform: 'translateX(-50%)', height: 223, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="gallery-thumb"
            onClick={() => setCurrentIndex(i)}
            style={{
              width: 130, height: 130,
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'rgba(200,200,200,0.3)',
              border: i === currentIndex ? '2px solid rgba(255,216,48,0.25)' : '3px solid transparent',
              boxShadow: i === currentIndex ? '0 0 15px rgba(255,216,48,0.35), 0 0 30px rgba(255,216,48,0.2)' : 'none',
              opacity: i === currentIndex ? 1 : 0.6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <img
              src={slide.thumb}
              alt=""
              style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', pointerEvents: 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
