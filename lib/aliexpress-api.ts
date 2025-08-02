// Mock AliExpress API for development
// In production, this would connect to the real AliExpress API

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  orders: number
  seller: {
    name: string
    rating: number
  }
  description?: string
  specifications?: Record<string, string>
  reviews?: Array<{
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }>
  tags?: string[]
  category?: string
  sizes?: string[]
  colors?: string[]
}

const mockProducts: Product[] = [
  {
    id: "AE001",
    name: "Premium Wireless Bluetooth Headphones with Noise Cancellation",
    price: 89.99,
    originalPrice: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    images: [
      "/placeholder.svg?height=300&width=300&text=Headphones",
      "/placeholder.svg?height=300&width=300&text=Headphones+Side",
      "/placeholder.svg?height=300&width=300&text=Headphones+Case",
    ],
    rating: 4.5,
    orders: 15420,
    seller: {
      name: "TechStore Official",
      rating: 4.8,
    },
    description:
      "Experience premium sound quality with these wireless Bluetooth headphones featuring active noise cancellation technology.",
    specifications: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0",
      Weight: "250g",
    },
    reviews: [
      {
        id: "r1",
        user: "John D.",
        rating: 5,
        comment: "Amazing sound quality and battery life!",
        date: "2024-01-15",
      },
    ],
    tags: ["Electronics", "Audio"],
    category: "Electronics",
    colors: ["Black", "White", "Blue"],
    sizes: ["One Size"],
  },
  {
    id: "AE002",
    name: "Smart Fitness Tracker with Heart Rate Monitor",
    price: 45.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=300&text=Fitness+Tracker",
    rating: 4.3,
    orders: 8750,
    seller: {
      name: "FitTech Store",
      rating: 4.6,
    },
    description:
      "Track your fitness goals with this advanced smart fitness tracker featuring heart rate monitoring and sleep tracking.",
    category: "Electronics",
    tags: ["Fitness", "Wearable"],
    colors: ["Black", "Pink", "Blue"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "AE003",
    name: "Elegant Women's Abaya - Traditional Islamic Dress",
    price: 65.0,
    originalPrice: 85.0,
    image: "/placeholder.svg?height=300&width=300&text=Black+Abaya",
    images: [
      "/placeholder.svg?height=300&width=300&text=Black+Abaya",
      "/placeholder.svg?height=300&width=300&text=Abaya+Detail",
      "/placeholder.svg?height=300&width=300&text=Abaya+Back",
    ],
    rating: 4.7,
    orders: 3250,
    seller: {
      name: "Modest Fashion House",
      rating: 4.9,
    },
    description:
      "Beautiful traditional abaya made from high-quality fabric, perfect for daily wear and special occasions.",
    specifications: {
      Material: "Premium Polyester",
      Care: "Machine Washable",
      Style: "Traditional",
      "Sleeve Type": "Long Sleeve",
    },
    category: "Islamic Clothing",
    tags: ["Islamic", "Traditional", "Women"],
    colors: ["Black", "Navy", "Brown", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "AE004",
    name: "Men's Traditional Thobe - Premium Cotton",
    price: 55.0,
    originalPrice: 75.0,
    image: "/placeholder.svg?height=300&width=300&text=White+Thobe",
    rating: 4.6,
    orders: 2180,
    seller: {
      name: "Traditional Wear Co",
      rating: 4.7,
    },
    description: "Comfortable and elegant men's thobe made from premium cotton, ideal for prayer and formal occasions.",
    category: "Islamic Clothing",
    tags: ["Islamic", "Traditional", "Men"],
    colors: ["White", "Beige", "Light Blue"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "AE005",
    name: "Premium Silk Hijab Collection - Set of 3",
    price: 35.0,
    originalPrice: 50.0,
    image: "/placeholder.svg?height=300&width=300&text=Silk+Hijab",
    rating: 4.8,
    orders: 5670,
    seller: {
      name: "Hijab Boutique",
      rating: 4.9,
    },
    description:
      "Luxurious silk hijab collection featuring three beautiful colors, soft and comfortable for all-day wear.",
    category: "Islamic Clothing",
    tags: ["Islamic", "Hijab", "Women", "Accessories"],
    colors: ["Pink", "Blue", "Green", "Purple"],
    sizes: ["One Size"],
  },
  {
    id: "AE006",
    name: "Portable Prayer Mat with Compass - Travel Friendly",
    price: 25.0,
    originalPrice: 35.0,
    image: "/placeholder.svg?height=300&width=300&text=Prayer+Mat",
    rating: 4.4,
    orders: 4320,
    seller: {
      name: "Islamic Essentials",
      rating: 4.5,
    },
    description: "Compact and lightweight prayer mat with built-in compass, perfect for travelers and daily prayers.",
    category: "Islamic Clothing",
    tags: ["Islamic", "Prayer", "Travel-Friendly", "Accessories"],
    colors: ["Green", "Blue", "Brown"],
    sizes: ["One Size"],
  },
  {
    id: "AE007",
    name: "4K HD Camera Mini Drone with GPS",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300&text=Drone",
    images: [
      "/placeholder.svg?height=300&width=300&text=Drone",
      "/placeholder.svg?height=300&width=300&text=Drone+Controller",
      "/placeholder.svg?height=300&width=300&text=Drone+Case",
    ],
    rating: 4.6,
    orders: 1250,
    seller: {
      name: "DroneWorld Pro",
      rating: 4.7,
    },
    description:
      "Professional-grade mini drone with 4K HD camera, GPS positioning, and intelligent flight modes for stunning aerial photography.",
    specifications: {
      Camera: "4K HD",
      "Flight Time": "25 minutes",
      Range: "2km",
      GPS: "Yes",
      Weight: "249g",
    },
    reviews: [
      {
        id: "r2",
        user: "Mike R.",
        rating: 5,
        comment: "Incredible camera quality and easy to fly!",
        date: "2024-01-20",
      },
      {
        id: "r3",
        user: "Sarah L.",
        rating: 4,
        comment: "Great drone for the price, battery life could be better.",
        date: "2024-01-18",
      },
    ],
    category: "Electronics",
    tags: ["Drone", "Camera", "GPS"],
    colors: ["Black", "White"],
    sizes: ["One Size"],
  },
  {
    id: "AE008",
    name: "Travel Hijab - Wrinkle Resistant & Quick Dry",
    price: 28.0,
    originalPrice: 40.0,
    image: "/placeholder.svg?height=300&width=300&text=Travel+Hijab",
    rating: 4.5,
    orders: 2890,
    seller: {
      name: "Travel Modest Wear",
      rating: 4.6,
    },
    description:
      "Perfect hijab for travelers - wrinkle resistant, quick-dry fabric that maintains its shape and color.",
    category: "Islamic Clothing",
    tags: ["Islamic", "Hijab", "Women", "Travel-Friendly", "Quick-Dry"],
    colors: ["Black", "Navy", "Gray", "Beige"],
    sizes: ["One Size"],
  },
  {
    id: "AE009",
    name: "Modest Swimwear - Full Coverage Burkini",
    price: 75.0,
    originalPrice: 95.0,
    image: "/placeholder.svg?height=300&width=300&text=Burkini",
    rating: 4.3,
    orders: 1560,
    seller: {
      name: "Modest Swim Co",
      rating: 4.4,
    },
    description: "Comfortable and stylish full-coverage swimwear designed for modest swimming and water activities.",
    category: "Islamic Clothing",
    tags: ["Islamic", "Swimwear", "Women", "Modest", "Quick-Dry"],
    colors: ["Navy", "Black", "Teal"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "AE010",
    name: "Travel Abaya with Secure Pockets",
    price: 85.0,
    originalPrice: 110.0,
    image: "/placeholder.svg?height=300&width=300&text=Travel+Abaya",
    rating: 4.7,
    orders: 1890,
    seller: {
      name: "Journey Modest",
      rating: 4.8,
    },
    description:
      "Practical travel abaya featuring multiple secure pockets, wrinkle-resistant fabric, and comfortable fit for long journeys.",
    category: "Islamic Clothing",
    tags: ["Islamic", "Traditional", "Women", "Travel-Friendly", "Lightweight"],
    colors: ["Black", "Navy", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
]

export async function searchProducts(params: {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  size?: string
  color?: string
  features?: string[]
  limit?: number
}): Promise<{ products: Product[]; total: number }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProducts = [...mockProducts]

  // Filter by query
  if (params.query) {
    const query = params.query.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  // Filter by category
  if (params.category && params.category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category?.toLowerCase() === params.category?.toLowerCase(),
    )
  }

  // Filter by price range
  if (params.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price >= params.minPrice!)
  }
  if (params.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price <= params.maxPrice!)
  }

  // Filter by size
  if (params.size && params.size !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.sizes?.includes(params.size!))
  }

  // Filter by color
  if (params.color && params.color !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.colors?.includes(params.color!))
  }

  // Filter by features
  if (params.features && params.features.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      params.features!.some((feature) => product.tags?.includes(feature)),
    )
  }

  // Apply limit
  if (params.limit) {
    filteredProducts = filteredProducts.slice(0, params.limit)
  }

  return {
    products: filteredProducts,
    total: filteredProducts.length,
  }
}

export async function getTrendingProducts(limit?: number): Promise<{ products: Product[]; total: number }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Sort by orders (trending)
  const trendingProducts = [...mockProducts].sort((a, b) => b.orders - a.orders).slice(0, limit || 10)

  return {
    products: trendingProducts,
    total: trendingProducts.length,
  }
}

export async function getTopRatedProducts(limit?: number): Promise<{ products: Product[]; total: number }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Sort by rating
  const topRatedProducts = [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, limit || 10)

  return {
    products: topRatedProducts,
    total: topRatedProducts.length,
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return mockProducts.find((product) => product.id === id) || null
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const currentProduct = mockProducts.find((p) => p.id === productId)
  if (!currentProduct) return []

  // Find products in the same category, excluding the current product
  const relatedProducts = mockProducts
    .filter((product) => product.id !== productId && product.category === currentProduct.category)
    .slice(0, limit)

  return relatedProducts
}

export const categories = [
  "Electronics",
  "Islamic Clothing",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Health & Beauty",
]

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
export const colors = [
  "Black",
  "White",
  "Navy",
  "Gray",
  "Blue",
  "Pink",
  "Green",
  "Brown",
  "Beige",
  "Purple",
  "Teal",
  "Charcoal",
]
export const features = ["Travel-Friendly", "Quick-Dry", "Lightweight", "Wrinkle-Resistant", "GPS", "Waterproof"]
