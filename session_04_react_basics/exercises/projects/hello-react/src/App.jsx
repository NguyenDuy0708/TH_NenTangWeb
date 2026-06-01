import './App.css'
// Tire 0 
/* 
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

function App() {
    return (
        <div className="app">
            <UserProfile />
            <ProductInfo />
        </div>
    );
}
export default App;*/

//Tire 1:
/// Bài 1.1 — Component render lần đầu
/*function LifecycleDemo() {
    console.log("1️⃣ Component được gọi!");
    return (
        <div style={{ padding: "20px", border: "2px solid #3498db" }}>
            <h2>Lifecycle Demo</h2>
            <p>Mở Console (F12) để xem log</p>
            <p>Component này chỉ render MỘT lần</p>
        </div>
    );
}
export default LifecycleDemo;*/

/// Bài 1.2 — Biến "bình thường" vs useState
/// 1.2.1: Biến bình thường không làm UI cập nhật!
/*
function BadCounter() {
    let count = 0;  // ← Biến bình thường!
    function handleClick() {
        count = count + 1;
        console.log("Count:", count);  // Console: 1, 2, 3...
        // Nhưng UI KHÔNG cập nhật!
    }
    return (
        <div style={{ padding: "20px" }}>
            <h2>❌ Counter "tệ" (dùng biến thường)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick}>Tăng (+1)</button>
            <p style={{ color: "red" }}>
                ⚠️ Nhấn nút → Console tăng, nhưng số trên màn hình KHÔNG đổi!
            </p>
        </div>
    );
}
export default BadCounter;
*/

///1.2.2 Giải pháp: useState — Biến "đặc biệt"
/*
import { useState } from "react";

function GoodCounter() {
    const [count, setCount] = useState(0);  // ← useState!
    function handleClick() {
        setCount(count + 1);  // React biết cần re-render!
    }
    return (
        <div style={{ padding: "20px" }}>
            <h2>✅ Counter "tốt" (dùng useState)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick}>Tăng (+1)</button>
            <p style={{ color: "green" }}>
                ✅ Nhấn nút → Số trên màn hình CẬP NHẬT!
            </p>
        </div>
    );
}
export default GoodCounter;
*/

/// Bài 1.3 — Luồng hoạt động (Flow) 
/*
import { useState } from "react";

function FlowDemo() {
    console.log("🔄 Component render!");
    const [step, setStep] = useState(1);
    return (
        <div style={{ padding: "20px" }}>
            <h2>Luồng hoạt động</h2>
            <p>Bước hiện tại: {step}</p>
            
            <button onClick={() => setStep(step + 1)}>
                Bước tiếp theo →
            </button>
            
            <button onClick={() => setStep(1)}>
                Quay lại đầu
            </button>
            <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
            </div>
        </div>
    );
}
export default FlowDemo;
*/
//Tier 2:
/*
import SimpleVariables from "./SimpleVariables";
import TernaryDemo from "./TernaryDemo";
import AndDemo from "./AndDemo";
import ListRendering from "./ListRendering";

function App() {
    return (
        <div>
            <h1 style={{ padding: "20px" }}>React Tier 2 examples</h1>
            <SimpleVariables />
            <TernaryDemo isLoggedIn={false} />
            <AndDemo items={["Mục A", "Mục B"]} />
            <ListRendering />
        </div>
    );
}

export default App;
*/

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

const products = [
  {
    id: 1,
    title: "iPhone 15",
    price: "25.000.000đ",
    description: "Màn hình 6.1 inch • Camera 48MP • Pin 3349 mAh",
    image: "https://via.placeholder.com/400x240?text=iPhone+15"
  },
  {
    id: 2,
    title: "Galaxy S23",
    price: "20.000.000đ",
    description: "Màn hình 6.2 inch • Camera 50MP • Pin 3900 mAh",
    image: "https://via.placeholder.com/400x240?text=Galaxy+S23"
  },
  {
    id: 3,
    title: "Pixel 7",
    price: "18.000.000đ",
    description: "Màn hình 6.0 inch • Camera 50MP • Android thuần",
    image: "https://via.placeholder.com/400x240?text=Pixel+7"
  }
];

function App() {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#f5f7fb" }}>
      <Header />
      <main id="products" style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 12 }}>Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;