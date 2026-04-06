import { useEffect, useRef, useCallback } from 'react';
import { FOOTER_TOP } from '../pageLayout';
import { getArtboardScale } from '../viewportScale';

export default function Sidebar() {
  const sidebarRef = useRef(null);

  const scaleSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const s = getArtboardScale();
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
    const s = getArtboardScale();
    const scrollY = window.scrollY;

    const startScroll = (93.37 + 137 + 156) * s;
    const footerEl = document.getElementById('site-footer');
    let stopScroll;
    if (footerEl) {
      const footerTop = footerEl.getBoundingClientRect().top + scrollY;
      stopScroll = footerTop - sidebar.offsetHeight - (80 * s);
    } else {
      stopScroll = (FOOTER_TOP + 137) * s - sidebar.offsetHeight - (80 * s);
    }
    const sidebarHeight = sidebar.offsetHeight;

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
        const s = getArtboardScale();
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
      <div className="sn-title" style={{ color: '#212121', fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400 }}>Path Finder</div>
      <div className="sn-sub" style={{ color: '#737373', fontFamily: 'Arial,sans-serif', fontWeight: 400 }}>Autonomous Line-Following<br />Robot</div>
      <div className="sn-sub" style={{ color: '#737373', fontFamily: 'Arial,sans-serif', fontWeight: 400 }}>Northwestern ME433 · 2026</div>
      <a href="#top" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Overview</a>
      <a href="#system-architecture" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>System Architecture</a>
      <a href="#hardware" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Hardware</a>
      <a href="#line-detection" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Line Detection</a>
      <a href="#motor-control" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Motor Control & PID</a>
      <a href="#integration" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Integration</a>
    </div>
  );
}
