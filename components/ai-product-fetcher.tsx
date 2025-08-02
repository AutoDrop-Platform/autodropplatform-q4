"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Search } from "lucide-react"
import { AliExpressProductCard } from "./aliexpress-product-card"

interface Product {
  id: string
  title: string
  price: string
  image: string
  rating: number
  orders: number
  seller: {
    name: string
    rating: number
  }
}

export function AiProductFetcher() {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setProducts([])

    try {
      const response = await fetch(`/api/aliexpress/search?q=${encodeURIComponent(query)}&limit=6`)

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()

      if (data.success && data.products) {
        setProducts(data.products)
      } else {
        setError(data.error || "No products found")
      }
    } catch (err) {
      setError("Failed to search products. Please try again.")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const suggestedQueries = [
    "Islamic hijab",
    "Prayer mat",
    "Abaya dress",
    "Islamic wall art",
    "Quran holder",
    "Islamic jewelry",
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>AI Product Discovery</CardTitle>
        </div>
        <CardDescription>
          Describe what you're looking for and let our AI find the perfect Islamic products for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g., 'elegant black hijab for daily wear' or 'prayer mat with beautiful patterns'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={loading || !query.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Searching..." : "Find Products"}
          </Button>
        </div>

        {/* Suggested Queries */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try these suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center py-8">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Searching for products...</p>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Found {products.length} products:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <AliExpressProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && query && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No products found. Try a different search term.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
