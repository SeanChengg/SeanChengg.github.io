import { useState, useRef, useEffect, useCallback } from 'react';

export default function PanelViewer({ base, total, style = {} }) {
  const [current, setCurrent] = useState(0);
  const playingRef = useRef(true);
  const activeRef = useRef(null);
  const currentRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  const frameSrcs = useRef(
    Array.from({ length: total }, (_, i) => `${base}${i + 1}.png`)
  ).current;

  // Preload frames once
  useEffect(() => {
    frameSrcs.forEach(src => { const p = new Image(); p.src = src; });
  }, []);

  const show = useCallback((n) => {
    const idx = ((n % total) + total) % total;
    currentRef.current = idx;
    setCurrent(idx);
  }, [total]);

  // Auto-play loop — NO dependency on `current` state
  useEffect(() => {
    const tick = (time) => {
      if (playingRef.current && !activeRef.current) {
        if (time - lastTimeRef.current > 150) {
          show(currentRef.current + 1);
          lastTimeRef.current = time;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [show]);

  // Drag handlers — registered once
  useEffect(() => {
    const handleMove = (e) => {
      if (!activeRef.current) return;
      const { startX, startFrame, scale } = activeRef.current;
      const dx = (e.clientX - startX) / scale;
      const frameDelta = Math.round(dx / 20);
      show(startFrame + frameDelta);
    };

    const handleUp = () => {
      if (!activeRef.current) return;
      playingRef.current = true;
      activeRef.current = null;
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [show]);

  const handleMouseDown = (e) => {
    const wrapper = document.querySelector('.page-scale-wrapper');
    const scale = wrapper ? (wrapper.getBoundingClientRect().width / 1920) : 1;
    activeRef.current = {
      startX: e.clientX,
      startFrame: currentRef.current,
      scale,
    };
    playingRef.current = false;
    e.preventDefault();
  };

  return (
    <img
      src={frameSrcs[current]}
      alt=""
      style={{
        width: 713, height: 401, left: -34, top: 45, position: 'absolute',
        objectFit: 'contain', cursor: 'grab', userSelect: 'none',
        ...style
      }}
      onMouseDown={handleMouseDown}
      draggable={false}
    />
  );
}
