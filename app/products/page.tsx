"use client";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://aliexpress-datahub.p.rapidapi.com/item_search_2?keywords=electronics&page=1",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
              "x-rapidapi-key": "a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36"
            }
          }
        );
        const data = await response.json();
        if (data.result && data.result.resultList) {
          setProducts(data.result.resultList);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading products...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 shadow">
            <img
              src={product.image || "/placeholder.png"}
              alt={product.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">
              {product.title || "No title"}
            </h2>
            <p className="text-green-600 font-bold mt-1">
              {product.price || "N/A"}
            </p>
            <a
              href={product.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
