import PixelBlocksBg from './PixelBlocksBg';

export default function GlassWidget({ style, children, small, pixelColor }) {
  return (
    <div className={`gw ${small ? 'gw-sm' : ''}`} style={style}>
      <div className="gbg" />
      {pixelColor && (
        <div className="gw-pixels">
          <PixelBlocksBg />
        </div>
      )}
      <div className="gfr pf-liquid-glass" />
      <div className="gc">{children}</div>
    </div>
  );
}
