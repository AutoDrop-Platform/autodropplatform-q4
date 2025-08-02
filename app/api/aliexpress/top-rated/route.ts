import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock top-rated Islamic products data
    const topRatedProducts = [
      {
        id: "top-1",
        title: "Premium Silk Hijab - Best Seller",
        price: "$34.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        orders: 5200,
        seller: { name: "Top Islamic Fashion", rating: 4.9 },
        topRated: true,
      },
      {
        id: "top-2",
        title: "Handcrafted Prayer Mat - Authentic",
        price: "$89.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        orders: 3800,
        seller: { name: "Authentic Islamic Crafts", rating: 4.9 },
        topRated: true,
      },
      {
        id: "top-3",
        title: "Elegant Abaya - Customer Favorite",
        price: "$99.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 4100,
        seller: { name: "Elite Modest Wear", rating: 4.8 },
        topRated: true,
      },
      {
        id: "top-4",
        title: "Islamic Calligraphy Art - Framed",
        price: "$59.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 2900,
        seller: { name: "Islamic Art Gallery", rating: 4.8 },
        topRated: true,
      },
      {
        id: "top-5",
        title: "Modest Dress Collection - 3 Piece",
        price: "$79.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        orders: 2200,
        seller: { name: "Modest Collection", rating: 4.7 },
        topRated: true,
      },
      {
        id: "top-6",
        title: "Islamic Books Set - Essential Reading",
        price: "$44.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 1800,
        seller: { name: "Islamic Knowledge", rating: 4.8 },
        topRated: true,
      },
    ]

    return NextResponse.json({
      success: true,
      products: topRatedProducts,
      total: topRatedProducts.length,
    })
  } catch (error) {
    console.error("Top-rated API error:", error)
    return NextResponse.json({ error: "Failed to fetch top-rated products" }, { status: 500 })
  }
}
