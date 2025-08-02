import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoDrop - Islamic Marketplace | Authentic Islamic Products with Charity",
  description:
    "Discover authentic Islamic clothing, prayer items, and home decor. 25% of profits donated to charity. Free worldwide shipping on Islamic products.",
  keywords: "Islamic clothing, hijab, abaya, thobe, prayer mat, Islamic marketplace, halal products, charity donation",
  authors: [{ name: "AutoDrop Team" }],
  creator: "AutoDrop Islamic Marketplace",
  publisher: "AutoDrop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://autodropplatform.shop"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AutoDrop - Islamic Marketplace",
    description: "Authentic Islamic products with 25% donated to charity",
    url: "https://autodropplatform.shop",
    siteName: "AutoDrop Islamic Marketplace",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoDrop Islamic Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoDrop - Islamic Marketplace",
    description: "Authentic Islamic products with 25% donated to charity",
    images: ["/twitter-image.jpg"],
    creator: "@autodropshop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AutoDrop" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
