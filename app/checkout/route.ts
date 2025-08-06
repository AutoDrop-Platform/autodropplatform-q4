import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs"; // تأكيد بيئة Node (Stripe لا يعمل على Edge)

const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

// أنواع واضحة
type BodyItem = {
  name: string;
  image?: string;
  amount: number;    // بالسنت
  quantity?: number; // افتراضي 1
};

type Payload =
  | {
      items: BodyItem[];
      currency?: string;
    }
  | {
      name?: string;
      image?: string;
      amount?: number;
      quantity?: number;
      currency?: string;
    };

// توحيد القيمة لتكون سنتات صحيحة وبحد أدنى 50
function sanitizeAmount(x: unknown): number {
  const n = typeof x === "number" ? Math.round(x) : 0;
  return n >= 50 ? n : 50;
}

export async function POST(req: Request) {
  try {
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe key missing" },
        { status: 500 }
      );
    }

    const payload = (await req.json()) as Payload;
    const currency = (payload as any).currency ?? "usd";

    // تجهيز العناصر: يدعم single item أو items[]
    let items: BodyItem[] = [];
    if (Array.isArray((payload as any).items)) {
      items = ((payload as any).items as BodyItem[])
        .map((it) => ({
          name: it.name?.trim() || "Product",
          image: it.image,
          amount: sanitizeAmount(it.amount),
          quantity: it.quantity && it.quantity > 0 ? Math.floor(it.quantity) : 1,
        }))
        .filter((it) => Number.isFinite(it.amount) && it.amount >= 50);
    } else {
      items = [
        {
          name: (payload as any).name?.trim() || "Product",
          image: (payload as any).image,
          amount: sanitizeAmount((payload as any).amount),
          quantity:
            (payload as any).quantity && (payload as any).quantity > 0
              ? Math.floor((payload as any).quantity)
              : 1,
        },
      ];
    }

    if (!items.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const line_items = items.map((x) => ({
      price_data: {
        currency,
        product_data: {
          name: x.name,
          images: x.image ? [x.image] : [],
        },
        unit_amount: x.amount, // بالسنت
      },
      quantity: x.quantity ?? 1,
    }));

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // لا حاجة لتحديد payment_method_types مع الإصدارات الحديثة
      line_items,
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      // لو بتستخدم Stripe Tax لاحقًا:
      // automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout failed (unknown error)";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
