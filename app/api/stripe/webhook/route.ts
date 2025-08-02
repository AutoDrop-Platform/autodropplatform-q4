import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session

      // Retrieve line items to get product details
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      })

      // Extract product IDs and names from line items
      const products = lineItems.data.map((item) => ({
        id: (item.price?.product as Stripe.Product)?.id,
        name: (item.price?.product as Stripe.Product)?.name,
        quantity: item.quantity,
        unit_amount: item.price?.unit_amount,
      }))

      // Placeholder for charity donation and organization (if applicable)
      // You would typically get this from metadata on the session or product
      const charityDonation = session.metadata?.charity_donation
        ? Number.parseInt(session.metadata.charity_donation)
        : null
      const charityOrganization = session.metadata?.charity_organization || null

      try {
        await sql`
          INSERT INTO orders (
            id,
            email,
            amount_total,
            currency,
            status,
            charity_donation,
            charity_organization,
            created_at
          ) VALUES (
            ${session.id},
            ${session.customer_details?.email},
            ${session.amount_total},
            ${session.currency},
            ${session.status},
            ${charityDonation},
            ${charityOrganization},
            NOW()
          );
        `

        // For each product in the order, insert into a line_items table (if you had one)
        // This example assumes a single order table for simplicity, but for multiple products
        // a separate line_items table linked by order_id would be necessary.
        // For now, we'll just log the products.
        console.log("Products in order:", products)

        // Placeholder for sending order confirmation email
        await sendOrderConfirmationEmail(session.customer_details?.email, session.id, products)

        console.log(`Order ${session.id} saved to database.`)
      } catch (dbError) {
        console.error("Error saving order to database:", dbError)
        return new NextResponse("Database Error", { status: 500 })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse("Received", { status: 200 })
}

async function sendOrderConfirmationEmail(email: string | undefined, orderId: string, products: any[]) {
  if (!email) {
    console.warn("No email provided for order confirmation.")
    return
  }
  console.log(`Sending order confirmation email to ${email} for order ${orderId} with products:`, products)
  // In a real application, you would integrate with an email service here (e.g., Resend, SendGrid)
}
