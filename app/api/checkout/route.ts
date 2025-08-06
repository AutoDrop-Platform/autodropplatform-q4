import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2024-06-20" }) : null;

type BodyItem = {
  name: string;
  image?: string;
  amount: number;   // cents
  quantity?: number;
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe key missing" }, { status: 500 });
    }

    const payload = await req.json();

    // يدعم: single item أو مصفوفة items
    const items: BodyItem[] = Array.isArray(payload?.items)
      ? payload.items
      : [
          {
            name: payload?.name || "Product",
            image: payload?.image,
            amount:
              typeof payload?.amount === "number" && payload.amount > 0
                ? payload.amount
                : 500,
            quantity: 1,
          },
        ];

    const currency = payload?.currency || "usd";

    const line_items = items.map((x) => ({
      price_data: {
        currency,
        product_data: {
          name: x.name || "Product",
          images: x.image ? [x.image] : [],
        },
        unit_amount: x.amount > 50 ? x.amount : 500,
      },
      quantity: x.quantity && x.quantity > 0 ? x.quantity : 1,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error("Checkout error:", e);
    return NextResponse.json({ error: e?.message || "Checkout failed" }, { status: 500 });
  }
}
