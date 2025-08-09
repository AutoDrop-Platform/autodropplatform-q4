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

  const keywords = useMemo(() => KEYWORDS.join(","), []);

  useEffect(() => {
    setLoading(true);
    fetchAllKeywords(KEYWORDS)
      .then(setItems)
      .catch((e) => {
        setError("فشل في تحميل البيانات");
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, [keywords]);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>{error}</p>;
  if (items.length === 0) return <p>لا توجد نتائج.</p>;

  return (
    <div>
      <h1>المنتجات</h1>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.price}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              عرض المنتج
            </a>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
