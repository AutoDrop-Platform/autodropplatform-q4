import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

type BodyItem = {
  name: string;
  image?: string;
  amount: number;
  quantity?: number;
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
    const currency = payload.currency ?? "usd";

    let items: BodyItem[] = [];

    if ("items" in payload && Array.isArray(payload.items)) {
      items = payload.items
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
          name: payload.name?.trim() || "Product",
          image: payload.image,
          amount: sanitizeAmount(payload.amount),
          quantity:
            payload.quantity && payload.quantity > 0
              ? Math.floor(payload.quantity)
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
        unit_amount: x.amount,
      },
      quantity: x.quantity ?? 1,
    }));

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout failed (unknown error)";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
