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
    const studio = sidebar.querySelector('.sn-studio');

    if (title) title.style.fontSize = (35 * s) + 'px';
    subs.forEach(el => { el.style.fontSize = (20 * s) + 'px'; });
    links.forEach(el => { el.style.fontSize = (25 * s) + 'px'; });
    if (studio) studio.style.fontSize = (25 * s) + 'px';

    links.forEach(el => {
      if (el.textContent.indexOf('Technical') !== -1 || el.textContent.indexOf('Next Stage') !== -1) {
        el.style.width = (240 * s) + 'px';
      }
    });
  }, []);

  const positionSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    const scrollY = window.scrollY;

    const startScroll = (93.37 + 137 + 156) * s;
    const nextStageScreenY = (4040.37 + 2028.63 + 137) * s;
    const sidebarHeight = sidebar.offsetHeight;
    const stopScroll = nextStageScreenY - sidebarHeight - (80 * s);

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

    window.addEventListener('resize', () => {
      scaleSidebar();
      positionSidebar();
    });
    window.addEventListener('scroll', positionSidebar);

    return () => {
      window.removeEventListener('resize', scaleSidebar);
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
      } else if (targetId === 'host-studio') {
        const s = Math.min(window.innerWidth / 1920, 1);
        const hostStudioTop = (7515 + 137) * s;
        targetScroll = hostStudioTop - (20 * s);
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
      <div className="sn-title" style={{ color: '#212121', fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400 }}>The Host</div>
      <div className="sn-sub" style={{ color: '#737373', fontFamily: 'Arial,sans-serif', fontWeight: 400 }}>A Westworld-Inspired<br />Mechatronic Design</div>
      <div className="sn-sub" style={{ color: '#737373', fontFamily: 'Arial,sans-serif', fontWeight: 400 }}>Ongoing project since 2024</div>
      <a href="#top" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Overview</a>
      <a href="#panel-architecture" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Panel Architecture</a>
      <a href="#core-mechanism" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Core Mechanism</a>
      <a href="#technical-workflow" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Technical Design & Production Workflow</a>
      <a href="#next-stage" className="sn-link" style={{ color: '#686868', fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: 'none' }}>Next Stage</a>
      <a href="#host-studio" className="sn-studio" style={{ color: '#686868', fontFamily: "'zihunaotushijieti_T',Georgia,serif", fontWeight: 400, textDecoration: 'none' }}>The Host Studio</a>
    </div>
  );
}
