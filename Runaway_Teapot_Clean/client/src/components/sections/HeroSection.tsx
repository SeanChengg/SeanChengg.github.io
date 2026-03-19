import { CDN } from "@/lib/cdn";

export default function HeroSection() {
  return (
    <div id="top" style={{ width: "1823px", height: "820px", left: "48.75px", top: "93.37px", position: "absolute", overflow: "visible" }}>
      {/* Hero image */}
      <img
        style={{
          width: "700px",
          height: "1050px",
          left: "1175px",
          top: "-229.72px",
          position: "absolute",
          objectFit: "contain",
        }}
        src={CDN.teapotHeroFull}
        alt="The Runaway Teapot"
      />

      {/* Pot_Logo */}
      <img
        src={`${import.meta.env.BASE_URL}Pot_Logo.svg`}
        alt=""
        style={{
          position: "absolute",
          left: "418px",
          top: "150.28px",
          width: "55px",
          height: "36px",
          transform: "scaleY(-1) rotate(180deg)",
          objectFit: "contain",
        }}
      />
      {/* Subtitle bar */}
      <div
        style={{
          position: "absolute",
          left: "484.5px",
          top: "158.28px",
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "30px",
          color: "#212121",
        }}
      >
        The Runaway Teapot — Interactive Mechatronic Design
      </div>

      {/* Mixed-font "Let It Steep" heading */}
      <div
        style={{
          position: "absolute",
          left: "413.5px",
          top: "239.28px",
          width: "733px",
          height: "178px",
          letterSpacing: "1px",
          color: "black",
        }}
      >
        <span style={{ fontFamily: "'zihunaotushijieti_T', Georgia, serif", fontSize: "140px", lineHeight: "125px" }}>Let</span>
        <span style={{ fontSize: "100px" }}> </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200, fontSize: "90px", lineHeight: "125px" }}>It</span>
        <span style={{ fontSize: "100px" }}> </span>
        <span style={{ fontFamily: "'zihunaotushijieti_T', Georgia, serif", fontSize: "140px", lineHeight: "125px" }}>Steep</span>
      </div>

      {/* Body text */}
      <div
        style={{
          position: "absolute",
          left: "412.5px",
          top: "477.28px",
          width: "829px",
          fontFamily: "'Zilla Slab',serif",
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: "45px",
          letterSpacing: "0.6px",
          color: "#212121",
        }}
      >
        The Runaway Teapot is designed to revolutionize the traditional tea-brew process, adding elements of interaction, precision, and fun to the brewing experience. It runs away when you try to grab it before the tea is ready.
      </div>
    </div>
  );
}
