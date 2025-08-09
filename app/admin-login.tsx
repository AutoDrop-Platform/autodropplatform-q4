import React, { useState } from "react";

const ADMIN_EMAIL = "autodrop.platform@gmail.com";
const ADMIN_PASSWORD = "admin123"; // يمكنك تغييرها لاحقاً

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
      // حفظ حالة الدخول في localStorage
      localStorage.setItem("admin_logged_in", "true");
    } else {
      setError("بيانات الدخول غير صحيحة أو غير مصدقة من المدير.");
    }
  };

  if (loggedIn) {
    // استيراد لوحة الإدارة بعد تسجيل الدخول
    const AdminDashboard = require("./admin-dashboard").default;
    return <AdminDashboard />;
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>تسجيل دخول الإدارة</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.7rem", borderRadius: 6, border: "1px solid #ddd" }}
          required
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.7rem", borderRadius: 6, border: "1px solid #ddd" }}
          required
        />
        <button type="submit" style={{ padding: "0.7rem 1.5rem", background: "#059669", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}>
          دخول
        </button>
        {error && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "2rem", color: "#64748b", fontSize: "0.95rem" }}>
        فقط المدير والموظفين المصدقين يمكنهم الدخول لهذه الصفحة.
      </p>
    </div>
  );
}