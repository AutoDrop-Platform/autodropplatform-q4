import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2024-06-20" }) : null;

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe key missing" }, { status: 500 });
    }

    const payload = await req.json();
    const { items, currency = "usd", customerDetails, shipFrom } = payload;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // حساب الضريبة باستخدام Stripe Tax
    const taxCalculation = await stripe.tax.calculations.create({
      currency,
      line_items: items.map((item, index) => ({
        amount: item.amount,
        reference: `L${index + 1}`,
      })),
      customer_details: {
        address: {
          line1: customerDetails?.address?.line1 || "",
          city: customerDetails?.address?.city || "",
          state: customerDetails?.address?.state || "",
          postal_code: customerDetails?.address?.postal_code || "",
          country: customerDetails?.address?.country || "US",
        },
        address_source: "shipping",
      },
      ship_from_details: {
        address: {
          city: shipFrom?.city || "",
          state: shipFrom?.state || "",
          postal_code: shipFrom?.postal_code || "",
          country: shipFrom?.country || "US",
        },
      },
    });

    console.log("Tax Calculation:", taxCalculation);

    const totalWithTax = items.reduce((sum, x) => sum + x.amount * (x.quantity || 1), 0) 
      + (taxCalculation?.tax_amount_exclusive || 0);

    const line_items = items.map((x) => ({
      price_data: {
        currency,
        product_data: { name: x.name, images: x.image ? [x.image] : [] },
        unit_amount: x.amount,
      },
      quantity: x.quantity || 1,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://autodropplatform.shop";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      automatic_tax: { enabled: true }, // تفعيل الضريبة في الجلسة
    });

    return NextResponse.json({ url: session.url, tax: taxCalculation });
  } catch (e: any) {
    console.error("Checkout error:", e);
    return NextResponse.json({ error: e?.message || "Checkout failed" }, { status: 500 });
  }
}
