import GlassCard from "@/components/shared/GlassCard";
import { CDN } from "@/lib/cdn";

const howItWorksSteps = [
  { step: 1, title: "Start Brewing", desc: "Place your teapot on the cart and press the yellow button. The built-in timer begins counting down (preset for 1 minute).", position: "left" as const },
  { step: 2, title: "Wait Patiently", desc: "Try to grab your tea early? The laser sensors detect your approach and the teapot automatically rolls away from you.", position: "right" as const },
  { step: 3, title: "Tea is Ready", desc: "When the timer finishes, an audible alert signals that your tea has steeped to perfection. Now you can pick it up!", position: "left" as const },
  { step: 4, title: "Remote Control", desc: "Need to reposition the teapot? Use the IR remote to move it wherever you want.", position: "right" as const },
];

export default function ConceptSection() {
  return (
    <div id="concept" style={{ width: "1919px", height: "1350px", left: "1px", top: "950px", position: "absolute" }}>
      {/* Pot_Logo */}
      <img
        src={`${import.meta.env.BASE_URL}Pot_Logo.svg`}
        alt=""
        style={{
          position: "absolute",
          left: "457.25px",
          top: "-66.36px",
          width: "55px",
          height: "36px",
          transform: "scaleY(-1) rotate(180deg)",
          objectFit: "contain",
        }}
      />
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          left: "529.25px",
          top: "-56.36px",
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "28.8px",
          color: "#212121",
        }}
      >
        Concept
      </div>

      {/* Description text */}
      <div
        style={{
          position: "absolute",
          left: "457.25px",
          top: "12.64px",
          width: "1094px",
          fontFamily: "'Zilla Slab',serif",
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: "45px",
          letterSpacing: "0.6px",
          color: "rgba(0,0,0,0.8)",
          textAlign: "justify",
        }}
      >
        The Runaway Teapot reimagines the ritual of tea brewing as an interactive experience. Rather than passively waiting for tea to steep, the user engages with a playful robotic companion that enforces patience through movement and proximity sensing.
      </div>

      {/* Mecanum concept image */}
      <div
        style={{
          position: "absolute",
          left: "634.25px",
          top: "195.64px",
          width: "740px",
          height: "418px",
          borderRadius: "16px",
          overflow: "hidden",
          opacity: 0.8,
        }}
      >
        <img
          src={CDN.meccanum1}
          alt="Runaway Teapot concept"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* How It Works title */}
      <div
        style={{
          position: "absolute",
          left: "468.25px",
          top: "617.64px",
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 400,
          fontSize: "32px",
          color: "#212121",
        }}
      >
        How It Works
      </div>

      {/* Arrow 1: Card 1 → Card 2 (down-right) */}
      <img
        src={`${import.meta.env.BASE_URL}Arrow.svg`}
        alt=""
        style={{ position: "absolute", left: "1078px", top: "772.64px", width: "46px", height: "61px" }}
      />
      {/* Arrow 2: Card 2 → Card 3 (down-left, flipped) */}
      <img
        src={`${import.meta.env.BASE_URL}Arrow.svg`}
        alt=""
        style={{ position: "absolute", left: "1058px", top: "927.64px", width: "46px", height: "61px", transform: "scaleX(-1)" }}
      />
      {/* Arrow 3: Card 3 → Card 4 (down-right) */}
      <img
        src={`${import.meta.env.BASE_URL}Arrow.svg`}
        alt=""
        style={{ position: "absolute", left: "1078px", top: "1083.64px", width: "46px", height: "61px" }}
      />

      {/* Staggered step cards */}
      {howItWorksSteps.map((s) => (
        <div key={s.step}>
          {/* Card */}
          <div
            style={{
              position: "absolute",
              left: s.position === "left" ? "458.25px" : "1095.25px",
              top: s.step === 1 ? "682.64px" : s.step === 2 ? "837.64px" : s.step === 3 ? "993.64px" : "1150.64px",
              width: "620px",
              height: "180px",
            }}
          >
            <GlassCard
              style={{
                padding: "28px 32px",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#C4913A",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter,sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {s.step}
                </div>
                <div
                  style={{
                    color: "#212121",
                    fontSize: "22px",
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {s.title}
                </div>
              </div>
              <div
                style={{
                  color: "#404040",
                  fontSize: "20px",
                  fontFamily: "'Zilla Slab',serif",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                {s.desc}
              </div>
            </GlassCard>
          </div>
        </div>
      ))}
    </div>
  );
}
