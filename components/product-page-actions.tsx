"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner"

interface Product {
  id: string
  title: string
  price: number
  image: string
  seller: {
    name: string
    rating: number
  }
}

interface ProductPageActionsProps {
  product: Product
}

export default function ProductPageActions({ product }: ProductPageActionsProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      seller: product.seller,
    })
    toast.success("Added to cart!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this amazing Islamic product: ${product.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="flex gap-4">
      <Button onClick={handleAddToCart} className="flex-1" size="lg">
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
      <Button variant="outline" size="lg">
        <Heart className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="lg" onClick={handleShare}>
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  )
}
