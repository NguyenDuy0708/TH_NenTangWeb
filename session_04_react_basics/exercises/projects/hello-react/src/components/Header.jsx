export default function Header() {
  return (
    <header style={{
      padding: "16px 24px",
      background: "#0d6efd",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ fontWeight: 700, fontSize: 18 }}>My Shop</div>
      <nav>
        <a href="#" style={{ color: "rgba(255,255,255,0.9)", marginRight: 12 }}>Home</a>
        <a href="#products" style={{ color: "rgba(255,255,255,0.9)", marginRight: 12 }}>Products</a>
        <a href="#about" style={{ color: "rgba(255,255,255,0.9)" }}>About</a>
      </nav>
    </header>
  );
}
