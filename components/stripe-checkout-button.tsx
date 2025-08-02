"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, CreditCard, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StripeCheckoutButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "default" | "lg"
}

export default function StripeCheckoutButton({
  className = "",
  variant = "default",
  size = "default",
}: StripeCheckoutButtonProps) {
  const { items, getTotalPrice } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const totalPrice = getTotalPrice()
  const charityDonation = Math.round(totalPrice * 0.25 * 100) / 100
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checkout.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category || "islamic_clothing",
            seller: item.seller || { name: "AutoDrop Platform" },
          })),
          customerEmail: "", // Will be collected in Stripe checkout
          metadata: {
            platform: "autodrop_islamic_marketplace",
            charity_donation: charityDonation.toString(),
            total_items: itemCount.toString(),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <Button variant="outline" size={size} className={`${className} cursor-not-allowed opacity-50`} disabled>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Cart is Empty
      </Button>
    )
  }

  return (
    <div className="space-y-3">
      {/* Charity Donation Display */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-green-700">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">
            ${charityDonation.toFixed(2)} (25%) will be donated to Balsamat Al-Khair
          </span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Charity Donation (25%)</span>
          <span>${charityDonation.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        variant={variant}
        size={size}
        className={`w-full ${className}`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Secure Checkout - ${totalPrice.toFixed(2)}
          </>
        )}
      </Button>

      {/* Security Notice */}
      <p className="text-xs text-gray-500 text-center">🔒 Secure payment powered by Stripe • 25% donated to charity</p>
    </div>
  )
}

// Named export for flexibility
export { StripeCheckoutButton }
