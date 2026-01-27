import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { getProductsBySlugs } from "@/lib/queries/products";

// Botanical product slugs to fetch from database
const NATURAL_PRODUCT_SLUGS = [
    "rose-petal-cleansing-milk",
    "chamomile-calming-toner",
    "bakuchiol-renewal-serum",
    "squalane-rosehip-oil",
    "aloe-vera-gel-moisturizer",
    "green-tea-antioxidant-mist",
];

// Category mapping for display purposes
const CATEGORY_DISPLAY: Record<string, string> = {
    "cleansers": "Cleanser",
    "treatments": "Toner",
    "moisturizers": "Moisturizer",
};

// Botanical key ingredients for rich product data (if available from description or metadata)
const KEY_INGREDIENTS: Record<string, string> = {
    "rose-petal-cleansing-milk": "Rosa Damascena",
    "chamomile-calming-toner": "Chamomilla Recutita",
    "bakuchiol-renewal-serum": "Bakuchiol (Retinol Alternative)",
    "squalane-rosehip-oil": "Rosa Rubiginosa",
    "aloe-vera-gel-moisturizer": "Aloe Barbadensis",
    "green-tea-antioxidant-mist": "Camellia Sinensis",
};

export async function NaturalProductsSection() {
    // Fetch products from database
    const products = await getProductsBySlugs(NATURAL_PRODUCT_SLUGS);

    // Debug logging
    console.log("[NaturalProductsSection] Expected:", NATURAL_PRODUCT_SLUGS.length, "products");
    console.log("[NaturalProductsSection] Received:", products.length, "products");
    console.log("[NaturalProductsSection] Requested slugs:", NATURAL_PRODUCT_SLUGS);
    console.log("[NaturalProductsSection] Returned slugs:", products.map(p => p.slug));

    // Return null if no products found
    if (products.length === 0) {
        return null;
    }
    return (
        <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] 
                          text-accent mb-4">
                        <Leaf className="w-4 h-4" />
                        <span>100% Natural · No Preservatives</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                        Botanical Collection
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Pure botanical formulations with zero synthetic preservatives.
                        Every ingredient sourced directly from nature for gentle, effective care.
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
                        const keyIngredient = KEY_INGREDIENTS[product.slug] || "";

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group block"
                            >
                                {/* Product Image */}
                                <div className="aspect-[3/4] relative rounded-lg overflow-hidden mb-4
                                border border-accent/20 transition-all duration-500
                                bg-gradient-to-b from-green-50/50 to-amber-50/30
                                group-hover:shadow-lg group-hover:border-accent/40
                                group-hover:scale-[1.02]">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700
                                   group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                            {/* Botanical bottle silhouette */}
                                            <div className="relative">
                                                <div className="w-10 h-20 bg-gradient-to-b from-amber-200/60 to-amber-100/40
                                          rounded-t-full rounded-b-lg shadow-sm" />
                                                <Leaf className="absolute -top-1 -right-1 w-4 h-4 text-accent/60" />
                                            </div>
                                            <span className="text-[10px] text-accent/60 uppercase tracking-wider mt-3">
                                                VÉRA Natural
                                            </span>
                                        </div>
                                    )}

                                    {/* Botanical Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-[10px] uppercase tracking-wider px-2 py-1
                                       bg-background/90 backdrop-blur-sm rounded text-accent
                                       border border-accent/20">
                                            {displayCategory}
                                        </span>
                                    </div>

                                    {/* Natural Badge */}
                                    <div className="absolute bottom-3 right-3">
                                        <div className="w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm
                                      flex items-center justify-center border border-accent/20">
                                            <Leaf className="w-4 h-4 text-accent" />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium leading-tight group-hover:text-accent
                                   transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    {keyIngredient && (
                                        <p className="text-xs text-muted-foreground/70 italic">
                                            {keyIngredient}
                                        </p>
                                    )}
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
                    <Button asChild variant="outline" size="lg" className="border-accent/30 hover:border-accent">
                        <Link href="/products">
                            View All Products
                        </Link>
                    </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs text-muted-foreground/60 uppercase tracking-wider">
                    <span>No Parabens</span>
                    <span>•</span>
                    <span>No Sulfates</span>
                    <span>•</span>
                    <span>No Synthetic Fragrances</span>
                    <span>•</span>
                    <span>Vegan</span>
                    <span>•</span>
                    <span>Cruelty-Free</span>
                </div>
            </div>
        </section>
    );
}
