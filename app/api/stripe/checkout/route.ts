import { type NextRequest, NextResponse } from "next/server"
import { stripe, CHARITY_ORGANIZATIONS } from "@/lib/stripe"
import { calculateCharityDonation, createIslamicProductMetadata } from "@/lib/stripe-client"

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail, shippingAddress } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const charityDonation = calculateCharityDonation(subtotal)
    const total = subtotal

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: `${item.description} | 25% donated to charity`,
          images: [item.image || `${process.env.NEXT_PUBLIC_SITE_URL}/placeholder.svg`],
          metadata: createIslamicProductMetadata(item),
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,

      // Customer information
      customer_email: customerEmail,

      // Shipping configuration
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "AU",
          "DE",
          "FR",
          "IT",
          "ES",
          "NL",
          "BE",
          "AE",
          "SA",
          "QA",
          "KW",
          "BH",
          "OM",
          "JO",
          "LB",
          "EG",
          "MA",
          "TR",
          "ID",
          "MY",
          "SG",
          "PK",
          "BD",
          "IN",
        ],
      },

      // Metadata for Islamic marketplace
      metadata: {
        platform: "autodrop_islamic_marketplace",
        charity_organization: CHARITY_ORGANIZATIONS.BALSAMAT_AL_KHAIR.name,
        charity_donation_amount: charityDonation.toString(),
        charity_percentage: "25",
        product_categories: items.map((item: any) => item.category).join(","),
        total_items: items.length.toString(),
        subtotal: subtotal.toString(),
        is_islamic_products: "true",
      },

      // Payment intent data
      payment_intent_data: {
        metadata: {
          charity_donation: charityDonation.toString(),
          islamic_marketplace: "true",
        },
      },

      // Custom fields for Islamic marketplace
      custom_fields: [
        {
          key: "charity_acknowledgment",
          label: {
            type: "custom",
            custom: "Charity Donation Acknowledgment",
          },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: `Yes, donate 25% (${formatCurrency(charityDonation)}) to ${CHARITY_ORGANIZATIONS.BALSAMAT_AL_KHAIR.name}`,
                value: "yes_donate",
              },
            ],
          },
          optional: false,
        },
      ],

      // Automatic tax calculation
      automatic_tax: {
        enabled: true,
      },

      // Invoice creation
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Islamic Marketplace Purchase - AutoDrop Platform`,
          metadata: {
            charity_donation: charityDonation.toString(),
            platform: "autodrop_islamic_marketplace",
          },
          footer: `Thank you for your purchase! 25% (${formatCurrency(charityDonation)}) of your order will be donated to ${CHARITY_ORGANIZATIONS.BALSAMAT_AL_KHAIR.name}.`,
        },
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
      charityDonation,
      total,
    })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
