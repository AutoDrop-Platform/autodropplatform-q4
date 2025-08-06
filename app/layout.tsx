import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/context/cart-context";

export const metadata: Metadata = {
  title: "AutoDrop Platform",
  description: "Smart dropshipping platform",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
