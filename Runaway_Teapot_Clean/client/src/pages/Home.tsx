import { useEffect, useCallback } from "react";
import { CDN } from "@/lib/cdn";
import Sidebar from "@/components/Sidebar";
import BackButton from "@/components/BackButton";

/* ──────────────────────────────────────────────
   Teapot icon SVG inline (replaces the Host head icon)
   ────────────────────────────────────────────── */
function TeapotIcon({ size = 50, color = "#C4913A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="38" rx="18" ry="14" fill={color} opacity="0.9" />
      {/* Lid */}
      <rect x="22" y="24" width="20" height="4" rx="2" fill={color} />
      <circle cx="32" cy="22" r="3" fill={color} />
      {/* Spout */}
      <path d="M14 34 Q6 30 8 24" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Handle */}
      <path d="M50 32 Q58 32 58 40 Q58 48 50 44" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Steam */}
      <path d="M28 18 Q26 12 28 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M32 17 Q30 10 32 6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M36 18 Q34 12 36 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Component data from Figma Frame 2
   ────────────────────────────────────────────── */
const components = [
  { name: "DC Motors", desc: "4x brushed DC motors driving each mecanum wheel independently for omnidirectional movement" },
  { name: "Mecanum Wheels", desc: "Omnidirectional wheels with angled rollers enabling lateral, diagonal, and rotational motion" },
  { name: "Raspberry Pi Pico", desc: "Compact microcontroller handling motor control, sensor input, timer logic, and IR decoding" },
  { name: "VL53L0X Laser Sensors", desc: "Time-of-flight distance sensors detecting nearby objects to trigger avoidance behavior" },
  { name: "IR Remote Controller", desc: "Infrared remote for manual repositioning and control of the teapot cart" },
];

/* ──────────────────────────────────────────────
   Design features from Figma Frame 2
   ────────────────────────────────────────────── */
const designFeatures = [
  {
    title: "Integrated Timer",
    desc: "The Runaway Teapot will be equipped with an in-built timer for the optimized steeping time for the tea being brewed.",
    icon: "⏱",
  },
  {
    title: "Auditory Alert",
    desc: "For notification feature, the teapot will emit sound upon the completion of the brewing process, indicating that the tea is ready to be served.",
    icon: "🔔",
  },
  {
    title: "Avoidance Mechanism",
    desc: "If an attempt is made to pick up the teapot before the timer concludes, it will run away thereby preventing premature interruption of the brewing process.",
    icon: "🏃",
  },
  {
    title: "Remote Controlled",
    desc: "The Runaway Teapot will be able to be controlled by an IR remote control for the user to reposition the teapot.",
    icon: "📡",
  },
];

/* ──────────────────────────────────────────────
   Interaction levels from Figma Frame 1
   ────────────────────────────────────────────── */
const interactionLevels = [
  {
    level: "Macro",
    color: "#C4913A",
    items: ["The Runaway Teapot moves away from the user until the brewing timer completes."],
  },
  {
    level: "Meso",
    color: "#8B9D6B",
    items: [
      "Place the teapot on the cart and press the yellow button to start the brewing timer (preset for 1 minute).",
      "If approach the teapot during brewing, it automatically moves in the opposite direction.",
      "Once the timer finishes, it triggers an audible alert to signal the tea is ready.",
      "The teapot can also be manually repositioned using a remote controller.",
    ],
  },
  {
    level: "Micro",
    color: "#6B8B9D",
    items: ["Laser sensors detect the proximity of nearby objects."],
  },
];

export default function Home() {
  const scalePage = useCallback(() => {
    const w = document.querySelector(".page-scale-wrapper") as HTMLElement;
    if (!w) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    w.style.transform = "scale(" + s + ")";
    document.body.style.height = (5500 * s) + "px";
  }, []);

  useEffect(() => {
    scalePage();
    window.addEventListener("resize", scalePage);
    return () => window.removeEventListener("resize", scalePage);
  }, [scalePage]);

  return (
    <>
      <BackButton />
      <Sidebar />

      <div className="page-scale-wrapper" style={{ width: "1920px", position: "relative", background: "transparent" }}>
        <div style={{ width: "1919px", height: "5500px", left: "-0.25px", top: "0.37px", position: "absolute", background: "transparent" }}>
          <div style={{ width: "1947px", height: "5400px", left: 0, top: "137px", position: "absolute" }}>

            {/* ==================== HERO ==================== */}
            <div id="top" style={{ width: "1823px", height: "820px", left: "48.75px", top: "93.37px", position: "absolute" }}>
              {/* Hero image — size/position: width, height, left, top */}
              <img
                style={{
                  width: "700px",
                  height: "1050px",
                  left: "1175px",
                  top: "-120px",
                  position: "absolute",
                  objectFit: "contain",
                }}
                src={CDN.teapotHeroFull}
                alt="The Runaway Teapot"
              />

              {/* Title area */}
              <div style={{ width: "998px", height: "262px", left: "413px", top: "426px", position: "absolute" }}>
                <div style={{ width: "800px", height: "305px", left: "0px", top: "-326px", position: "absolute" }}>
                  <div style={{ width: "800px", height: "122px", left: "0px", top: "30px", position: "absolute", overflow: "hidden" }}>
                    <div style={{
                      left: "0px", top: 0, position: "absolute",
                      color: "#212121", fontSize: "110px",
                      fontFamily: "'DM Serif Display',Georgia,serif",
                      fontWeight: 400, lineHeight: "121.6px", letterSpacing: "1px"
                    }}>
                      Let It Steep
                    </div>
                  </div>
                </div>
                <div style={{
                  width: "820px", height: "184px", left: "0.25px", top: "38.63px", position: "absolute",
                  color: "#212121", fontSize: "28px",
                  fontFamily: "'Zilla Slab',serif", fontWeight: 400,
                  lineHeight: "44px", letterSpacing: "0.6px"
                }}>
                  The Runaway Teapot is designed to revolutionize the traditional tea-brew process, adding elements of interaction, precision, and fun to the brewing experience. It runs away when you try to grab it before the tea is ready.
                </div>
              </div>

              {/* Teapot icon + title bar */}
              <div style={{ width: "50px", height: "64px", left: "413px", top: "0px", position: "absolute", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TeapotIcon size={50} color="#C4913A" />
              </div>
              <div style={{ width: "890px", height: "28.8px", left: "473px", top: "21px", position: "absolute", overflow: "hidden" }}>
                <div style={{
                  width: "870px", height: "33px", left: "0px", top: "-3px", position: "absolute",
                  color: "#212121", fontSize: "28px",
                  fontFamily: "'Space Grotesk',Arial,sans-serif", fontWeight: 600, lineHeight: "30px"
                }}>
                  The Runaway Teapot — An Interactive Mechatronic Design
                </div>
              </div>
            </div>

            {/* ==================== CONCEPT (Interaction Levels) ==================== */}
            <div id="concept" style={{ width: "1919px", height: "1300px", left: "1px", top: "950px", position: "absolute" }}>
              <div style={{ width: "50px", height: "64px", left: "452px", top: "-1px", position: "absolute", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TeapotIcon size={50} color="#C4913A" />
              </div>
              <div style={{
                width: "328px", height: "28px", left: "515px", top: "20px", position: "absolute",
                color: "#212121", fontSize: "30px",
                fontFamily: "'Space Grotesk',Arial,sans-serif", fontWeight: 700, lineHeight: "28.8px"
              }}>
                Concept
              </div>

              {/* Section number */}
              <div style={{
                left: "452px", top: "80px", position: "absolute",
                color: "rgba(0,0,0,0.06)", fontSize: "180px",
                fontFamily: "'DM Serif Display',Georgia,serif", fontWeight: 400,
                lineHeight: "180px"
              }}>
                01
              </div>

              {/* Description text */}
              <div style={{
                width: "1300px", height: "120px", left: "452px", top: "84px", position: "absolute",
                textAlign: "justify", color: "black", fontSize: "28px",
                fontFamily: "'Zilla Slab',serif", fontWeight: 400,
                lineHeight: "44px", letterSpacing: "0.6px"
              }}>
                The Runaway Teapot reimagines the ritual of tea brewing as an interactive experience. Rather than passively waiting for tea to steep, the user engages with a playful robotic companion that enforces patience through movement and proximity sensing.
              </div>

              {/* Concept illustration */}
              <div style={{
                left: "452px", top: "240px",
                width: "1300px", height: "420px",
                position: "absolute",
                borderRadius: "16px",
                overflow: "hidden",
              }}>
                <img
                  src={CDN.teapotConceptFull}
                  alt="Runaway Teapot concept"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Interaction levels */}
              <div style={{ left: "452px", top: "700px", position: "absolute", width: "1300px" }}>
                {interactionLevels.map((level, idx) => (
                  <div key={idx} style={{ marginBottom: "36px" }}>
                    <div style={{
                      color: level.color, fontSize: "26px",
                      fontFamily: "'DM Serif Display',Georgia,serif",
                      fontWeight: 400, marginBottom: "12px"
                    }}>
                      {level.level}:
                    </div>
                    <ul style={{
                      listStyle: "disc", paddingLeft: "28px",
                      color: "#333", fontSize: "24px",
                      fontFamily: "'Zilla Slab',serif", fontWeight: 400,
                      lineHeight: "40px"
                    }}>
                      {level.items.map((item, i) => (
                        <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== COMPONENTS ==================== */}
            <div id="components" style={{ width: "1919px", height: "1500px", left: "0.75px", top: "2300px", position: "absolute" }}>
              <div style={{ width: "50px", height: "64px", left: "460px", top: "0px", position: "absolute", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TeapotIcon size={50} color="#C4913A" />
              </div>
              <div style={{
                width: "328px", height: "28px", left: "523px", top: "21px", position: "absolute",
                color: "#212121", fontSize: "30px",
                fontFamily: "'Space Grotesk',Arial,sans-serif", fontWeight: 700, lineHeight: "28.8px"
              }}>
                Components
              </div>

              {/* Section number */}
              <div style={{
                left: "460px", top: "70px", position: "absolute",
                color: "rgba(0,0,0,0.06)", fontSize: "180px",
                fontFamily: "'DM Serif Display',Georgia,serif", fontWeight: 400,
                lineHeight: "180px"
              }}>
                02
              </div>

              {/* Components flat-lay image */}
              <div style={{
                left: "460px", top: "90px",
                width: "1290px", height: "520px",
                position: "absolute",
                borderRadius: "16px",
                overflow: "hidden",
              }}>
                <img
                  src={CDN.teapotComponents}
                  alt="Components flat-lay"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Component cards */}
              <div style={{
                left: "460px", top: "640px", position: "absolute",
                width: "1290px",
                display: "flex", flexWrap: "wrap", gap: "24px",
              }}>
                {components.map((comp, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: idx < 3 ? "400px" : "620px",
                      padding: "28px 32px",
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{
                      color: "#C4913A", fontSize: "22px",
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 600, marginBottom: "10px"
                    }}>
                      {comp.name}
                    </div>
                    <div style={{
                      color: "#404040", fontSize: "18px",
                      fontFamily: "'Zilla Slab',serif",
                      fontWeight: 400, lineHeight: "28px"
                    }}>
                      {comp.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prototype image */}
              <div style={{
                left: "460px", top: "960px",
                width: "1290px", height: "500px",
                position: "absolute",
                borderRadius: "16px",
                overflow: "hidden",
              }}>
                <img
                  src={`${import.meta.env.BASE_URL}Meccanum3.png`}
                  alt="Prototype on workbench"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* ==================== DESIGN FEATURES ==================== */}
            <div id="design-features" style={{ width: "1919px", height: "1200px", left: "0.75px", top: "3850px", position: "absolute" }}>
              <div style={{ width: "50px", height: "64px", left: "460px", top: "0px", position: "absolute", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TeapotIcon size={50} color="#C4913A" />
              </div>
              <div style={{
                width: "400px", height: "28px", left: "523px", top: "21px", position: "absolute",
                color: "black", fontSize: "30px",
                fontFamily: "'Space Grotesk',Arial,sans-serif", fontWeight: 700, lineHeight: "28.8px"
              }}>
                Design Features
              </div>

              {/* Section number */}
              <div style={{
                left: "460px", top: "70px", position: "absolute",
                color: "rgba(0,0,0,0.06)", fontSize: "180px",
                fontFamily: "'DM Serif Display',Georgia,serif", fontWeight: 400,
                lineHeight: "180px"
              }}>
                03
              </div>

              {/* Brewing atmosphere image */}
              <div style={{
                left: "460px", top: "90px",
                width: "620px", height: "400px",
                position: "absolute",
                borderRadius: "16px",
                overflow: "hidden",
              }}>
                <img
                  src={`${import.meta.env.BASE_URL}Meccanum2.png`}
                  alt="Teapot brewing atmosphere"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Feature cards - 2x2 grid */}
              <div style={{
                left: "460px", top: "530px", position: "absolute",
                width: "1290px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}>
                {designFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "36px 40px",
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                      <span style={{ fontSize: "28px" }}>{feature.icon}</span>
                      <div style={{
                        color: "#212121", fontSize: "24px",
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 600
                      }}>
                        {feature.title}
                      </div>
                    </div>
                    <div style={{
                      color: "#404040", fontSize: "20px",
                      fontFamily: "'Zilla Slab',serif",
                      fontWeight: 400, lineHeight: "32px",
                      textAlign: "justify"
                    }}>
                      {feature.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side: additional feature description */}
              <div style={{
                left: "1110px", top: "90px",
                width: "640px", height: "400px",
                position: "absolute",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <div style={{
                  color: "#212121", fontSize: "36px",
                  fontFamily: "'DM Serif Display',Georgia,serif",
                  fontWeight: 400, lineHeight: "48px",
                  marginBottom: "24px"
                }}>
                  Patience, Enforced<br />by Design
                </div>
                <div style={{
                  color: "#555", fontSize: "22px",
                  fontFamily: "'Zilla Slab',serif",
                  fontWeight: 400, lineHeight: "36px"
                }}>
                  The Runaway Teapot transforms waiting into engagement. By combining proximity sensing, omnidirectional movement, and timed brewing logic, it creates a playful interaction that ensures the perfect steep every time.
                </div>
              </div>
            </div>

            {/* ==================== FOOTER ==================== */}
            <div style={{
              width: "1910px", height: "280px", left: "0px", top: "5100px",
              position: "absolute", background: "#2A2A2A",
              borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
              overflow: "hidden"
            }}>
              <div style={{
                width: "1727px", height: "180px", left: "92px", top: "48px",
                position: "absolute"
              }}>
                <div style={{
                  color: "#F3F3F3", fontSize: "20.8px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                  lineHeight: "22px"
                }}>
                  Contact
                </div>
                <div style={{
                  left: 0, top: "50px", position: "absolute",
                  opacity: 0.7, color: "#F3F3F3", fontSize: "16px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                  lineHeight: "25.6px"
                }}>
                  <a href="mailto:sean.c1121@gmail.com" style={{ color: "#F3F3F3", textDecoration: "none" }}>sean.c1121@gmail.com</a>
                </div>

                <div style={{
                  left: "300px", top: "-3px", position: "absolute",
                  color: "#F3F3F3", fontSize: "21.1px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                  lineHeight: "22px"
                }}>
                  Project
                </div>
                <div style={{
                  left: "300px", top: "47px", position: "absolute",
                  opacity: 0.7, color: "#F3F3F3", fontSize: "18px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                  lineHeight: "28.8px"
                }}>
                  The Runaway Teapot
                </div>
                <div style={{
                  left: "300px", top: "80px", position: "absolute",
                  opacity: 0.7, color: "#F3F3F3", fontSize: "18px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                  lineHeight: "28.8px"
                }}>
                  Interactive Mechatronic Design
                </div>

                <div style={{
                  left: "600px", top: 0, position: "absolute",
                  color: "#F3F3F3", fontSize: "20.8px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                  lineHeight: "22px"
                }}>
                  Technologies
                </div>
                <div style={{
                  left: "600px", top: "47px", position: "absolute",
                  opacity: 0.7, color: "#F3F3F3", fontSize: "18px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                  lineHeight: "28.8px"
                }}>
                  Raspberry Pi Pico, DC Motors, Mecanum Wheels
                </div>
                <div style={{
                  left: "600px", top: "80px", position: "absolute",
                  opacity: 0.7, color: "#F3F3F3", fontSize: "18px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                  lineHeight: "28.8px"
                }}>
                  VL53L0X Laser Sensors, IR Remote
                </div>

                {/* Divider */}
                <div style={{
                  width: "1727px", height: "1px", left: 0, top: "140px",
                  position: "absolute", background: "rgba(245,243,240,0.18)"
                }}></div>
              </div>

              <div style={{
                left: "868px", top: "236px", position: "absolute",
                opacity: 0.7, color: "#F3F3F3", fontSize: "16px",
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                lineHeight: "25.6px"
              }}>
                Design by Sean
              </div>

              {/* Social icons */}
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{
                position: "absolute", left: "1680px", top: "220px",
                width: "48px", height: "48px", background: "rgba(255,255,255,0.1)",
                borderRadius: "8px", display: "flex", alignItems: "center",
                justifyContent: "center", textDecoration: "none"
              }}>
                <img src={CDN.instagram} alt="Instagram" style={{ width: "24px", height: "24px" }} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{
                position: "absolute", left: "1740px", top: "220px",
                width: "48px", height: "48px", background: "rgba(255,255,255,0.1)",
                borderRadius: "8px", display: "flex", alignItems: "center",
                justifyContent: "center", textDecoration: "none"
              }}>
                <img src={CDN.linkedin} alt="LinkedIn" style={{ width: "24px", height: "24px" }} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
