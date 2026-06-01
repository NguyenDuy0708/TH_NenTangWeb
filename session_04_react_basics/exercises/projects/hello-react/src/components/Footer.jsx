export default function Footer() {
  return (
    <footer style={{
      padding: "20px",
      textAlign: "center",
      background: "#f8f9fa",
      marginTop: 24
    }}>
      <small style={{ color: "#666" }}>© {new Date().getFullYear()} My Shop — Built with React</small>
    </footer>
  );
}
