import { type NextRequest, NextResponse } from "next/server";
import aliexpressAPI from "@/lib/aliexpress-api";

export async function GET(request: NextRequest) {
  try {
    const categories = await aliexpressAPI.getCategories();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("AliExpress categories API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get categories" },
      { status: 500 }
    );
  }
}
