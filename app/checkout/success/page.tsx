"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, Package, Truck, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

interface OrderDetails {
  sessionId: string
  customerEmail: string
  amount: number
  charityDonation: number
  status: string
  orderNumber: string
  estimatedDelivery: string
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      clearCart()

      // Simulate fetching order details
      // In a real app, you'd fetch this from your API
      setTimeout(() => {
        setOrderDetails({
          sessionId,
          customerEmail: "customer@example.com",
          amount: 159.97,
          charityDonation: 39.99,
          status: "confirmed",
          orderNumber: `AD-${Date.now().toString().slice(-6)}`,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [sessionId, clearCart])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your order...</p>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase from AutoDrop Islamic Marketplace</p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {orderDetails.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold">{orderDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{orderDetails.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold">${orderDetails.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">{orderDetails.estimatedDelivery}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charity Donation Confirmation */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-green-600 fill-current" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 mb-2">Charity Donation Confirmed</h3>
                <p className="text-green-700 mb-3">
                  <span className="font-semibold">${orderDetails.charityDonation.toFixed(2)}</span> (25% of your order)
                  has been donated to <span className="font-semibold">Balsamat Al-Khair</span> on your behalf.
                </p>
                <p className="text-sm text-green-600">
                  Your donation will help support communities in need around the world. A donation receipt will be sent
                  to your email shortly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Order Confirmation Email</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive a detailed order confirmation and charity donation receipt via email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">Order Processing</h4>
                  <p className="text-sm text-gray-600">
                    Your order is being prepared and will be shipped within 1-2 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Shipping & Tracking</h4>
                  <p className="text-sm text-gray-600">
                    Once shipped, you'll receive tracking information to monitor your delivery.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
          <Link href="/products">
            <Button className="w-full sm:w-auto">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Return Home
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
          <Link href="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  )
}
