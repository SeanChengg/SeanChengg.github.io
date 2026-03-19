import GlassCard from "@/components/shared/GlassCard";
import { CDN } from "@/lib/cdn";

const designFeatures = [
  { icon: "⏱", title: "Integrated Timer", desc: "The Runaway Teapot will be equipped with an in-built timer for the optimized steeping time for the tea being brewed." },
  { icon: "🔔", title: "Auditory Alert", desc: "For notification feature, the teapot will emit sound upon the completion of the brewing process, indicating that the tea is ready to be served." },
  { icon: "🏃", title: "Avoidance Mechanism", desc: "If an attempt is made to pick up the teapot before the timer concludes, it will run away thereby preventing premature interruption of the brewing process." },
  { icon: "📡", title: "Remote Controlled", desc: "The Runaway Teapot will be able to be controlled by an IR remote control for the user to reposition the teapot." },
];

export default function DesignFeaturesSection() {
  return (
    <div id="design-features" style={{ width: "1919px", height: "1200px", left: "0.75px", top: "3850px", position: "absolute" }}>
      {/* Pot_Logo + title — flex for vertical alignment */}
      <div
        style={{
          position: "absolute",
          left: "460px",
          top: "48.64px",
          display: "flex",
          alignItems: "center",
          gap: "11px",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}Pot_Logo.svg`}
          alt=""
          style={{
            width: "55px",
            height: "36px",
            flexShrink: 0,
            transform: "scaleY(-1) rotate(180deg)",
            objectFit: "contain",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "28.8px",
            color: "black",
          }}
        >
          Design Features
        </span>
      </div>

      {/* Video — runaway-teapot-demo.MOV */}
      <video
        style={{
          position: "absolute",
          left: "460.25px",
          top: "142.64px",
          width: "640px",
          height: "360px",
          borderRadius: "10px",
          boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
          objectFit: "cover",
        }}
        controls
        muted
        playsInline
      >
        <source src={CDN.video} type="video/quicktime" />
        <source src={CDN.video} type="video/mp4" />
      </video>

      {/* "Patience, Enforced by Design" text block */}
      <div
        style={{
          position: "absolute",
          left: "1110px",
          top: "90px",
          width: "640px",
          height: "400px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Serif Display',Georgia,serif",
            fontWeight: 400,
            fontSize: "36px",
            lineHeight: "48px",
            color: "#212121",
            marginBottom: "24px",
          }}
        >
          Patience, Enforced
          <br />
          by Design
        </div>
        <div
          style={{
            fontFamily: "'Zilla Slab',serif",
            fontWeight: 400,
            fontSize: "25px",
            lineHeight: "36px",
            color: "#555",
            textAlign: "justify",
            width: "533px",
          }}
        >
          The Runaway Teapot transforms waiting into engagement. By combining proximity sensing, omnidirectional movement, and timed brewing logic, it creates a playful interaction that ensures the perfect steep every time.
        </div>
      </div>

      {/* Feature cards grid 2×2 */}
      <div
        style={{
          position: "absolute",
          left: "460px",
          top: "530px",
          width: "1290px",
          height: "476px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {designFeatures.map((feature, idx) => (
          <GlassCard
            key={idx}
            style={{
              padding: "37px 41px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "28px" }}>{feature.icon}</span>
              <div
                style={{
                  color: "#212121",
                  fontSize: "24px",
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  lineHeight: "36px",
                }}
              >
                {feature.title}
              </div>
            </div>
            <div
              style={{
                color: "#404040",
                fontSize: "20px",
                fontFamily: "'Zilla Slab',serif",
                fontWeight: 400,
                lineHeight: "32px",
              }}
            >
              {feature.desc}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
