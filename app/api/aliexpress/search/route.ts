import { type NextRequest, NextResponse } from "next/server"
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // جلب بيانات حقيقية من AliExpress RapidAPI
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const response = await axios.get(
      "https://ali-express1.p.rapidapi.com/search",
      {
        params: {
          q: query,
          sort: "BEST_MATCH",
          page: 1,
          pageSize: limit,
        },
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "ali-express1.p.rapidapi.com",
        },
      }
    );
    const products = response.data.result || [];
    return NextResponse.json({
      success: true,
      products,
      total: products.length,
    });
  } catch (error: any) {
    console.error("Search API error:", error?.message || error);
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 });
  }
}
