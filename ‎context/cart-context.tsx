"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: string;            // معرّف داخلي (من API أو index)
  name: string;
  image?: string;
  priceCents: number;    // السعر بالسنت
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalCents: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const v = useContext(CartContext);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart: CartContextType["addToCart"] = (p) => {
    const qty = p.quantity ?? 1;
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + qty };
        return next;
      }
      return [...prev, { ...p, quantity: qty }];
    });
  };

  const removeFromCart = (id: string) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: Math.max(1, qty) } : x))
    );

  const clearCart = () => setItems([]);

  const totalCents = useMemo(
    () => items.reduce((s, x) => s + x.priceCents * x.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalCents }}
    >
      {children}
    </CartContext.Provider>
  );
};
