import { useState } from "react";

function ListBasics() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);

    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const avgAge = Math.round(students.reduce((s, x) => s + x.age, 0) / students.length);

    return (
        <div style={{ padding: 12, border: '1px solid #e6eefc', borderRadius: 8, background: '#fff' }}>
            <h3>Bài 6.1 — Render danh sách</h3>

            <h4>Trái cây</h4>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{index + 1}. {fruit}</li>
                ))}
            </ul>

            <h4>Sinh viên</h4>
            {students.map((student, idx) => (
                <div key={student.id} style={{ padding: 8, margin: '6px 0', background: student.age >= 20 ? '#e6fff1' : '#f9f9f9' }}>
                    {idx + 1}. {student.name} - {student.age} tuổi
                </div>
            ))}

            <p>Tuổi trung bình: <strong>{avgAge}</strong></p>
        </div>
    );
}

export default ListBasics;
