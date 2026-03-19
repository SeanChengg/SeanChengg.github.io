import { useEffect, useCallback } from "react";
import BackButton from "@/components/BackButton";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import ComponentsSection from "@/components/sections/ComponentsSection";
import DesignFeaturesSection from "@/components/sections/DesignFeaturesSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  const scalePage = useCallback(() => {
    const w = document.querySelector(".page-scale-wrapper") as HTMLElement;
    if (!w) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    w.style.transform = "scale(" + s + ")";
    document.body.style.height = 5275 * s + "px";
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
      <div className="page-scale-wrapper" style={{ width: "1920px", position: "relative" }}>
        <div style={{ width: "1919px", height: "5275px", left: "-0.25px", top: "0.37px", position: "absolute" }}>
          <div style={{ width: "1947px", height: "5275px", left: 0, top: "137px", position: "absolute" }}>
            <HeroSection />
            <ConceptSection />
            <ComponentsSection />
            <DesignFeaturesSection />
            <FooterSection />
          </div>
        </div>
      </div>
    </>
  );
}
