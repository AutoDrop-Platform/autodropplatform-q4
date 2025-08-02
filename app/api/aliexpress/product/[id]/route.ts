import { type NextRequest, NextResponse } from "next/server"
import { aliexpressAPI } from "@/lib/aliexpress-api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await aliexpressAPI.getProductDetails(params.id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("AliExpress product API error:", error)
    return NextResponse.json({ success: false, error: "Failed to get product details" }, { status: 500 })
  }
}
