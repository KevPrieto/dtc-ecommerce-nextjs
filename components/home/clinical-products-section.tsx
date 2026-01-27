import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProductsBySlugs } from "@/lib/queries/products";

// Clinical product slugs to fetch from database
const CLINICAL_PRODUCT_SLUGS = [
    "gentle-cleansing-gel",
    "hydrating-essence",
    "hyaluronic-serum",
    "vitamin-c-serum",
    "daily-moisturizer",
    "mineral-sunscreen-spf50",
];

// Category mapping for display purposes
const CATEGORY_DISPLAY: Record<string, string> = {
    "cleansers": "Cleanser",
    "treatments": "Treatment",
    "moisturizers": "Moisturizer",
    "sun-protection": "Sun Protection",
};

export async function ClinicalProductsSection() {
    // Fetch products from database
    const products = await getProductsBySlugs(CLINICAL_PRODUCT_SLUGS);

    // Return null if no products found
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                        Science-Backed Formulas
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                        Clinical Collection
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Precision formulations with proven active ingredients.
                        Designed for measurable results through clinical-grade compounds.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {products.map((product) => {
                        const lowestPrice = product.variants && product.variants.length > 0
                            ? Math.min(...product.variants.map(v => v.price))
                            : 0;
                        const formattedPrice = `€${(lowestPrice / 100).toFixed(0)}`;
                        const displayCategory = CATEGORY_DISPLAY[product.category] || product.category;

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group block"
                            >
                                {/* Product Image */}
                                <div className="aspect-[3/4] relative bg-muted/50 rounded-lg overflow-hidden mb-4
                                border border-border/50 transition-all duration-500
                                group-hover:shadow-lg group-hover:border-border
                                group-hover:scale-[1.02]">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700
                                   group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-4
                                      bg-gradient-to-b from-neutral-100 to-neutral-50">
                                            <div className="w-12 h-24 bg-gradient-to-b from-neutral-300 to-neutral-200
                                        rounded-t-full rounded-b-lg shadow-sm mb-3" />
                                            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                                VÉRA
                                            </span>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-[10px] uppercase tracking-wider px-2 py-1
                                       bg-background/90 backdrop-blur-sm rounded text-muted-foreground">
                                            {displayCategory}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium leading-tight group-hover:text-primary/80
                                   transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {formattedPrice}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/products">
                            View All Products
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
