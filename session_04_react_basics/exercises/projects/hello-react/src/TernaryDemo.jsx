function TernaryDemo({ isLoggedIn }) {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Conditional (ternary) demo</h2>
            <p>{isLoggedIn ? "Bạn đã đăng nhập" : "Vui lòng đăng nhập"}</p>
        </div>
    );
}

export default TernaryDemo;
