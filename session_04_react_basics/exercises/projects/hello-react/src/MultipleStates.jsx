import { useState } from "react";

function MultipleStates() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e?.preventDefault();
        if (name.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 100) {
            alert('Tuổi phải là số giữa 1 và 99');
            return;
        }
        setSubmitted(true);
    }

    function handleReset() {
        setName("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }

    return (
        <div style={{ padding: 16, border: '1px solid #e6eefc', borderRadius: 8, background: '#fff' }}>
            <h3>Bài 4.4 — Kết hợp nhiều useState (Form)</h3>

            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
                    <div>
                        <label>Tên: </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label>Tuổi: </label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div>
                        <label>
                            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />{' '}
                            Là sinh viên
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit">Đăng ký</button>
                        <button type="button" onClick={handleReset}>Xóa</button>
                    </div>
                </form>
            ) : (
                <div style={{ background: '#d4edda', padding: 12, borderRadius: 6 }}>
                    <h4>✅ Đăng ký thành công!</h4>
                    <p>Tên: {name}</p>
                    <p>Tuổi: {age}</p>
                    <p>Sinh viên: {isStudent ? 'Có' : 'Không'}</p>
                    <button onClick={handleReset}>Đăng ký lại</button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;
