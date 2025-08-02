import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
})

// Islamic product categories for Stripe metadata
export const ISLAMIC_PRODUCT_CATEGORIES = {
  WOMENS_CLOTHING: "womens_islamic_clothing",
  MENS_CLOTHING: "mens_islamic_clothing",
  PRAYER_ITEMS: "prayer_items",
  HOME_DECOR: "islamic_home_decor",
  BOOKS: "islamic_books",
  ACCESSORIES: "islamic_accessories",
} as const

// Charity organizations for donations
export const CHARITY_ORGANIZATIONS = {
  BALSAMAT_AL_KHAIR: {
    name: "Balsamat Al-Khair",
    percentage: 25,
    description: "Supporting communities worldwide",
  },
  ISLAMIC_RELIEF: {
    name: "Islamic Relief",
    percentage: 25,
    description: "Global humanitarian aid",
  },
} as const
