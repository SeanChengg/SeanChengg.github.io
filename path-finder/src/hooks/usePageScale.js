import { useEffect, useCallback } from 'react';
import { ARTBOARD_WIDTH, PAGE_SCROLL_HEIGHT } from '../pageLayout';

export default function usePageScale() {
  const scalePage = useCallback(() => {
    const w = document.querySelector('.page-scale-wrapper');
    if (!w) return;
    const s = Math.min(window.innerWidth / ARTBOARD_WIDTH, 1);
    /*
     * Chrome often drops backdrop-filter when any ancestor has transform().
     * If the viewport is ≥ artboard wide, skip transform entirely (not just scale(1))
     * so frosted glass (pf-liquid-glass) keeps working on desktop GitHub Pages.
     */
    if (s >= 1) {
      w.style.transform = 'none';
      w.style.transformOrigin = '';
    } else {
      /*
       * Must use top center here: .page-scale-canvas flex-centers the 1920px box, but scale() with
       * top left origin shrinks toward the left — huge gap on the right (GitHub / narrow windows).
       */
      w.style.transformOrigin = 'top center';
      w.style.transform = 'translate3d(0, 0, 0) scale(' + s + ')';
    }
    document.body.style.height = (PAGE_SCROLL_HEIGHT * s) + 'px';
  }, []);

  useEffect(() => {
    scalePage();
    window.addEventListener('resize', scalePage);
    return () => window.removeEventListener('resize', scalePage);
  }, [scalePage]);
}
