import { useState } from "react";

function ClickEvents() {
    const [message, setMessage] = useState("Chưa click");
    const [clickCount, setClickCount] = useState(0);

    function handleClick() {
        setMessage("Đã click lúc " + new Date().toLocaleTimeString());
        setClickCount((c) => c + 1);
    }

    function handleReset() {
        setMessage("Đã reset!");
        setClickCount(0);
    }

    return (
        <div style={{ padding: 20, border: '1px solid #e6eefc', borderRadius: 8, background: '#fff' }}>
            <h3>Bài 5.1 — Click Events</h3>
            <p>{message}</p>
            <p>Số lần click: <strong>{clickCount}</strong></p>

            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleClick}>Click me!</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={() => { setMessage('Đổi màu ngẫu nhiên (demo)'); setClickCount((c) => c + 1); }}>Demo +</button>
            </div>
        </div>
    );
}

export default ClickEvents;
