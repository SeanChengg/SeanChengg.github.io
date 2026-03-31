import { useCallback, useRef, useState } from 'react';

const THEMES = {
  teal: {
    base: 'rgba(104, 182, 187, 0.28)',
    hot: 'rgba(104, 182, 187, 0.92)',
    glow: 'rgba(192, 240, 237, 0.55)',
  },
  purple: {
    base: 'rgba(153, 140, 210, 0.28)',
    hot: 'rgba(120, 95, 200, 0.9)',
    glow: 'rgba(200, 190, 245, 0.5)',
  },
  amber: {
    base: 'rgba(245, 180, 90, 0.32)',
    hot: 'rgba(217, 119, 6, 0.95)',
    glow: 'rgba(255, 220, 160, 0.55)',
  },
};

/**
 * Grid pixel layer: blocks brighten near cursor (no random scatter noise).
 */
export default function PixelBlocksBgDapper({
  pixelColor = 'teal',
  blockSize = 18,
  gapSize = 3,
  influenceRadius = 120,
}) {
  const rootRef = useRef(null);
  const [pointer, setPointer] = useState(null);
  const theme = THEMES[pixelColor] ?? THEMES.teal;

  const onMove = useCallback(
    (e) => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPointer({ x: e.clientX - r.left, y: e.clientY - r.top });
    },
    []
  );

  const onLeave = useCallback(() => setPointer(null), []);

  const cell = blockSize + gapSize;
  const radius = Math.max(48, influenceRadius);

  return (
    <div
      ref={refCb}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 'inherit',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <GridBlocks
        cell={cell}
        blockSize={blockSize}
        gapSize={gapSize}
        pointer={pointer}
        radius={radius}
        theme={theme}
      />
    </div>
  );
}

function GridBlocks({ cell, blockSize, gapSize, pointer, radius, theme }) {
  const rootRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const refCb = useCallback((el) => {
    rootRef.current = el;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    });
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const cols = Math.ceil(dims.w / cell) + 1;
  const rows = Math.ceil(dims.h / cell) + 1;
  const blocks = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = col * cell;
      const top = row * cell;
      const cx = left + blockSize / 2;
      const cy = top + blockSize / 2;
      let t = 0;
      if (pointer) {
        const dx = cx - pointer.x;
        const dy = cy - pointer.y;
        const d = Math.hypot(dx, dy);
        t = Math.max(0, 1 - d / radius);
        t = t * t * (3 - 2 * t);
      }
      const bg =
        t > 0.08
          ? `color-mix(in srgb, ${theme.hot} ${Math.round(t * 100)}%, ${theme.base})`
          : theme.base;
      blocks.push(
        <div
          key={`${row}-${col}`}
          style={{
            position: 'absolute',
            left,
            top,
            width: blockSize,
            height: blockSize,
            borderRadius: 4,
            background: bg,
            boxShadow:
              t > 0.15 ? `0 0 12px ${theme.glow}` : '0 1px 2px rgba(0,0,0,0.06)',
            pointerEvents: 'none',
            transition: pointer ? 'background 0.08s ease, box-shadow 0.08s ease' : undefined,
          }}
        />
      );
    }
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {blocks}
    </div>
  );
}
