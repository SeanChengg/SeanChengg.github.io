export default function GlassWidget({ style, children, small }) {
  return (
    <div className={`gw ${small ? 'gw-sm' : ''}`} style={style}>
      <div className="gbg" />
      <div className="gfr" />
      <div className="gc">{children}</div>
    </div>
  );
}
