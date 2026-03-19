interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        borderRadius: "12px",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        backdropFilter: "blur(4px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
