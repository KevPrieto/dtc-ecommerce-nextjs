import Link from "next/link";
import Image from "next/image";
import { ProductWithVariants } from "@/types";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: ProductWithVariants;
}

export function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasMultiplePrices =
    product.variants.length > 1 &&
    new Set(product.variants.map((v) => v.price)).size > 1;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="aspect-square relative bg-muted overflow-hidden rounded-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-2xl group-hover:-translate-y-2">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-2px]">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="font-medium leading-tight transition-colors duration-300 group-hover:text-primary">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {hasMultiplePrices ? "From " : ""}
          {formatPrice(lowestPrice)}
        </p>
      </div>
    </Link>
  );
}
