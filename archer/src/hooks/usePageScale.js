import { useEffect, useCallback } from 'react';

export default function usePageScale(pageHeight = 4200) {
  const scalePage = useCallback(() => {
    const w = document.querySelector('.page-scale-wrapper');
    if (!w) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    w.style.transform = 'scale(' + s + ')';
    document.body.style.height = (pageHeight * s) + 'px';
  }, [pageHeight]);

  useEffect(() => {
    scalePage();
    window.addEventListener('resize', scalePage);
    return () => window.removeEventListener('resize', scalePage);
  }, [scalePage]);
}
