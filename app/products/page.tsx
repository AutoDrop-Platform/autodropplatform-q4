"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Grid, List } from "lucide-react"
import { islamicProducts } from "@/lib/products-data"

const categories = [
  { value: "all", label: "All Categories", count: 50 },
  { value: "abaya", label: "Abayas", count: 12 },
  { value: "hijab", label: "Hijabs", count: 15 },
  { value: "thobe", label: "Thobes", count: 8 },
  { value: "prayer", label: "Prayer Items", count: 10 },
  { value: "swimwear", label: "Modest Swimwear", count: 5 },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Islamic Products</h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover our curated collection of authentic Islamic clothing, accessories, and spiritual items. Every
                purchase supports Islamic charities worldwide.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-green-100 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">25%</div>
                <div className="text-green-800 text-sm font-medium">Donated to Charity</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.value} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="category" className="text-purple-600" />
                      <span className="text-sm">{category.label}</span>
                    </label>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">Under $25</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">$25 - $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">$50 - $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">Over $100</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">Top Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">On Sale</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="text-purple-600" />
                  <span className="text-sm">New Arrivals</span>
                </div>
              </div>
            </div>

            {/* Charity Impact */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">Charity Impact</h3>
              <p className="text-green-700 text-sm mb-3">Your purchases help support Islamic charities worldwide.</p>
              <div className="text-2xl font-bold text-green-600">$2.1M+</div>
              <div className="text-green-600 text-xs">Total donated this year</div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">All Products</h2>
                <Badge variant="outline">Showing 1-20 of 50 results</Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-8">
              <ProductGrid initialProducts={islamicProducts} showFilters={true} title="All Islamic Products" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
