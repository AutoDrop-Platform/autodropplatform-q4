import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  try {
    const response = await axios.get(
      `https://aliexpress-datahub.p.rapidapi.com/item_detail_2?itemId=${productId}`,
      {
        headers: {
          "x-rapidapi-key":
            process.env.RAPIDAPI_KEY ||
            "a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36",
          "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("AliExpress API error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
