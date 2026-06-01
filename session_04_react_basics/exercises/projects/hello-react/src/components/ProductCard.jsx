export default function ProductCard({ product }) {
  return (
    <article style={{
      border: "1px solid #e1e5ea",
      borderRadius: 8,
      padding: 12,
      background: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
    }}>
      <img src={product.image} alt={product.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />
      <h3 style={{ margin: "12px 0 6px" }}>{product.title}</h3>
      <p style={{ margin: 0, color: "#555" }}>{product.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
        <strong style={{ color: "#0d6efd" }}>{product.price}</strong>
        <button style={{ padding: "6px 10px", background: "#0d6efd", color: "white", border: "none", borderRadius: 6 }}>Buy</button>
      </div>
    </article>
  );
}
