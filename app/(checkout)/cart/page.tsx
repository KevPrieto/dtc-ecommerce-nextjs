"use client";

import { useCartStore } from "@/stores/cart-store";
import { CartItem } from "@/components/cart/cart-item";
import { CheckoutButton } from "@/components/checkout/checkout-button";
import { formatPrice } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.variantId} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4 sticky top-4">
            <h2 className="font-semibold">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <CheckoutButton items={items} />

            <p className="text-xs text-center text-muted-foreground">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
