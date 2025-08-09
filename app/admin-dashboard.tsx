import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// نوع المنتج
interface Product {
  id: string;
  title: string;
  price: string;
  url?: string;
  image?: string;
  seller?: string;
}

// هذه الصفحة الآن فارغة لأن لوحة الإدارة تظهر فقط بعد تسجيل الدخول من admin-login.tsx
export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    // تحقق من وجود جلسة دخول في localStorage
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.replace("/admin-login");
    }
  }, [router]);
  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>لوحة الإدارة</h1>
      <p>تم التحقق من البريد وكلمة السر. يمكنك الآن إدارة المنتجات والكشوفات المالية.</p>
    </div>
  );
}
