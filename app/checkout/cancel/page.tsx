"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

export default function CheckoutCancelPage() {
  const { items, getTotalPrice } = useCart()
  const totalPrice = getTotalPrice()
  const charityDonation = Math.round(totalPrice * 0.25 * 100) / 100
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">Your payment was cancelled and no charges were made</p>
        </div>

        {/* Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Your payment was cancelled before completion. This could happen for several reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>You clicked the back button or closed the payment window</li>
              <li>The payment session expired</li>
              <li>There was a technical issue with the payment processor</li>
              <li>You chose to cancel the payment</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Don't worry!</strong> No charges were made to your card, and your cart items are still saved.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cart Summary (if items exist) */}
        {items.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Your Cart ({itemCount} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-current" />
                    Charity Donation (25%)
                  </span>
                  <span>${charityDonation.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">
                  Your items are still in your cart, including the ${charityDonation.toFixed(2)} charity donation to
                  Balsamat Al-Khair.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {items.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/checkout" className="flex-1">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Try Checkout Again
                </Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Return Home
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              If you're experiencing issues with checkout, here are some things you can try:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Check that your internet connection is stable</li>
              <li>Try using a different browser or device</li>
              <li>Ensure your card details are correct</li>
              <li>Contact your bank if the payment is being declined</li>
            </ul>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Still having trouble? Our support team is here to help.</p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 All payments are processed securely through Stripe. Your card information is never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  )
}
