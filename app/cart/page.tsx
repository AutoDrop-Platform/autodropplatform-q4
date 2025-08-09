"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items = [], removeFromCart, updateQty, totalCents, clearCart } = useCart();

  const checkout = async () => {
    if (!items.length) return;
    const payload = {
  items: items.map((x: any) => ({
        name: x.name,
        image: x.image,
        amount: x.priceCents,
        quantity: x.quantity,
      })),
      currency: "usd",
    };
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  };

  if (!items.length)
    return <div className="p-10 text-center">Your cart is empty.</div>;

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
  {items.map((x: any) => (
          <div key={x.id} className="border rounded p-4 flex items-center gap-4">
            <img
              src={x.image || "/placeholder.png"}
              alt={x.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-semibold">{x.name}</div>
              <div className="text-sm text-gray-600">
                ${(x.priceCents / 100).toFixed(2)}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Button onClick={() => updateQty(x.id, x.quantity - 1)}>-</Button>
                <span>{x.quantity}</span>
                <Button onClick={() => updateQty(x.id, x.quantity + 1)}>+</Button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">
                ${((x.priceCents * x.quantity) / 100).toFixed(2)}
              </div>
              <Button className="mt-2" onClick={() => removeFromCart(x.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-xl font-bold">
          Total: ${(totalCents / 100).toFixed(2)}
        </div>
        <div className="flex gap-2">
          <Button onClick={clearCart}>Clear</Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={checkout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
