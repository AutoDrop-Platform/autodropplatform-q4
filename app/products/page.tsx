"use client";
import React, { useState } from "react";

type Item = {
	id: string;
	title: string;
	price: string;
	url: string;
	image: string;
	seller?: string;
};

const dummyItems: Item[] = [
	{
		id: "dummy-1",
		title: "عباية نسائية فاخرة",
		price: "$49.99",
		url: "#",
		image: "https://via.placeholder.com/150x200?text=Abaya",
		seller: "متجر العبايات"
	},
	{
		id: "dummy-2",
		title: "ثوب رجالي أصلي",
		price: "$39.99",
		url: "#",
		image: "https://via.placeholder.com/150x200?text=Thobe",
		seller: "متجر الثياب"
	}
];

export default function ProductsPage() {
	const [items, setItems] = useState<Item[]>(dummyItems);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [featuredLoading, setFeaturedLoading] = useState(false);
	const [featuredError, setFeaturedError] = useState<string | null>(null);

	const handleFetchFeaturedAliExpress = () => {
		setFeaturedLoading(true);
		setFeaturedError(null);
		setTimeout(() => {
			setItems([{ ...dummyItems[0], title: dummyItems[0].title + " ⭐" }]);
			setFeaturedLoading(false);
		}, 1200);
	};

	const fetchProducts = async () => {
		setLoading(true);
		setError(null);
		try {
			// جلب منتجات حقيقية من AliExpress عبر API البحث
			const res = await fetch("/api/aliexpress/search?q=abaya&sort=BEST_MATCH");
			const data = await res.json();
			if (data.success && Array.isArray(data.products)) {
				// فلترة المنتجات ذات تقييم عالي فقط (مثلاً 4.5 فما فوق)
				const highRated = data.products.filter((item: any) => {
					const rating = Number(item.evaluate_rate || item.rating || item.product_rate || 0);
					return rating >= 4.5;
				});
				setItems(
					highRated.map((item: any) => ({
						id: item.product_id || item.id,
						title: item.title || item.product_title,
						price: item.price || item.sale_price || "غير متوفر",
						url: item.product_url || "#",
						image: item.product_main_image_url || item.image || "https://via.placeholder.com/150x200?text=Product",
						seller: item.seller_name || item.seller || "",
					}))
				);
			} else {
				setError("تعذر جلب المنتجات من المصدر الحقيقي.");
			}
		} catch (err) {
			setError("حدث خطأ أثناء جلب المنتجات.");
		}
		setLoading(false);
	};

	return (
		<div style={{ background: "#f9fafb", minHeight: "100vh", padding: "2rem" }}>
			<h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "1.5rem" }}>
				سوق أوتو دروب الإسلامي
			</h1>
			<div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
				<button
					onClick={fetchProducts}
					style={{ padding: "0.7rem 1.5rem", background: "#059669", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
					disabled={loading}
				>
					{loading ? "جاري التحميل..." : "جلب المنتجات من المصدر الحقيقي"}
				</button>
				<button
					onClick={handleFetchFeaturedAliExpress}
					style={{ padding: "0.7rem 1.5rem", background: "#f43f5e", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
					disabled={featuredLoading}
				>
					{featuredLoading ? "جاري جلب المنتج المميز..." : "جلب منتج AliExpress مميز ⭐"}
				</button>
			</div>
			{error && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{error}</p>}
			{featuredError && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{featuredError}</p>}
			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
				{items.map((item) => (
					<div key={item.id} style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px #0001", padding: "1rem", textAlign: "center" }}>
						<img src={item.image} alt={item.title} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
						<h2 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "0.5rem 0" }}>{item.title}</h2>
						<p style={{ color: "#059669", fontWeight: "bold" }}>{item.price}</p>
						<p style={{ color: "#64748b", fontSize: "0.95rem" }}>{item.seller}</p>
						<a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "0.5rem", padding: "0.5rem 1rem", background: "#0ea5e9", color: "#fff", borderRadius: "6px", textDecoration: "none" }}>
							عرض المنتج
						</a>
					</div>
				))}
			</div>
		</div>
	);
}
