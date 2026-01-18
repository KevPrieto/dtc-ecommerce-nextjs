import { getProducts, getCategories } from "@/lib/queries/products";
import { ProductGrid } from "@/components/product/product-grid";
import { CategoryFilter } from "@/components/product/category-filter";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Shop | VÉRA",
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">
          {category
            ? category.charAt(0).toUpperCase() +
              category.slice(1).replace("-", " ")
            : "All Products"}
        </h1>
        <CategoryFilter
          categories={categories}
          currentCategory={category || null}
        />
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-muted-foreground">No products found</p>
      )}
    </div>
  );
}
