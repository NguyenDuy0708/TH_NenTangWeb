import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(String(item.age));
    }

    function saveEdit() {
        if (editName.trim() === "" || editAge === "") return;

        setItems((prev) => prev.map(item =>
            item.id === editingId ? { ...item, name: editName, age: parseInt(editAge) } : item
        ));

        setEditingId(null);
    }

    function cancelEdit() {
        setEditingId(null);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') cancelEdit();
    }

    return (
        <div style={{ padding: 12, border: '1px solid #e6eefc', borderRadius: 8, background: '#fff' }}>
            <h3>Bài 6.4 — Sửa phần tử (UPDATE)</h3>

            {items.map(item => (
                <div key={item.id} style={{ padding: 8, margin: '6px 0', background: '#f9f9f9' }}>
                    {editingId === item.id ? (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <input value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={handleKeyPress} autoFocus style={{ padding: 6 }} />
                            <input type="number" value={editAge} onChange={(e) => setEditAge(e.target.value)} onKeyDown={handleKeyPress} style={{ padding: 6, width: 80 }} />
                            <button onClick={saveEdit} style={{ background: '#27ae60', color: 'white', border: 'none', padding: '6px 10px' }}>✓ Lưu</button>
                            <button onClick={cancelEdit} style={{ background: '#95a5a6', color: 'white', border: 'none', padding: '6px 10px' }}>✕ Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: '#3498db', color: 'white', border: 'none', padding: '6px 10px' }}>✏️ Sửa</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;
