"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

export function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCart}
      aria-label="Cart"
      className="relative"
    >
      <ShoppingBag className="h-5 w-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Button>
  );
}
