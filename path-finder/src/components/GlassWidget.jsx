import PixelBlocksBg from './PixelBlocksBg';

export default function GlassWidget({ style, children, small, pixelColor, pixelCount }) {
  return (
    <div className={`gw ${small ? 'gw-sm' : ''}`} style={style}>
      <div className="gbg" />
      {pixelColor && (
        <PixelBlocksBg color={pixelColor} blockCount={pixelCount ?? 8} small={small} />
      )}
      <div className="gfr" />
      <div className="gc">{children}</div>
    </div>
  );
}
