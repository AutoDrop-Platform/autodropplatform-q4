"use client"
import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Search, ShoppingCart, User, Heart, Bell, Minus, Plus, X } from "lucide-react"

// Helper function to safely format price
const formatPrice = (price: any): string => {
  const numPrice = typeof price === "number" ? price : Number.parseFloat(price) || 0
  return numPrice.toFixed(2)
}

// Helper function to safely get quantity
const getQuantity = (quantity: any): number => {
  const num = typeof quantity === "number" ? quantity : Number.parseInt(quantity) || 1
  return Math.max(1, num)
}

export default function Header() {
  const { items = [], getTotalItems, getTotalPrice, getCharityAmount, updateQuantity, removeItem } = useCart() || {}
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Safe calculations with fallbacks
  const totalItems = getTotalItems ? getTotalItems() : 0
  const totalPrice = getTotalPrice ? getTotalPrice() : 0
  const charityAmount = getCharityAmount ? getCharityAmount() : 0

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-lg">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">AutoDrop</span>
              <span className="text-xs text-gray-500 -mt-1">Islamic Marketplace</span>
            </div>
          </Link>

          {/* Charity Badge */}
          <div className="hidden md:flex items-center">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300">
              <Heart className="h-3 w-3 mr-1" />
              25% to Charity
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Products
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Marketplace
            </Link>
            <Link href="/offers" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Offers
            </Link>
            <Link href="/seller-dashboard" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Sell
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search Islamic products..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-purple-600">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <Badge variant="secondary">{totalItems} items</Badge>
                  </div>

                  {items.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Your cart is empty</p>
                        <Button asChild className="mt-4" onClick={() => setIsCartOpen(false)}>
                          <Link href="/products">Continue Shopping</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto py-4">
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="h-16 w-16 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <p className="text-sm font-semibold text-purple-600">${formatPrice(item.price)}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() => updateQuantity(item.id, getQuantity(item.quantity) - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{getQuantity(item.quantity)}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() => updateQuantity(item.id, getQuantity(item.quantity) + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-700"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${formatPrice(totalPrice)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Charity Donation (25%):</span>
                            <span>${formatPrice(charityAmount)}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${formatPrice(totalPrice)}</span>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                          <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/seller-dashboard">Seller Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact Support</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/products" className="text-lg font-medium">
                    Products
                  </Link>
                  <Link href="/marketplace" className="text-lg font-medium">
                    Marketplace
                  </Link>
                  <Link href="/offers" className="text-lg font-medium">
                    Offers
                  </Link>
                  <Link href="/seller-dashboard" className="text-lg font-medium">
                    Sell
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    Contact
                  </Link>
                  <div className="pt-4 border-t">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      <Heart className="h-3 w-3 mr-1" />
                      25% to Charity
                    </Badge>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search Islamic products..." className="pl-10 pr-4 w-full" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
