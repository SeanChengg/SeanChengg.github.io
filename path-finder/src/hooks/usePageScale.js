import { useEffect, useCallback } from 'react';
import { PAGE_SCROLL_HEIGHT } from '../pageLayout';

export default function usePageScale() {
  const scalePage = useCallback(() => {
    const w = document.querySelector('.page-scale-wrapper');
    if (!w) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    w.style.transform = 'scale(' + s + ')';
    document.body.style.height = (PAGE_SCROLL_HEIGHT * s) + 'px';
  }, []);

  useEffect(() => {
    scalePage();
    window.addEventListener('resize', scalePage);
    return () => window.removeEventListener('resize', scalePage);
  }, [scalePage]);
}
