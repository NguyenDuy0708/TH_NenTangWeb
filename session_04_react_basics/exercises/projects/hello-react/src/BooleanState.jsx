import { useState } from "react";

function BooleanState() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const themeStyle = {
        backgroundColor: isDarkMode ? "#222" : "#fff",
        color: isDarkMode ? "#fff" : "#222",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        border: "1px solid #e6eefc"
    };

    return (
        <div style={themeStyle}>
            <h3>Bài 4.3 — useState với boolean (Toggle)</h3>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                <button onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? 'Ẩn nội dung' : 'Hiện nội dung'}
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
                <button onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? '❤️ Đã thích' : '🤍 Thích'}
                </button>
            </div>

            {isVisible && (
                <div style={{ padding: 12, border: '1px dashed rgba(0,0,0,0.08)', borderRadius: 6 }}>
                    <p>Đây là nội dung có thể ẩn/hiện.</p>
                    <p>Đang ở chế độ: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong></p>
                    <p>{isLiked ? 'Bạn đã thích mục này.' : 'Bạn chưa thích mục này.'}</p>
                </div>
            )}
        </div>
    );
}

export default BooleanState;
