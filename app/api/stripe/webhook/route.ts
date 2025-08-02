import { type NextRequest, NextResponse } from "next/server"
import { stripe, CHARITY_ORGANIZATIONS } from "@/lib/stripe"
import { headers } from "next/headers"
import { sql } from "@/lib/db"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get("stripe-signature")!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log(`🔔 Stripe webhook received: ${event.type}`)

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object)
        break

      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object)
        break

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object)
        break

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: any) {
  console.log("✅ Checkout completed:", session.id)

  const charityDonation = Number.parseFloat(session.metadata?.charity_donation || "0")
  const charityOrg = session.metadata?.charity_organization || CHARITY_ORGANIZATIONS.BALSAMAT_AL_KHAIR.name

  console.log(`💝 Processing charity donation: $${charityDonation} to ${charityOrg}`)

  // 1. Save order to database
  try {
    await sql`
      INSERT INTO orders (
        id, 
        customer_email, 
        amount_total, 
        currency, 
        status, 
        payment_status, 
        charity_donation, 
        charity_organization, 
        metadata
      ) VALUES (
        ${session.id},
        ${session.customer_details?.email},
        ${session.amount_total},
        ${session.currency},
        ${session.status},
        ${session.payment_status},
        ${Math.round(Number.parseFloat(session.metadata?.charity_donation || "0") * 100)},
        ${session.metadata?.charity_organization},
        ${session.metadata ? JSON.stringify(session.metadata) : null}
      )
    `
    console.log(`📦 Order ${session.id} saved to database.`)
  } catch (error) {
    console.error(`🚨 Error saving order ${session.id} to database:`, error)
    // If the webhook fails, Stripe will retry.
    // It's important to handle this gracefully.
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 })
  }

  // 2. Send confirmation email
  await sendOrderConfirmationEmail(session)

  // 3. Process charity donation
  await processCharityDonation(charityDonation, charityOrg, session)

  // 4. Update inventory
  // 5. Notify seller

  console.log(`✅ Order ${session.id} processed successfully`)
}

async function handlePaymentSucceeded(paymentIntent: any) {
  console.log("💳 Payment succeeded:", paymentIntent.id)

  const charityDonation = Number.parseFloat(paymentIntent.metadata?.charity_donation || "0")

  if (charityDonation > 0) {
    console.log(`💝 Payment includes charity donation: $${charityDonation}`)
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  console.log("❌ Payment failed:", paymentIntent.id)

  // Here you would:
  // 1. Log the failure
  // 2. Send failure notification
  // 3. Update order status
  // 4. Potentially retry payment
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  console.log("📄 Invoice payment succeeded:", invoice.id)

  // Process invoice-based payments
}

async function processCharityDonation(amount: number, organization: string, session: any) {
  // In a real implementation, you would:
  // 1. Transfer funds to charity organization
  // 2. Record donation in database
  // 3. Generate tax receipt
  // 4. Send donation confirmation

  console.log(`🏦 Processing $${amount} donation to ${organization}`)

  // Simulate donation processing
  const donationRecord = {
    id: `donation_${Date.now()}`,
    amount,
    organization,
    sessionId: session.id,
    customerEmail: session.customer_email,
    timestamp: new Date().toISOString(),
    status: "completed",
  }

  console.log("💝 Donation processed:", donationRecord)

  return donationRecord
}

async function sendOrderConfirmationEmail(session: any) {
  // In a real implementation, you would send an email using:
  // - SendGrid
  // - AWS SES
  // - Resend
  // - Nodemailer

  console.log(`📧 Sending confirmation email to ${session.customer_email}`)

  const emailData = {
    to: session.customer_email,
    subject: "Order Confirmation - AutoDrop Islamic Marketplace",
    template: "order_confirmation",
    data: {
      orderNumber: session.id,
      charityDonation: session.metadata?.charity_donation,
      charityOrganization: session.metadata?.charity_organization,
      total: (session.amount_total / 100).toFixed(2),
    },
  }

  console.log("📧 Email queued:", emailData)
}
