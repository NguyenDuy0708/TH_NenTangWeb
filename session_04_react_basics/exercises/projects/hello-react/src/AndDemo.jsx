function AndDemo({ items }) {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Conditional (&&) demo</h2>
            {items && items.length > 0 && (
                <ul>
                    {items.map((it, idx) => (
                        <li key={idx}>{it}</li>
                    ))}
                </ul>
            )}
            {(!items || items.length === 0) && <p>Không có mục nào.</p>}
        </div>
    );
}

export default AndDemo;
