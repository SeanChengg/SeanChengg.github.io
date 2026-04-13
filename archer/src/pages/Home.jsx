import { useLayoutEffect, useRef, useState } from 'react';
import usePageScale from '../hooks/usePageScale';
import BackButton from '../components/BackButton';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Description from '../components/Description';
import ArcherAnimation from '../components/ArcherAnimation';
import Footer from '../components/Footer';

const FOOTER_H = 342;
const COLUMN_LEFT = 460;
const COLUMN_TOP = 1920;
const GAP_BEFORE_FOOTER = 72;
const TOP_OFFSET = 100;
/* Body height ends flush at footer bottom — no extra strip below */
const BOTTOM_PAD = 0;

export default function Home() {
  const columnRef = useRef(null);
  const [footerTop, setFooterTop] = useState(3858);
  const [pageHeight, setPageHeight] = useState(4500);

  usePageScale(pageHeight);

  useLayoutEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    const measure = () => {
      const h = el.offsetHeight;
      const ft = COLUMN_TOP + h + GAP_BEFORE_FOOTER;
      setFooterTop(ft);
      setPageHeight(TOP_OFFSET + ft + FOOTER_H + BOTTOM_PAD);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <>
      <BackButton />
      <Sidebar />

      <div className="page-scale-wrapper" style={{ width: 1920, position: 'relative', background: 'transparent' }}>
        <div
          style={{
            width: 1919,
            minHeight: pageHeight - TOP_OFFSET,
            left: -0.25,
            top: 0,
            position: 'absolute',
            background: 'transparent',
          }}
        >
          <div
            style={{
              width: 1920,
              minHeight: pageHeight - TOP_OFFSET,
              left: 0,
              top: TOP_OFFSET,
              position: 'absolute',
              overflow: 'visible',
            }}
          >
            <Hero />
            <Gallery />
            <div
              ref={columnRef}
              style={{
                position: 'absolute',
                left: COLUMN_LEFT,
                top: COLUMN_TOP,
                width: 1289,
              }}
            >
              <Description />
              <ArcherAnimation />
            </div>
            <Footer top={footerTop} />
          </div>
        </div>
      </div>
    </>
  );
}
