import { useEffect, useCallback } from 'react';
import { PAGE_SCROLL_HEIGHT } from '../pageLayout';

export default function usePageScale() {
  const scalePage = useCallback(() => {
    const w = document.querySelector('.page-scale-wrapper');
    if (!w) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    /*
     * Chrome often drops backdrop-filter when any ancestor has transform().
     * If the viewport is ≥1920px wide, skip transform entirely (not just scale(1))
     * so frosted glass (pf-liquid-glass) keeps working on desktop GitHub Pages.
     */
    if (s >= 1) {
      w.style.transform = 'none';
    } else {
      w.style.transform = 'translate3d(0, 0, 0) scale(' + s + ')';
    }
    const sh = PAGE_SCROLL_HEIGHT * s;
    document.body.style.height = sh + 'px';
    /* When document is shorter than the viewport, grey body bg shows under the footer — paint black in that strip */
    const bottomFill = Math.max(0, window.innerHeight - sh);
    document.body.style.setProperty('--pf-bottom-fill', bottomFill + 'px');
  }, []);

  useEffect(() => {
    scalePage();
    window.addEventListener('resize', scalePage);
    return () => window.removeEventListener('resize', scalePage);
  }, [scalePage]);
}
