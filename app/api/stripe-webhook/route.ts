import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      console.log("✅ Payment successful:", event.data.object);
      // هنا نرسل البيانات للبوت لاحقًا
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
