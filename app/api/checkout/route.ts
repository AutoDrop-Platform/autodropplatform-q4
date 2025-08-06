import { NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2024-06-20" }) : null;

const sql = neon(process.env.DATABASE_URL!);

type BodyItem = {
  name: string;
  image?: string;
  amount: number;
  quantity?: number;
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe key missing" }, { status: 500 });
    }

    const payload = await req.json();
    const items: BodyItem[] = Array.isArray(payload?.items)
      ? payload.items
      : [
          {
            name: payload?.name || "Product",
            image: payload?.image,
            amount: typeof payload?.amount === "number" ? payload.amount : 500,
            quantity: 1,
          },
        ];
    const currency = payload?.currency || "usd";

    const line_items = items.map((x) => ({
      price_data: {
        currency,
        product_data: { name: x.name, images: x.image ? [x.image] : [] },
        unit_amount: x.amount,
      },
      quantity: x.quantity || 1,
    }));

    const totalCents = items.reduce((sum, x) => sum + x.amount * (x.quantity || 1), 0);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    // حفظ الطلب في قاعدة البيانات
    await sql`INSERT INTO orders (email, items, total_cents) VALUES (${payload.email || "guest@example.com"}, ${JSON.stringify(items)}, ${totalCents})`;

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error("Checkout error:", e);
    return NextResponse.json({ error: e?.message || "Checkout failed" }, { status: 500 });
  }
}
