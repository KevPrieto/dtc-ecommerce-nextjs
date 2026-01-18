"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4">
      <div className="w-20 h-20 relative bg-muted rounded overflow-hidden flex-shrink-0">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.productName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.productSlug}`}
          className="font-medium hover:underline line-clamp-1"
        >
          {item.productName}
        </Link>
        <p className="text-sm text-muted-foreground">{item.variantName}</p>
        <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 flex-shrink-0"
        onClick={() => removeItem(item.variantId)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
