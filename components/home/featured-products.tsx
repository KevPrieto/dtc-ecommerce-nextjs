import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { getFeaturedProducts } from "@/lib/queries/products";
import { Button } from "@/components/ui/button";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Featured</h2>
        <Button asChild variant="ghost">
          <Link href="/products">View All</Link>
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
