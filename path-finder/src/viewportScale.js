import { ARTBOARD_WIDTH } from './pageLayout';

/**
 * Width used for artboard scale — must match everywhere we compute `s` (usePageScale, Sidebar).
 * visualViewport when present; otherwise clientWidth (excludes classic scrollbar, stable vs innerWidth).
 */
export function getViewportWidthForScale() {
  if (typeof window === 'undefined') return ARTBOARD_WIDTH;
  const vv = window.visualViewport?.width;
  if (vv != null && vv > 0) return vv;
  const cw = document.documentElement?.clientWidth;
  if (cw != null && cw > 0) return cw;
  return window.innerWidth;
}

export function getArtboardScale() {
  return Math.min(getViewportWidthForScale() / ARTBOARD_WIDTH, 1);
}
