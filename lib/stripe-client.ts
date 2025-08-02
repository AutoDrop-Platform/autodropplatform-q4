import { loadStripe } from "@stripe/stripe-js"

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
let stripePromise: Promise<any>

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set")
    }
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

// Format currency for Islamic markets
export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

// Calculate charity donation
export const calculateCharityDonation = (amount: number, percentage = 25) => {
  return Math.round(((amount * percentage) / 100) * 100) / 100
}

// Islamic product metadata for Stripe
export const createIslamicProductMetadata = (product: any) => ({
  product_type: "islamic_clothing",
  category: product.category,
  is_halal_certified: "true",
  charity_donation_percentage: "25",
  seller_type: "islamic_marketplace",
  product_origin: product.origin || "various",
  size_guide: product.sizeGuide || "standard",
  care_instructions: product.careInstructions || "gentle_wash",
})
