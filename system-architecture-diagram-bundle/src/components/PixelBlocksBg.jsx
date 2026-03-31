import { useMemo, useState, useEffect, useRef } from 'react';

/** Hard ceiling — never more than 10×10 squares per instance (GPU). */
export const MAX_BLOCKS_CAP = 100;

/**
 * animated     Seamless loop (pfPixelChaos in App.css): drift + opacity + scale, no position jumps.
 * driftScale   How far each block wanders in px (relative to min glass side).
 */
export const PIXEL_BLOCKS_DEFAULTS = {
  sizeFractions: [
    0.36, 0.52, 0.44, 0.68, 0.58, 0.41, 0.62, 0.48, 0.72, 0.54, 0.39, 0.66,
    0.46, 0.59, 0.43, 0.71, 0.51, 0.64, 0.47, 0.56,
  ],
  maxBlockRatio: 0.62,
  minBlockPx: 10,
  maxBlocks: 20,
  animated: true,
  driftScale: 0.14,

  zLayers: 11,
  animDelayIndexMod: 47,
  animDelayStep: 0.06,
  animDurationBase: 4.2,
  animDurationIndexMod: 7,
  animDurationStep: 0.35,

  cornerRadius: 6,
};

export function mergePixelBlocksConfig(partial) {
  if (!partial || typeof partial !== 'object') return { ...PIXEL_BLOCKS_DEFAULTS };
  return {
    ...PIXEL_BLOCKS_DEFAULTS,
    ...partial,
    sizeFractions: partial.sizeFractions ?? PIXEL_BLOCKS_DEFAULTS.sizeFractions,
  };
}

/**
 * Colour families: 0 = turquoise, 1 = soft navy, 2 = vintage gold.
 * Edit FAMILY_CYCLE to change how often each appears — use more `2` entries for more gold.
 * Examples: [0,1,2] even thirds | [0,1,2,2,2] mostly gold | [2,2,2,0,1] gold-heavy
 */
const FAMILY_CYCLE = [0, 1, 0, 2, 2];

const PALETTE = {
  turquoise: 'rgba(104, 182, 187, 0.5)',
  turquoiseLight: 'rgba(192, 240, 237, 0.44)',
  navySoft: 'rgba(153, 190, 241, 0.46)',
  navyMist: 'rgba(164, 179, 201, 0.42)',
  /** Stronger / warmer gold: raise R, slightly lower G/B, or alpha — e.g. rgba(210, 165, 85, 0.52) */
  goldVintage: 'rgba(235, 216, 122, 0.52)',
  goldAntique: 'rgba(185, 184, 140, 0.48)',
};

function pickFill(index) {
  const bright = index % 2 === 0;
  const family = FAMILY_CYCLE[index % FAMILY_CYCLE.length];
  if (family === 0) return bright ? PALETTE.turquoiseLight : PALETTE.turquoise;
  if (family === 1) return bright ? PALETTE.navyMist : PALETTE.navySoft;
  return bright ? PALETTE.goldAntique : PALETTE.goldVintage;
}

function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

function frac01(x) {
  return x - Math.floor(x);
}

function hash01(i, salt) {
  return frac01(i * 0.618033988749895 + salt * 0.381966011250105 + i * salt * 0.019);
}

function scatterUV(i) {
  const phi = 0.618033988749895;
  const psi = 0.7548776662466927;
  let u = frac01((i + 1) * phi);
  let v = frac01((i + 1) * psi);
  u = frac01(u + hash01(i, 2.17) * 0.09);
  v = frac01(v + hash01(i, 3.91) * 0.09);
  return { u, v };
}

function placeTopLeft(u, v, w, h, s) {
  return {
    left: u * (w + s) - s,
    top: v * (h + s) - s,
  };
}

/** Three drift points for closed-loop keyframes (matches App.css pfPixelChaos) */
function driftVars(i, mag) {
  const p = (salt) => {
    const x = (hash01(i, salt) * 2 - 1) * mag * (0.55 + hash01(i, salt + 1) * 0.9);
    const y = (hash01(i, salt + 9) * 2 - 1) * mag * (0.55 + hash01(i, salt + 2) * 0.9);
    return { x: `${x.toFixed(2)}px`, y: `${y.toFixed(2)}px` };
  };
  const a = p(1);
  const b = p(4);
  const c = p(8);
  return {
    '--dx1': a.x,
    '--dy1': a.y,
    '--dx2': b.x,
    '--dy2': b.y,
    '--dx3': c.x,
    '--dy3': c.y,
  };
}

export default function PixelBlocksBg({ maxBlocks: maxBlocksProp, config: configPartial }) {
  const cfg = useMemo(() => {
    const base = mergePixelBlocksConfig(configPartial);
    return {
      ...base,
      maxBlocks: maxBlocksProp != null ? maxBlocksProp : base.maxBlocks,
    };
  }, [configPartial, maxBlocksProp]);

  const rootRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const blocks = useMemo(() => {
    const { w, h } = dims;
    if (w < 8 || h < 8) return [];

    const m = Math.min(w, h);
    const maxBlock = Math.floor(m * cfg.maxBlockRatio);
    const fracs = cfg.sizeFractions;
    const driftMag = clamp(m * (cfg.driftScale ?? 0.14), 8, 36);

    const n = Math.min(MAX_BLOCKS_CAP, Math.max(1, cfg.maxBlocks));
    const out = [];

    for (let i = 0; i < n; i++) {
      const frac = fracs[i % fracs.length];
      const raw = Math.floor(m * frac);
      const s = clamp(raw, cfg.minBlockPx, maxBlock);
      if (s < 4) continue;

      const { u, v } = scatterUV(i);
      const { left, top } = placeTopLeft(u, v, w, h, s);

      const duration =
        cfg.animDurationBase +
        (i % cfg.animDurationIndexMod) * cfg.animDurationStep +
        (i % 11) * 0.12;
      const delay =
        (i % cfg.animDelayIndexMod) * cfg.animDelayStep +
        frac01(i * 0.237) * 3.2;

      out.push({
        key: `s-${i}`,
        left,
        top,
        size: s,
        fill: pickFill(i),
        z: 1 + (i % cfg.zLayers),
        delay,
        duration,
        drift: driftVars(i, driftMag),
      });
    }

    return out;
  }, [dims.w, dims.h, cfg]);

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {blocks.map((b) => (
        <div
          key={b.key}
          className="pf-pixel-block"
          style={{
            position: 'absolute',
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: cfg.cornerRadius,
            background: b.fill,
            zIndex: b.z,
            boxShadow: '0 1px 4px rgba(35, 55, 75, 0.12)',
            ...b.drift,
            animation: cfg.animated
              ? `pfPixelChaos ${b.duration}s linear ${b.delay}s infinite`
              : undefined,
          }}
        />
      ))}
    </div>
  );
}
