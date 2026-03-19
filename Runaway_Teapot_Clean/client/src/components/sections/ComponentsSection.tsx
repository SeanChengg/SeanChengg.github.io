import GlassCard from "@/components/shared/GlassCard";
import { CDN } from "@/lib/cdn";

// Adjust Meccanum image positions here (px) — add transform: "rotate(Xdeg)" for rotation
const meccanum2Pos = { left: 470.5, top: 1200.64, width: 662, height: 333 };
const meccanum3Pos = { left: 1046.5, top: 1060.64, width: 661, height: 345 };

const components = [
  { name: "DC Motors", desc: "4x brushed DC motors driving each mecanum wheel independently for omnidirectional movement" },
  { name: "Mecanum Wheels", desc: "Omnidirectional wheels with angled rollers enabling lateral, diagonal, and rotational motion" },
  { name: "Raspberry Pi Pico", desc: "Compact microcontroller handling motor control, sensor input, timer logic, and IR decoding" },
  { name: "VL53L0X Laser Sensors", desc: "Time-of-flight distance sensors detecting nearby objects to trigger avoidance behavior" },
  { name: "IR Remote Controller", desc: "Infrared remote for manual repositioning and control of the teapot cart" },
];

export default function ComponentsSection() {
  return (
    <div id="components" style={{ width: "1919px", height: "1500px", left: "0.75px", top: "2300px", position: "absolute" }}>
      {/* Pot_Logo */}
      <img
        src={`${import.meta.env.BASE_URL}Pot_Logo.svg`}
        alt=""
        style={{ position: "absolute", left: "460px", top: "1.64px", width: "55px", height: "36px", transform: "scaleY(-1) rotate(180deg)", objectFit: "contain" }}
      />
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          left: "532.5px",
          top: "11.64px",
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "28.8px",
          color: "#212121",
        }}
      >
        Components
      </div>

      {/* Gray rectangle + Electronics image */}
      <div
        style={{
          position: "absolute",
          left: "460.5px",
          top: "77.64px",
          width: "1248px",
          height: "537px",
          background: "#BCBBBB",
          borderRadius: "10px",
        }}
      >
        <img
          src={CDN.electronics}
          alt="Electronics flat-lay"
          style={{
            position: "absolute",
            left: "275px",
            top: "51px",
            width: "698px",
            height: "479px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Component cards — Row 1: three 400px cards */}
      <div
        style={{
          position: "absolute",
          left: "460px",
          top: "640px",
          width: "1290px",
          display: "flex",
          gap: "24px",
        }}
      >
        {components.slice(0, 3).map((comp, idx) => (
          <GlassCard key={idx} style={{ width: "400px", padding: "29px 33px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ color: "#C4913A", fontSize: "22px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: "33px" }}>
              {comp.name}
            </div>
            <div style={{ color: "#404040", fontSize: "18px", fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: "28px" }}>
              {comp.desc}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Component cards — Row 2: two wider cards */}
      <div
        style={{
          position: "absolute",
          left: "460px",
          top: "849px",
          width: "1290px",
          display: "flex",
          gap: "24px",
        }}
      >
        {components.slice(3).map((comp, idx) => (
          <GlassCard key={idx} style={{ width: idx === 0 ? "620px" : "604px", padding: "29px 33px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ color: "#C4913A", fontSize: "22px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: "33px" }}>
              {comp.name}
            </div>
            <div style={{ color: "#404040", fontSize: "18px", fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: "28px" }}>
              {comp.desc}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Bottom images — adjust meccanum2Pos / meccanum3Pos above to reposition */}
      <img
        src={CDN.meccanum2}
        alt="Mecanum wheels"
        style={{
          position: "absolute",
          left: `${meccanum2Pos.left}px`,
          top: `${meccanum2Pos.top}px`,
          width: `${meccanum2Pos.width}px`,
          height: `${meccanum2Pos.height}px`,
          opacity: 0.8,
          objectFit: "cover",
          objectPosition: "center center",
          borderRadius: "16px",
        }}
      />
      <img
        src={CDN.meccanum3}
        alt="Mecanum prototype"
        style={{
          position: "absolute",
          left: `${meccanum3Pos.left}px`,
          top: `${meccanum3Pos.top}px`,
          width: `${meccanum3Pos.width}px`,
          height: `${meccanum3Pos.height}px`,
          opacity: 0.8,
          objectFit: "cover",
          objectPosition: "center center",
          borderRadius: "16px",
        }}
      />
    </div>
  );
}
