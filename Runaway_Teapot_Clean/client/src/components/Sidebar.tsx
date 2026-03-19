import { useEffect, useRef, useCallback } from "react";

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const scaleSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    sidebar.style.left = (100 * s) + "px";
    sidebar.style.width = (240 * s) + "px";
    sidebar.style.gap = (24 * s) + "px";

    const title = sidebar.querySelector(".sn-title") as HTMLElement;
    const subs = sidebar.querySelectorAll(".sn-sub") as NodeListOf<HTMLElement>;
    const links = sidebar.querySelectorAll(".sn-link") as NodeListOf<HTMLElement>;

    if (title) title.style.fontSize = (32 * s) + "px";
    subs.forEach((el) => { el.style.fontSize = (18 * s) + "px"; });
    links.forEach((el) => {
      el.style.fontSize = (22 * s) + "px";
    });
  }, []);

  const positionSidebar = useCallback(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    const scrollY = window.scrollY;

    const startScroll = (93.37 + 137 + 156) * s;
    const pageBottom = 5200 * s;
    const sidebarHeight = sidebar.offsetHeight;
    const stopScroll = pageBottom - sidebarHeight - (80 * s);

    sidebar.style.position = "fixed";

    if (scrollY < startScroll) {
      sidebar.style.top = ((startScroll - scrollY) + (30 * s)) + "px";
      sidebar.style.opacity = "1";
      sidebar.style.pointerEvents = "auto";
    } else if (scrollY < stopScroll) {
      sidebar.style.top = (30 * s) + "px";
      sidebar.style.opacity = "1";
      sidebar.style.pointerEvents = "auto";
    } else {
      sidebar.style.opacity = "0";
      sidebar.style.pointerEvents = "none";
    }
  }, []);

  useEffect(() => {
    scaleSidebar();
    positionSidebar();

    const handleResize = () => {
      scaleSidebar();
      positionSidebar();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", positionSidebar);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", positionSidebar);
    };
  }, [scaleSidebar, positionSidebar]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(targetId);
    if (!target) return;
    const s = Math.min(window.innerWidth / 1920, 1);
    const rect = target.getBoundingClientRect();
    const targetScroll = window.scrollY + rect.top - (20 * s);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div
      ref={sidebarRef}
      id="sidebar-nav"
      style={{
        position: "fixed",
        top: "-9999px",
        left: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "inline-flex",
        zIndex: 1000,
        pointerEvents: "auto",
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="sn-title" style={{ color: "#212121", fontFamily: "'DM Serif Display',Georgia,serif", fontWeight: 400 }}>
        The Runaway<br />Teapot
      </div>
      <div className="sn-sub" style={{ color: "#737373", fontFamily: "'Space Grotesk',Arial,sans-serif", fontWeight: 400 }}>
        An Interactive<br />Mechatronic Design
      </div>
      <div className="sn-sub" style={{ color: "#737373", fontFamily: "'Space Grotesk',Arial,sans-serif", fontWeight: 400 }}>
        Ongoing project since 2024
      </div>
      <a href="#top" className="sn-link" onClick={(e) => handleClick(e, "top")} style={{ color: "#686868", fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: "none" }}>
        Overview
      </a>
      <a href="#concept" className="sn-link" onClick={(e) => handleClick(e, "concept")} style={{ color: "#686868", fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: "none" }}>
        Concept
      </a>
      <a href="#components" className="sn-link" onClick={(e) => handleClick(e, "components")} style={{ color: "#686868", fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: "none" }}>
        Components
      </a>
      <a href="#design-features" className="sn-link" onClick={(e) => handleClick(e, "design-features")} style={{ color: "#686868", fontFamily: "'Zilla Slab',serif", fontWeight: 500, textDecoration: "none" }}>
        Design Features
      </a>
    </div>
  );
}
