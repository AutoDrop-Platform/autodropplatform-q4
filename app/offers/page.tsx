"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useCart } from "@/context/cart-context"
import { Clock, Flame, Gift, Star, ShoppingCart, Heart, Zap, Package, Percent, Timer } from "lucide-react"
import { toast } from "sonner"

export default function OffersPage() {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState("flash-deals")

  // Mock data for offers
  const flashDeals = [
    {
      id: "1",
      title: "Premium Islamic Prayer Mat - Luxury Velvet",
      originalPrice: 89.99,
      salePrice: 34.99,
      discount: 61,
      image: "/placeholder.svg?height=200&width=200&text=Prayer+Mat",
      rating: 4.9,
      reviews: 234,
      timeLeft: "2h 15m",
      sold: 45,
      stock: 20,
      category: "Islamic Clothing",
    },
    {
      id: "2",
      title: "Elegant Hijab Collection - Premium Silk",
      originalPrice: 59.99,
      salePrice: 19.99,
      discount: 67,
      image: "/placeholder.svg?height=200&width=200&text=Hijab",
      rating: 4.8,
      reviews: 456,
      timeLeft: "1h 45m",
      sold: 78,
      stock: 12,
      category: "Islamic Clothing",
    },
    {
      id: "3",
      title: "Traditional Thobe - Cotton Blend",
      originalPrice: 129.99,
      salePrice: 45.99,
      discount: 65,
      image: "/placeholder.svg?height=200&width=200&text=Thobe",
      rating: 4.7,
      reviews: 189,
      timeLeft: "3h 30m",
      sold: 23,
      stock: 35,
      category: "Islamic Clothing",
    },
  ]

  const dailyDeals = [
    {
      id: "4",
      title: "Islamic Wall Art - Calligraphy Set",
      originalPrice: 79.99,
      salePrice: 29.99,
      discount: 63,
      image: "/placeholder.svg?height=200&width=200&text=Wall+Art",
      rating: 4.6,
      reviews: 123,
      category: "Home Decor",
    },
    {
      id: "5",
      title: "Modest Abaya - Designer Collection",
      originalPrice: 149.99,
      salePrice: 55.99,
      discount: 63,
      image: "/placeholder.svg?height=200&width=200&text=Abaya",
      rating: 4.8,
      reviews: 345,
      category: "Islamic Clothing",
    },
    {
      id: "6",
      title: "Quran Stand - Wooden Carved",
      originalPrice: 49.99,
      salePrice: 24.99,
      discount: 50,
      image: "/placeholder.svg?height=200&width=200&text=Quran+Stand",
      rating: 4.5,
      reviews: 78,
      category: "Religious Items",
    },
  ]

  const bundles = [
    {
      id: "bundle-1",
      title: "Complete Islamic Prayer Set",
      items: ["Prayer Mat", "Tasbih", "Quran Stand"],
      originalPrice: 159.97,
      bundlePrice: 79.99,
      savings: 79.98,
      image: "/placeholder.svg?height=200&width=200&text=Prayer+Bundle",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "bundle-2",
      title: "Modest Fashion Essentials",
      items: ["Hijab Set", "Abaya", "Accessories"],
      originalPrice: 249.97,
      bundlePrice: 129.99,
      savings: 119.98,
      image: "/placeholder.svg?height=200&width=200&text=Fashion+Bundle",
      rating: 4.8,
      reviews: 156,
    },
  ]

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.salePrice || product.bundlePrice,
      image: product.image,
      quantity: 1,
    })
    toast.success(`${product.title} added to cart!`)
  }

  const formatTimeLeft = (timeString: string) => {
    return timeString
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🔥 Special Offers & Deals</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing discounts on premium Islamic clothing and accessories. Limited time offers with up to 70%
            off!
          </p>
        </div>

        {/* Charity Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg mb-8">
          <div className="flex items-center justify-center space-x-2 text-center">
            <Heart className="h-6 w-6" />
            <span className="text-lg font-semibold">
              25% of all profits from these deals go to charity organizations worldwide
            </span>
            <Heart className="h-6 w-6" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flash-deals" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Flash Deals
            </TabsTrigger>
            <TabsTrigger value="daily-deals" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Daily Deals
            </TabsTrigger>
            <TabsTrigger value="bundles" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Bundles
            </TabsTrigger>
            <TabsTrigger value="clearance" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Clearance
            </TabsTrigger>
          </TabsList>

          {/* Flash Deals */}
          <TabsContent value="flash-deals" className="space-y-6">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-red-800">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">⚡ Flash Sale - Limited Time Only!</span>
                <Timer className="h-5 w-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500">-{deal.discount}%</Badge>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        ⏰ {deal.timeLeft}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{deal.title}</h3>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {deal.rating} ({deal.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg text-red-600">${deal.salePrice}</span>
                        <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Sold: {deal.sold}</span>
                          <span>Stock: {deal.stock}</span>
                        </div>
                        <Progress value={(deal.sold / (deal.sold + deal.stock)) * 100} className="h-2" />
                      </div>

                      <Button onClick={() => handleAddToCart(deal)} className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Daily Deals */}
          <TabsContent value="daily-deals" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">🌟 Today's Special Deals - 24 Hours Only!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyDeals.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-blue-500">-{deal.discount}%</Badge>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{deal.title}</h3>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {deal.rating} ({deal.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg text-blue-600">${deal.salePrice}</span>
                        <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                      </div>

                      <div className="text-xs text-gray-600 mb-3">{deal.category}</div>

                      <Button onClick={() => handleAddToCart(deal)} className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bundles */}
          <TabsContent value="bundles" className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-purple-800">
                <Package className="h-5 w-5" />
                <span className="font-semibold">📦 Bundle Deals - Save More When You Buy Together!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bundles.map((bundle) => (
                <Card key={bundle.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={bundle.image || "/placeholder.svg"}
                        alt={bundle.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-purple-500">Bundle Deal</Badge>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{bundle.title}</h3>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Includes:</p>
                        <ul className="text-sm space-y-1">
                          {bundle.items.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(bundle.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {bundle.rating} ({bundle.reviews})
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Individual Price:</span>
                          <span className="text-sm line-through">${bundle.originalPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">Bundle Price:</span>
                          <span className="font-bold text-lg text-purple-600">${bundle.bundlePrice}</span>
                        </div>
                        <div className="flex items-center justify-between text-green-600">
                          <span className="text-sm font-medium">You Save:</span>
                          <span className="text-sm font-bold">${bundle.savings}</span>
                        </div>
                      </div>

                      <Button onClick={() => handleAddToCart(bundle)} className="w-full">
                        <Gift className="h-4 w-4 mr-2" />
                        Add Bundle to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clearance */}
          <TabsContent value="clearance" className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-orange-800">
                <Percent className="h-5 w-5" />
                <span className="font-semibold">🏷️ Clearance Sale - Final Markdowns!</span>
              </div>
            </div>

            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold mb-2">Clearance Section Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                We're preparing amazing clearance deals for you. Check back soon for incredible savings!
              </p>
              <Button variant="outline">Notify Me When Available</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Don't Miss Out on These Amazing Deals!</h2>
          <p className="text-lg mb-6">
            Join thousands of satisfied customers and start saving today. Plus, 25% of profits go to charity!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse All Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Sign Up for Deal Alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
