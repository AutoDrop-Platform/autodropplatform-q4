// دالة لجلب مراجعات منتج من Alibaba عبر RapidAPI
async function fetchAlibabaReviews(itemId: string, page: number = 1): Promise<any[]> {
  const url = `https://alibaba-datahub.p.rapidapi.com/item_review?itemId=${itemId}&page=${page}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "alibaba-datahub.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
      "content-type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  // غالباً المراجعات في data.result أو data.data
  return data?.result?.reviewList ?? data?.data ?? [];
}
"use client";
// دالة لجلب منتجات من Alibaba عبر البحث بصورة
async function fetchAlibabaImageSearch(imgUrl: string, page: number = 1): Promise<Item[]> {
  const url = `https://alibaba-datahub.p.rapidapi.com/item_search_image?imgUrl=${encodeURIComponent(imgUrl)}&page=${page}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "alibaba-datahub.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
      "content-type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  const list: RawItem[] = data?.result?.resultList ?? data?.data ?? [];
  return list.map(normalizeItem).filter(Boolean) as Item[];
}
// دالة لجلب منتجات متعددة من Alibaba عبر RapidAPI
async function fetchAlibabaSearch(q: string, page: number = 1): Promise<Item[]> {
  const url = `https://alibaba-datahub.p.rapidapi.com/item_search?q=${encodeURIComponent(q)}&page=${page}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "alibaba-datahub.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
      "content-type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  const list: RawItem[] = data?.result?.resultList ?? data?.data ?? [];
  return list.map(normalizeItem).filter(Boolean) as Item[];
}
// ...existing code...
// دالة لجلب بيانات منتج من Alibaba عبر RapidAPI
async function fetchAlibabaProduct(itemId: string, imgUrl?: string, page: number = 1, pageSize: number = 1): Promise<Item | null> {
  const url = `https://alibaba-datahub.p.rapidapi.com/item_sku?itemId=${itemId}${imgUrl ? `&imgUrl=${encodeURIComponent(imgUrl)}` : ""}&page=${page}&pageSize=${pageSize}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "alibaba-datahub.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
      "content-type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  const x = data?.result;
  if (!x) return null;
  // تطبيع المنتج
  return normalizeItem({
    productId: x.productId ?? x.itemId,
    productTitle: x.productTitle ?? x.title,
    productUrl: x.productUrl ?? x.url,
    productImage: x.productImage ?? x.image ?? imgUrl,
    appSalePrice: x.appSalePrice ?? x.price,
    storeName: x.storeName ?? x.sellerName,
  });
}
// دالة لجلب منتج واحد عبر RapidAPI
async function fetchSingleProduct(itemId: string): Promise<Item | null> {
  const url = `https://${RAPIDAPI_HOST}/item_detail_2?itemId=${itemId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": RAPIDAPI_HOST,
      "x-rapidapi-key": RAPIDAPI_KEY,
      "content-type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  const x = data?.result;
  if (!x) return null;
  // تطبيع المنتج
  return normalizeItem({
    productId: x.productId ?? x.itemId,
    productTitle: x.productTitle ?? x.title,
    productUrl: x.productUrl ?? x.url,
    productImage: x.productImage ?? x.image,
    appSalePrice: x.appSalePrice ?? x.price,
    storeName: x.storeName ?? x.sellerName,
  });
}
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
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || process.env.RAPIDAPI_KEY || "";

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
  const [alibabaImageLoading, setAlibabaImageLoading] = useState(false);
  const [alibabaImageError, setAlibabaImageError] = useState<string | null>(null);
  // جلب منتجات من Alibaba عبر البحث بصورة
  const handleFetchAlibabaImageSearch = async () => {
    setAlibabaImageLoading(true);
    setAlibabaImageError(null);
    const imgUrl = "https://m.media-amazon.com/images/I/81+6QOdSOlL._AC_UX695_.jpg";
    try {
      const products = await fetchAlibabaImageSearch(imgUrl, 1);
      if (products.length > 0) {
        setItems(products);
        setError(null);
      } else {
        setAlibabaImageError("لم يتم العثور على منتجات أو حدث خطأ.");
      }
    } catch (e) {
      setAlibabaImageError("فشل في جلب المنتجات من Alibaba بالصورة.");
    } finally {
      setAlibabaImageLoading(false);
    }
  };
  const [alibabaSearchLoading, setAlibabaSearchLoading] = useState(false);
  const [alibabaSearchError, setAlibabaSearchError] = useState<string | null>(null);
  // جلب منتجات من Alibaba عبر البحث
  const handleFetchAlibabaSearch = async () => {
    setAlibabaSearchLoading(true);
    setAlibabaSearchError(null);
    try {
      const products = await fetchAlibabaSearch("shoes", 1);
      if (products.length > 0) {
        setItems(products);
        setError(null);
      } else {
        setAlibabaSearchError("لم يتم العثور على منتجات أو حدث خطأ.");
      }
    } catch (e) {
      setAlibabaSearchError("فشل في جلب المنتجات من Alibaba.");
    } finally {
      setAlibabaSearchLoading(false);
    }
  };
  const [alibabaLoading, setAlibabaLoading] = useState(false);
  const [alibabaError, setAlibabaError] = useState<string | null>(null);
  // جلب منتج من Alibaba عند الضغط على زر
  const handleFetchAlibaba = async () => {
    setAlibabaLoading(true);
    setAlibabaError(null);
    const itemId = "1600798906682";
    const imgUrl = "https://m.media-amazon.com/images/I/81+6QOdSOlL._AC_UX695_.jpg";
    try {
      const product = await fetchAlibabaProduct(itemId, imgUrl);
      if (product) {
        setItems([product]);
        setError(null);
      } else {
        setAlibabaError("لم يتم العثور على المنتج أو حدث خطأ.");
      }
    } catch (e) {
      setAlibabaError("فشل في جلب المنتج من Alibaba.");
    } finally {
      setAlibabaLoading(false);
    }
  };
  const [items, setItems]
   = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);
  // جلب منتج واحد عند الضغط على زر
  const handleFetchSingle = async () => {
    setSingleLoading(true);
    setSingleError(null);
    const itemId = "1005005244562338";
    try {
      const product = await fetchSingleProduct(itemId);
      if (product) {
        setItems([product]);
        setError(null);
      } else {
        setSingleError("لم يتم العثور على المنتج أو حدث خطأ.");
      }
    } catch (e) {
      setSingleError("فشل في جلب المنتج.");
    } finally {
      setSingleLoading(false);
    }
  };

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
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          onClick={fetchProducts}
          style={{ padding: "0.7rem 1.5rem", background: "#059669", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
          disabled={loading}
        >
          {loading ? "جاري التحميل..." : "جلب المنتجات من المصدر الحقيقي"}
        </button>
        <button
          onClick={handleFetchSingle}
          style={{ padding: "0.7rem 1.5rem", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
          disabled={singleLoading}
        >
          {singleLoading ? "جاري جلب المنتج..." : "جلب منتج محدد (AliExpress)"}
        </button>
        <button
          onClick={handleFetchAlibaba}
          style={{ padding: "0.7rem 1.5rem", background: "#f59e42", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
          disabled={alibabaLoading}
        >
          {alibabaLoading ? "جاري جلب المنتج من Alibaba..." : "جلب منتج من Alibaba (ID: 1600798906682)"}
        </button>
        <button
          onClick={handleFetchAlibabaSearch}
          style={{ padding: "0.7rem 1.5rem", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
          disabled={alibabaSearchLoading}
        >
          {alibabaSearchLoading ? "جاري جلب منتجات Alibaba..." : "جلب منتجات من Alibaba (بحث: shoes)"}
        </button>
        <button
          onClick={handleFetchAlibabaImageSearch}
          style={{ padding: "0.7rem 1.5rem", background: "#10b981", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
          disabled={alibabaImageLoading}
        >
          {alibabaImageLoading ? "جاري جلب منتجات Alibaba بالصورة..." : "جلب منتجات من Alibaba (بحث بصورة)"}
        </button>
      </div>
  {error && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{error}</p>}
  {singleError && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{singleError}</p>}
  {alibabaError && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{alibabaError}</p>}
  {alibabaSearchError && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{alibabaSearchError}</p>}
  {alibabaImageError && <p style={{ color: "#ef4444", fontWeight: "bold" }}>{alibabaImageError}</p>}
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
