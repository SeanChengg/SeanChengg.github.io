interface SectionHeaderProps {
  title: string;
  color?: string;
}

export default function SectionHeader({ title, color = "#212121" }: SectionHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <img
        src={`${import.meta.env.BASE_URL}Pot_Logo.svg`}
        alt=""
        style={{
          width: "55px",
          height: "36px",
          transform: "scaleY(-1) rotate(180deg)",
          objectFit: "contain",
        }}
      />
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "28.8px",
          color,
        }}
      >
        {title}
      </div>
    </div>
  );
}
