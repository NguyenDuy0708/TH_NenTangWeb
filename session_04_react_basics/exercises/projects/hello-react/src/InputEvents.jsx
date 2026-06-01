import { useState } from "react";

function InputEvents() {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);

    function handleChange(event) {
        const newValue = event.target.value;
        setText(newValue);
        setCharCount(newValue.length);
    }

    return (
        <div style={{ padding: 16, border: '1px solid #e6eefc', borderRadius: 8, background: '#fff', marginTop: 12 }}>
            <h3>Bài 5.2 — Input Events</h3>

            <input
                value={text}
                onChange={handleChange}
                placeholder="Nhập gì đó..."
                maxLength={100}
                style={{ padding: 8, width: 320 }}
            />

            <p>Ký tự: {charCount}/100</p>
            <p>Bạn đang nhập: {text || '(chưa nhập)'}</p>

            {charCount > 80 && (
                <p style={{ color: 'red' }}>⚠️ Sắp hết ký tự!</p>
            )}
        </div>
    );
}

export default InputEvents;
