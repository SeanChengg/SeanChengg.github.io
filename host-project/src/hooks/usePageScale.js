import { useEffect, useCallback } from 'react';

export default function usePageScale() {
  const scalePage = useCallback(() => {
    const w = document.querySelector('.page-scale-wrapper');
    if (!w) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    w.style.transform = 'scale(' + s + ')';
    document.body.style.height = (9062 * s) + 'px';
  }, []);

  useEffect(() => {
    scalePage();
    window.addEventListener('resize', scalePage);
    return () => window.removeEventListener('resize', scalePage);
  }, [scalePage]);
}
