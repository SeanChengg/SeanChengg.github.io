import { useEffect, useRef, useCallback } from 'react';

export default function Sidebar() {
  const sidebarRef = useRef(null);

  const scaleSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    sidebar.style.left = (100 * s) + 'px';
    sidebar.style.width = (240 * s) + 'px';
    sidebar.style.gap = (24 * s) + 'px';

    const title = sidebar.querySelector('.sn-title');
    const subs = sidebar.querySelectorAll('.sn-sub');
    const links = sidebar.querySelectorAll('.sn-link');

    if (title) title.style.fontSize = (35 * s) + 'px';
    subs.forEach(el => { el.style.fontSize = (20 * s) + 'px'; });
    links.forEach(el => { el.style.fontSize = (25 * s) + 'px'; });
  }, []);

  const positionSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    const scrollY = window.scrollY;

    const startScroll = 230 * s;
    const stopScroll = 3600 * s;

    sidebar.style.position = 'fixed';

    if (scrollY < startScroll) {
      sidebar.style.top = ((startScroll - scrollY) + (30 * s)) + 'px';
      sidebar.style.opacity = '1';
      sidebar.style.pointerEvents = 'auto';
    } else if (scrollY < stopScroll) {
      sidebar.style.top = (30 * s) + 'px';
      sidebar.style.opacity = '1';
      sidebar.style.pointerEvents = 'auto';
    } else {
      sidebar.style.opacity = '0';
      sidebar.style.pointerEvents = 'none';
    }
  }, []);

  useEffect(() => {
    scaleSidebar();
    positionSidebar();

    const onResize = () => { scaleSidebar(); positionSidebar(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', positionSidebar);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', positionSidebar);
    };
  }, [scaleSidebar, positionSidebar]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      let targetScroll;

      if (targetId === 'top') {
        targetScroll = 0;
      } else {
        const target = document.getElementById(targetId);
        if (!target) return;
        const s = Math.min(window.innerWidth / 1920, 1);
        const rect = target.getBoundingClientRect();
        targetScroll = window.scrollY + rect.top - (20 * s);
      }

      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    sidebar.addEventListener('click', handleClick);
    return () => sidebar.removeEventListener('click', handleClick);
  }, []);

  return (
    <div
      id="sidebar-nav"
      ref={sidebarRef}
      style={{
        position: 'fixed', top: -9999, left: 0,
        flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
        display: 'inline-flex', zIndex: 1000, pointerEvents: 'auto',
        transition: 'opacity 0.3s ease'
      }}
    >
      <div className="sn-title" style={{ color: '#212121', fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400 }}>Archer Ring</div>
      <div className="sn-sub" style={{ color: '#737373', fontFamily: 'Arial,sans-serif', fontWeight: 400 }}>Modularized Archer Ring<br />925 Silver &amp; Jadeite</div>
      <div className="sn-sub" style={{ color: '#737373', fontFamily: 'Arial,sans-serif', fontWeight: 400 }}>2020</div>
      <a href="#top" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Overview</a>
      <a href="#gallery" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Gallery</a>
      <a href="#description" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Description</a>
    </div>
  );
}
