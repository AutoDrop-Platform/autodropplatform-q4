"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { parsePriceToCents } from "@/utils/price";

const KEYWORDS = "electronics";

type AliItem = {
  product_id?: string;
  title?: string;
  image?: string;
  price?: string | number;
  detail_url?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<AliItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
            cache: "no-store",
          } as RequestInit
        );
        const data = await res.json();
        const list: AliItem[] = Array.isArray(data?.result?.resultList)
          ? data.result.resultList
          : [];
        setProducts(list);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const buyNow = async (p: AliItem) => {
    const amount = parsePriceToCents(p.price);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: p.title || "AliExpress Item",
        image: p.image,
        amount: amount > 50 ? amount : 500, // حد أدنى 5$
        currency: "usd",
      }),
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  };

  if (loading) return <div className="p-8 text-center">Loading products…</div>;
  if (!products.length) return <div className="p-8 text-center">No products found.</div>;

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Products — {KEYWORDS}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => {
          const priceCents = parsePriceToCents(p.price);
          const id = String(p.product_id ?? i);
          return (
            <div key={id} className="border rounded-lg p-4 shadow-sm">
              <img
                src={p.image || "/placeholder.png"}
                alt={p.title || "Product"}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-base md:text-lg font-semibold mt-3 line-clamp-2">
                {p.title || "Untitled"}
              </h2>
              <div className="mt-2 font-bold">
                {priceCents ? `$${(priceCents / 100).toFixed(2)}` : "—"}
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() =>
                    addToCart({
                      id,
                      name: p.title || "Item",
                      image: p.image,
                      priceCents: priceCents || 500,
                      quantity: 1,
                    })
                  }
                >
                  Add to Cart
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => buyNow(p)}
                >
                  Buy Now
                </Button>
              </div>

              <a
                href={p.detail_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block underline"
              >
                View on AliExpress
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
