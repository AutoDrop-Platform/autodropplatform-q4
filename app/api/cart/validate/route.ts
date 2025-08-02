import { NextResponse } from "next/server"
import { aliexpressAPI } from "@/lib/aliexpress-api"

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json()

    if (!Array.isArray(productIds)) {
      return NextResponse.json({ error: "Invalid input: productIds must be an array." }, { status: 400 })
    }

    const validIds = await aliexpressAPI.validateProductIds(productIds)
    return NextResponse.json({ validProductIds: validIds })
  } catch (error) {
    console.error("Cart validation error:", error)
    return NextResponse.json({ error: "Failed to validate cart." }, { status: 500 })
  }
}
