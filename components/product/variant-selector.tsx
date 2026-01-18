"use client";

import { ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length <= 1) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Size</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            variant={selectedVariant.id === variant.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(variant)}
            disabled={variant.stock === 0}
          >
            {variant.name}
            {variant.stock === 0 && " (Out of stock)"}
          </Button>
        ))}
      </div>
    </div>
  );
}
