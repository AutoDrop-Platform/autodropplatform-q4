"use client";

import React, { useEffect, useState } from "react";

// ✅ عدّل الكلمات المفتاحية إن حبيت
const KEYWORDS = "electronics";

type AliItem = {
  title?: string;
  image?: string;
  price?: string | number;
  detail_url?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<AliItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(
          `https://aliexpress-datahub.p.rapidapi.com/item_search_2?keywords=${encodeURIComponent(
            KEYWORDS
          )}&page=1`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
              "x-rapidapi-key":
                "a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36",
            },
            // يساعد على إلغاء الكاش وإجبار التحديث
            cache: "no-store",
          } as RequestInit
        );

        const data = await res.json();

        // 👇 اطبع بالكونسول للتأكد في المتصفح
        console.log("AliExpress API result:", data);

        const list: AliItem[] =
          data?.result?.resultList && Array.isArray(data.result.resultList)
            ? data.result.resultList
            : [];

        setProducts(list);
      } catch (e: any) {
        setErr(e?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading products…</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;
  if (!products.length)
    return (
      <div className="p-8 text-center">No products found. Try other keywords.</div>
    );

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Products — {KEYWORDS}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm">
            <img
              src={p.image || "/placeholder.png"}
              alt={p.title || "Product"}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-base md:text-lg font-semibold mt-3 line-clamp-2">
              {p.title || "Untitled"}
            </h2>
            <div className="mt-2 font-bold">
              {p.price ? String(p.price) : "—"}
            </div>
            <a
              href={p.detail_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
