import { useState } from "react";

function StringState() {
    const [text, setText] = useState('Hello');

    return (
        <div style={{ padding: 20, border: '1px solid #e6eefc', borderRadius: 8, marginBottom: 20, background: '#fff' }}>
            <h3>Bài 4.2 — useState với chuỗi</h3>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ padding: 8, minWidth: 220 }}
                />
                <button onClick={() => setText('')}>Xóa</button>
                <button onClick={() => setText(text.toUpperCase())}>IN HOA</button>
                <button onClick={() => setText(text.toLowerCase())}>in thường</button>
                <button onClick={() => setText((t) => t + ' 🎉')}>Thêm</button>
            </div>

            <p>Độ dài: <strong>{text.length}</strong></p>
            <p>Preview: <span style={{ fontWeight: 600 }}>{text || <i className="muted">(trống)</i>}</span></p>
        </div>
    );
}

export default StringState;
