import { useState } from 'react';
import {
  PF_GALLERY_SCALE,
  PF_GALLERY_W,
  PF_GALLERY_H,
  PF_GALLERY_LEFT,
  PF_GALLERY_TOP_IN_HARDWARE,
} from '../pageLayout';
import { withBase } from '../publicUrl';

const slides = [
  { src: withBase('images/path_finder/Path1.jpeg'), label: '3/4 View' },
  { src: withBase('images/path_finder/Path2.jpeg'), label: 'Rear 3/4' },
  { src: withBase('images/path_finder/Path3.jpeg'), label: 'Profile' },
  { src: withBase('images/path_finder/Path_Finder_Front.png'), label: 'Front' },
  { src: withBase('images/path_finder/Path_Finder_Left.png'), label: 'Left' },
  { src: withBase('images/path_finder/Path_Finder_RF.png'), label: 'Right Front' },
  { src: withBase('images/path_finder/Path_Finder_Right.png'), label: 'Right' },
];

/** Last four slides are PNG cutouts (no scene background); show smaller in thumbs + main view */
const isCutoutSlide = (i) => i >= 3;

const sx = (n) => Math.round(n * PF_GALLERY_SCALE);

export default function Gallery({ top = PF_GALLERY_TOP_IN_HARDWARE }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainIsCutout = isCutoutSlide(currentIndex);

  return (
    <div
      id="pf-gallery"
      style={{
        width: PF_GALLERY_W,
        height: PF_GALLERY_H,
        left: PF_GALLERY_LEFT,
        top,
        position: 'absolute',
        background: 'rgba(25,25,25,0.03)',
        borderRadius: sx(16),
        overflow: 'hidden',
      }}
    >
      <img
        src={slides[currentIndex].src}
        alt={slides[currentIndex].label}
        style={{
          position: 'absolute',
          top: sx(70),
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: mainIsCutout ? sx(820) : sx(950),
          maxHeight: mainIsCutout ? sx(660) : sx(750),
          objectFit: 'contain',
          transition: 'opacity 0.2s ease',
        }}
      />
      <img
        src={withBase('images/schematic/Previous_Page_Arrow.svg')}
        style={{
          position: 'absolute',
          top: sx(350),
          left: 0,
          width: sx(61),
          height: sx(140),
          cursor: 'pointer',
          zIndex: 10,
          objectFit: 'contain',
        }}
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        alt="Previous"
      />
      <img
        src={withBase('images/schematic/Next_Page_Arrow.svg')}
        style={{
          position: 'absolute',
          top: sx(350),
          right: 0,
          width: sx(61),
          height: sx(140),
          cursor: 'pointer',
          zIndex: 10,
          objectFit: 'contain',
        }}
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        alt="Next"
      />
      <div
        style={{
          position: 'absolute',
          top: sx(840),
          left: '50%',
          transform: 'translateX(-50%)',
          height: sx(223),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: sx(12),
        }}
      >
        {slides.map((slide, i) => {
          const cutout = isCutoutSlide(i);
          return (
            <div
              key={i}
              className="gallery-thumb"
              onClick={() => setCurrentIndex(i)}
              style={{
                width: sx(152),
                height: sx(152),
                position: 'relative',
                borderRadius: sx(14),
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'rgba(200,200,200,0.35)',
                border:
                  i === currentIndex
                    ? '2px solid rgba(255,216,48,0.25)'
                    : '3px solid transparent',
                boxShadow:
                  i === currentIndex
                    ? '0 0 15px rgba(255,216,48,0.35), 0 0 30px rgba(255,216,48,0.2)'
                    : 'none',
                opacity: i === currentIndex ? 1 : 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: cutout ? sx(14) : sx(10),
                boxSizing: 'border-box',
              }}
            >
              <img
                src={slide.src}
                alt={slide.label}
                style={{
                  position: 'relative',
                  top: cutout ? sx(8) : 0,
                  maxWidth: cutout ? '72%' : '100%',
                  maxHeight: cutout ? '72%' : '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  pointerEvents: 'none',
                  display: 'block',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
