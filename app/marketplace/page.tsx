"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, MapPin, Calendar, MessageCircle, Heart, Eye } from "lucide-react"

const marketplaceListings = [
  {
    id: 1,
    title: "Premium Wireless Earbuds - Brand New",
    description: "High-quality wireless earbuds with noise cancellation. Perfect for music lovers and professionals.",
    price: "$45 - $65",
    category: "Electronics",
    location: "New York, NY",
    postedDate: "2 days ago",
    seller: {
      name: "TechDeals Pro",
      avatar: "/placeholder.svg?height=40&width=40&text=TD",
      rating: 4.8,
      reviews: 156,
    },
    image: "/placeholder.svg?height=200&width=300&text=Wireless+Earbuds",
    featured: true,
    smallBusiness: false,
    views: 234,
    favorites: 45,
  },
  {
    id: 2,
    title: "Handmade Ceramic Coffee Mugs Set",
    description: "Beautiful handcrafted ceramic mugs, perfect for your morning coffee. Set of 4 unique designs.",
    price: "$25 - $35",
    category: "Home & Garden",
    location: "Portland, OR",
    postedDate: "1 day ago",
    seller: {
      name: "Artisan Crafts",
      avatar: "/placeholder.svg?height=40&width=40&text=AC",
      rating: 4.9,
      reviews: 89,
    },
    image: "/placeholder.svg?height=200&width=300&text=Coffee+Mugs",
    featured: false,
    smallBusiness: true,
    views: 156,
    favorites: 32,
  },
  {
    id: 3,
    title: "Vintage Style Leather Backpack",
    description: "Genuine leather backpack with vintage design. Perfect for work, travel, or everyday use.",
    price: "$80 - $120",
    category: "Fashion",
    location: "Austin, TX",
    postedDate: "3 days ago",
    seller: {
      name: "Leather Works Co",
      avatar: "/placeholder.svg?height=40&width=40&text=LW",
      rating: 4.7,
      reviews: 203,
    },
    image: "/placeholder.svg?height=200&width=300&text=Leather+Backpack",
    featured: true,
    smallBusiness: false,
    views: 189,
    favorites: 67,
  },
  {
    id: 4,
    title: "Organic Skincare Bundle",
    description: "Natural and organic skincare products. Includes cleanser, moisturizer, and serum.",
    price: "$35 - $50",
    category: "Beauty",
    location: "Los Angeles, CA",
    postedDate: "4 days ago",
    seller: {
      name: "Pure Beauty",
      avatar: "/placeholder.svg?height=40&width=40&text=PB",
      rating: 4.6,
      reviews: 124,
    },
    image: "/placeholder.svg?height=200&width=300&text=Skincare+Bundle",
    featured: false,
    smallBusiness: true,
    views: 298,
    favorites: 78,
  },
  {
    id: 5,
    title: "Smart Home Security Camera",
    description: "WiFi-enabled security camera with night vision and mobile app control. Easy installation.",
    price: "$60 - $90",
    category: "Electronics",
    location: "Seattle, WA",
    postedDate: "5 days ago",
    seller: {
      name: "SecureHome Tech",
      avatar: "/placeholder.svg?height=40&width=40&text=SH",
      rating: 4.5,
      reviews: 267,
    },
    image: "/placeholder.svg?height=200&width=300&text=Security+Camera",
    featured: false,
    smallBusiness: false,
    views: 345,
    favorites: 89,
  },
  {
    id: 6,
    title: "Handwoven Yoga Mats",
    description: "Eco-friendly yoga mats made from natural materials. Non-slip surface, perfect for all yoga styles.",
    price: "$40 - $60",
    category: "Sports",
    location: "Denver, CO",
    postedDate: "1 week ago",
    seller: {
      name: "Zen Wellness",
      avatar: "/placeholder.svg?height=40&width=40&text=ZW",
      rating: 4.8,
      reviews: 145,
    },
    image: "/placeholder.svg?height=200&width=300&text=Yoga+Mats",
    featured: false,
    smallBusiness: true,
    views: 167,
    favorites: 43,
  },
]

const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Beauty", "Sports", "Kitchen"]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [favorites, setFavorites] = useState<number[]>([])

  const filterListings = (listings: typeof marketplaceListings, additionalFilter?: (listing: any) => boolean) => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory
      const matchesAdditional = additionalFilter ? additionalFilter(listing) : true
      return matchesSearch && matchesCategory && matchesAdditional
    })
  }

  const sortListings = (listings: typeof marketplaceListings) => {
    return [...listings].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number.parseInt(a.price.split("$")[1]) - Number.parseInt(b.price.split("$")[1])
        case "price-high":
          return Number.parseInt(b.price.split("$")[1]) - Number.parseInt(a.price.split("$")[1])
        case "rating":
          return b.seller.rating - a.seller.rating
        case "popular":
          return b.views - a.views
        default: // newest
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      }
    })
  }

  const toggleFavorite = (listingId: number) => {
    setFavorites((prev) => (prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId]))
  }

  const allListings = sortListings(filterListings(marketplaceListings))
  const featuredListings = sortListings(filterListings(marketplaceListings, (listing) => listing.featured))
  const smallBusinessListings = sortListings(filterListings(marketplaceListings, (listing) => listing.smallBusiness))

  const renderListingCard = (listing: any) => (
    <Card key={listing.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden">
          <img
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            {listing.featured && <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>}
            {listing.smallBusiness && <Badge className="bg-green-500 hover:bg-green-600">Small Business</Badge>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => toggleFavorite(listing.id)}
          >
            <Heart
              className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {listing.category}
          </Badge>
        </div>
        <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {listing.title}
        </CardTitle>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
        <div className="text-xl font-bold text-purple-600 mb-3">{listing.price}</div>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={listing.seller.avatar || "/placeholder.svg"} />
            <AvatarFallback>{listing.seller.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{listing.seller.name}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">
              {listing.seller.rating} ({listing.seller.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{listing.postedDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{listing.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            <span>{listing.favorites} favorites</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">View Details</Button>
          <Button variant="outline" size="icon">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Marketplace</h1>
          <p className="text-xl mb-8 text-purple-100">Discover unique products from sellers around the world</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
            Post Your Ad
          </Button>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search marketplace..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">All Listings ({allListings.length})</TabsTrigger>
              <TabsTrigger value="featured">Featured ({featuredListings.length})</TabsTrigger>
              <TabsTrigger value="small-business">Small Business ({smallBusinessListings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allListings.map(renderListingCard)}
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredListings.map(renderListingCard)}
              </div>
            </TabsContent>

            <TabsContent value="small-business">
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Supporting Small Businesses</h3>
                <p className="text-green-700 text-sm">
                  AutoDrop Platform is committed to supporting independent sellers and small businesses. These listings
                  feature products from verified small business owners.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {smallBusinessListings.map(renderListingCard)}
              </div>
            </TabsContent>
          </Tabs>

          {allListings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No listings found</div>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
