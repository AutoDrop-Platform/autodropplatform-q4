import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // Mock data for Islamic clothing products
    const mockProducts = [
      {
        id: "1",
        title: "Premium Silk Hijab - Elegant Black",
        price: "$24.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 1250,
        seller: { name: "Islamic Fashion Store", rating: 4.9 },
      },
      {
        id: "2",
        title: "Traditional Abaya with Embroidery",
        price: "$89.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        orders: 890,
        seller: { name: "Modest Wear Co", rating: 4.8 },
      },
      {
        id: "3",
        title: "Prayer Mat - Turkish Design",
        price: "$34.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        orders: 2100,
        seller: { name: "Islamic Essentials", rating: 4.9 },
      },
      {
        id: "4",
        title: "Quran Holder - Wooden Stand",
        price: "$19.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        orders: 650,
        seller: { name: "Islamic Crafts", rating: 4.7 },
      },
      {
        id: "5",
        title: "Islamic Wall Art - Calligraphy",
        price: "$45.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        orders: 1100,
        seller: { name: "Islamic Decor", rating: 4.8 },
      },
      {
        id: "6",
        title: "Modest Tunic - Long Sleeve",
        price: "$39.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        orders: 780,
        seller: { name: "Modest Fashion Hub", rating: 4.6 },
      },
    ]

    // Filter products based on query
    const filteredProducts = mockProducts
      .filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          (query.toLowerCase().includes("hijab") && product.title.toLowerCase().includes("hijab")) ||
          (query.toLowerCase().includes("abaya") && product.title.toLowerCase().includes("abaya")) ||
          (query.toLowerCase().includes("prayer") && product.title.toLowerCase().includes("prayer")) ||
          (query.toLowerCase().includes("quran") && product.title.toLowerCase().includes("quran")) ||
          (query.toLowerCase().includes("islamic") && product.title.toLowerCase().includes("islamic")) ||
          (query.toLowerCase().includes("modest") && product.title.toLowerCase().includes("modest")),
      )
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
