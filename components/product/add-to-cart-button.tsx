"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { ProductWithVariants, ProductVariant } from "@/types";

interface AddToCartButtonProps {
  product: ProductWithVariants;
  selectedVariant: ProductVariant;
}

export function AddToCartButton({
  product,
  selectedVariant,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      variantName: selectedVariant.name,
      sku: selectedVariant.sku,
      price: selectedVariant.price,
      quantity: 1,
      imageUrl: product.image_url,
    });
    openCart();
  };

  const isOutOfStock = selectedVariant.stock === 0;

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
