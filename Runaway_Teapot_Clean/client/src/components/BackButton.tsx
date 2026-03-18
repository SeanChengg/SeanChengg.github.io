export default function BackButton() {
  return (
    <a
      href="/index.html"
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 1001,
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        opacity: 0.6,
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.opacity = "0.6";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img
        src="/Back_Sign.svg"
        alt="Back"
        style={{ width: 40, height: 40 }}
      />
    </a>
  );
}
