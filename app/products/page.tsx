"use client";

import React, { useEffect, useMemo, useState } from "react";

type RawItem = {
  productId?: string | number;
  itemId?: string | number;
  productTitle?: string;
  title?: string;
  appSalePrice?: string | number;
  price?: string | number;
  productUrl?: string;
  url?: string;
  image?: string;
  productImage?: string;
  storeName?: string;
  sellerName?: string;
};

type Item = {
  id: string;
  title: string;
  price: string;
  url: string;
  image: string;
  seller?: string;
};

const RAPIDAPI_HOST = "aliexpress-datahub.p.rapidapi.com";
const RAPIDAPI_KEY = "a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36";

// عدّل أو أضف كلمات مفتاحية كما تريد
const KEYWORDS = [
  "electronics", "smartphone", "smartwatch", "laptop", "gaming",
  "headphones", "camera", "drones", "tablet", "monitor",
  "fashion", "shoes", "bags", "watches", "jewelry",
  "home decor", "kitchen", "coffee", "cleaning", "lighting",
  "beauty", "makeup", "skincare", "hair", "fragrance",
  "tools", "power tools", "garden", "outdoor", "fitness",
  "car accessories", "motorcycle", "camping", "toys", "kids"
];

// تطبيع الحقول من API
function normalizeItem(x: RawItem): Item | null {
  const id = String(x.productId ?? x.itemId ?? "");
  const title = x.productTitle ?? x.title ?? "";
  const url = x.productUrl ?? x.url ?? "";
  const image = x.productImage ?? x.image ?? "";
  const rawPrice = String(x.appSalePrice ?? x.price ?? "");
  const price = rawPrice ? `$${rawPrice}`.replace(/^(\$)?\$/, "$") : "—";
  const seller = x.storeName ?? x.sellerName ?? undefined;
  if (!id || !title || !url) return null;
  return { id, title, url, image, price, seller };
}

async function fetchByKeyword(keyword: string): Promise<Item[]> {
  const url =
    `https://${RAPIDAPI_HOST}/item_search_2?keywords=${encodeURIComponent(keyword)}&page=1&pageSize=20`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": RAPIDAPI_HOST,
      "x-rapidapi-key": RAPIDAPI_KEY,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    // لو واجهت 429 أو غيره؛ رجّع مصفوفة فاضية بدل كراش
    return [];
  }
  const data = await res.json();
  const list: RawItem[] = data?.result?.resultList ?? data?.data ?? [];
  return list.map(normalizeItem).filter(Boolean) as Item[];
}

// تقسيم على دفعات خفيفة لتقليل 429
async function fetchAllKeywords(keys: string[], batchSize = 4, delayMs = 600) {
  const all: Item[] = [];
  for (let i = 0; i < keys.length; i += batchSize) {
    const slice = keys.slice(i, i + batchSize);
    const chunk = await Promise.all(slice.map(fetchByKeyword));
    all.push(...chunk.flat());
    if (i + batchSize < keys.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  // إزالة التكرار حسب id
  const dedup = new Map<string, Item>();
  all.forEach((it) => dedup.set(it.id, it));
  return Array.from(dedup.values());
}

export default function ProductsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // بيانات وهمية للعرض عند الفشل
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

  const keywords = useMemo(() => KEYWORDS.join(","), []);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetchAllKeywords(KEYWORDS)
      .then((data) => {
        if (data.length === 0) {
          setError("لا توجد نتائج من المصدر، سيتم عرض منتجات تجريبية.");
          setItems(dummyItems);
        } else {
          setItems(data);
        }
      })
      .catch((e) => {
        setError("فشل في تحميل البيانات من المصدر، سيتم عرض منتجات تجريبية.");
        setItems(dummyItems);
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [keywords]);

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "1.5rem" }}>
        سوق أوتو دروب الإسلامي
      </h1>
      <button
        onClick={fetchProducts}
        style={{ marginBottom: "1.5rem", padding: "0.7rem 1.5rem", background: "#059669", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
        disabled={loading}
      >
        {loading ? "جاري التحميل..." : "جلب المنتجات من المصدر الحقيقي"}
      </button>
      {error && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{error}</p>}
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
