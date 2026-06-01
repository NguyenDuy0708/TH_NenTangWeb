function ListRendering() {
    const products = [
        { id: 1, name: "Táo", price: 12 },
        { id: 2, name: "Cam", price: 8 },
        { id: 3, name: "Xoài", price: 15 },
    ];
    const total = products.reduce((s, p) => s + p.price, 0);
    return (
        <div style={{ padding: "20px" }}>
            <h2>List rendering</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - <strong>{p.price}k</strong>
                        {p.price > 10 && <span> (đắt)</span>}
                    </li>
                ))}
            </ul>
            <p>Tổng tiền: <strong>{total}k</strong></p>
        </div>
    );
}

export default ListRendering;
