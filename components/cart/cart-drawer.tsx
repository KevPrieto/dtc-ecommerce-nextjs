"use client";

import { useCartStore } from "@/stores/cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./cart-item";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.variantId} item={item} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping calculated at checkout
              </p>
              <Button asChild className="w-full" size="lg" onClick={closeCart}>
                <Link href="/cart">View Cart & Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
