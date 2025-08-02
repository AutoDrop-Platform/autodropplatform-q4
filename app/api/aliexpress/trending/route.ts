import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock trending Islamic products data
    const trendingProducts = [
      {
        id: "trend-1",
        title: "Luxury Chiffon Hijab Collection",
        price: "$29.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        orders: 3200,
        seller: { name: "Premium Islamic Wear", rating: 4.9 },
        trending: true,
      },
      {
        id: "trend-2",
        title: "Designer Abaya - Dubai Style",
        price: "$129.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 1800,
        seller: { name: "Dubai Fashion House", rating: 4.8 },
        trending: true,
      },
      {
        id: "trend-3",
        title: "Premium Prayer Rug - Persian Design",
        price: "$79.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        orders: 2500,
        seller: { name: "Islamic Heritage", rating: 4.9 },
        trending: true,
      },
      {
        id: "trend-4",
        title: "Islamic Jewelry Set - Gold Plated",
        price: "$49.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        orders: 1200,
        seller: { name: "Islamic Jewelry Co", rating: 4.7 },
        trending: true,
      },
      {
        id: "trend-5",
        title: "Modest Sportswear - Burkini Set",
        price: "$69.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        orders: 950,
        seller: { name: "Modest Active", rating: 4.6 },
        trending: true,
      },
      {
        id: "trend-6",
        title: "Islamic Home Decor - Lantern Set",
        price: "$39.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 1600,
        seller: { name: "Islamic Home", rating: 4.8 },
        trending: true,
      },
    ]

    return NextResponse.json({
      success: true,
      products: trendingProducts,
      total: trendingProducts.length,
    })
  } catch (error) {
    console.error("Trending API error:", error)
    return NextResponse.json({ error: "Failed to fetch trending products" }, { status: 500 })
  }
}
