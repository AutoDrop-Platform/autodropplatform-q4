"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ExternalLink } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products-data"

interface AliExpressProductCardProps {
  product: Product
}

export default function AliExpressProductCard({ product }: AliExpressProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    })
  }

  const formatOrders = (orders: number) => {
    if (orders >= 1000) return `${(orders / 1000).toFixed(1)}k+ orders`
    return `${orders} orders`
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow group">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.rating >= 4.5 && <Badge className="absolute top-2 left-2 bg-green-500">Top Rated</Badge>}
        </div>

        <CardContent className="flex-1 p-4 flex flex-col">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 flex-grow">{product.title}</h3>
          <div className="space-y-2 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{formatOrders(product.orders)}</div>
            <div className="text-xs text-muted-foreground truncate">
              Seller: {product.seller?.name ?? "Unknown"} ({product.seller?.rating?.toFixed(1) ?? "N/A"}★)
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button onClick={handleAddToCart} className="flex-1" size="sm" disabled={!product.inStock}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/products/${product.id}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
