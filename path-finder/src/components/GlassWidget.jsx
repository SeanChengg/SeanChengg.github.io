import PixelBlocksBg from './PixelBlocksBg';

export default function GlassWidget({ style, children, small, pixelColor, diagramGlass }) {
  return (
    <div className={`gw ${small ? 'gw-sm' : ''} ${diagramGlass ? 'pf-gw-diagram-glass' : ''}`} style={style}>
      {/* diagramGlass: skip SVG filter plate — matches System Arch / Line Detection; Chrome keeps backdrop-filter working */}
      {!diagramGlass && <div className="gbg" />}
      {pixelColor && (
        <div className="gw-pixels">
          <PixelBlocksBg />
        </div>
      )}
      <div className={`gfr pf-liquid-glass ${diagramGlass ? 'pf-liquid-glass--diagram' : ''}`} />
      <div className="gc">{children}</div>
    </div>
  );
}
