import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const inputRef = useRef(null);

    function handleAdd() {
        if (newName.trim() === "") return;

        const newItem = {
            id: Date.now(),
            name: newName
        };

        setItems((prev) => [...prev, newItem]);
        setNewName("");
        inputRef.current?.focus();
        // small toast using alert for simplicity
        // In real app replace with nicer UI
        setTimeout(() => {}, 0);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    return (
        <div style={{ padding: 12, border: '1px solid #e6eefc', borderRadius: 8, background: '#fff' }}>
            <h3>Bài 6.2 — Thêm phần tử (CREATE)</h3>
            <div style={{ marginBottom: 12 }}>
                <input
                    ref={inputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: 8, marginRight: 8 }}
                />
                <button onClick={handleAdd}>➕ Thêm</button>
            </div>

            <h4>Danh sách ({items.length} môn)</h4>
            {items.map(item => (
                <div key={item.id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>{item.name}</div>
            ))}
        </div>
    );
}

export default CreateItem;
