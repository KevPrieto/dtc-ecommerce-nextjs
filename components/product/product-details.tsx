"use client";

import { useState } from "react";
import { ProductWithVariants, ProductVariant } from "@/types";
import { VariantSelector } from "./variant-selector";
import { AddToCartButton } from "./add-to-cart-button";
import { formatPrice } from "@/lib/format";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsProps {
  product: ProductWithVariants;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">
          {product.category.replace("-", " ")}
        </p>
        <h1 className="text-3xl font-semibold mt-1">{product.name}</h1>
        <p className="text-2xl mt-2">{formatPrice(selectedVariant.price)}</p>
      </div>

      <Separator />

      {product.description && (
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      )}

      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelect={setSelectedVariant}
      />

      <AddToCartButton product={product} selectedVariant={selectedVariant} />

      <div className="text-sm text-muted-foreground space-y-1">
        <p>Free shipping on orders over 50 EUR</p>
        <p>30-day return policy</p>
      </div>
    </div>
  );
}
