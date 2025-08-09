import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  // لا تطبع المفتاح في الإنتاج، فقط تحقق من وجوده
  if (!rapidApiKey) {
    console.error('RapidAPI Key غير موجود في البيئة!');
    return NextResponse.json(
      { error: 'مفتاح RapidAPI غير موجود في البيئة. يرجى إضافته إلى ملف .env.local.' },
      { status: 500 }
    );
  }
  try {
    const response = await axios.get(
      `https://aliexpress-datahub.p.rapidapi.com/item_detail_2?itemId=${productId}`,
      {
        headers: {
          "x-rapidapi-key": rapidApiKey,
          "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("AliExpress API error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "تعذر جلب بيانات المنتج من AliExpress. تحقق من الاشتراك أو المفتاح." },
      { status: 500 }
    );
  }
}
