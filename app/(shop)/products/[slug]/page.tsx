import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "@/lib/queries/products";
import { ProductDetails } from "@/components/product/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found | VÉRA" };

  return {
    title: `${product.name} | VÉRA`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <ProductDetails product={product} />
      </div>
    </div>
  );
}
