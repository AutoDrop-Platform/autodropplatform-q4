import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY; // ضَع المفتاح في Vercel
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2024-06-20" }) : null;

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe key missing" }, { status: 500 });
    }

    const { name, image, amount, currency = "usd" } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: name || "Product",
              images: image ? [image] : [],
            },
            unit_amount: typeof amount === "number" ? amount : 500,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop"}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop"}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Checkout failed" }, { status: 500 });
  }
}
