import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);

    const statusText = count > 0 ? 'Số dương' : (count < 0 ? 'Số âm' : 'Bằng 0');
    const statusColor = count > 0 ? 'green' : (count < 0 ? 'red' : 'black');

    return (
        <div style={{ padding: 20, border: '1px solid #e6eefc', borderRadius: 8, marginBottom: 20, background: '#fff' }}>
            <h3>Bài 4.1 — useState với số (Bộ đếm)</h3>
            <p style={{ fontSize: 20 }}>
                Bộ đếm: <strong style={{ color: statusColor }}>{count}</strong>
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
                <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
                <button onClick={() => setCount(count + 5)}>Tăng 5</button>
            </div>

            <p style={{ marginTop: 12 }}>Trạng thái: <strong style={{ color: statusColor }}>{statusText}</strong></p>
        </div>
    );
}

export default NumberState;
