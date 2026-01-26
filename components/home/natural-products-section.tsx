"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

// 100% Natural product line - preservative-free, botanical-based
const NATURAL_PRODUCTS = [
    {
        id: "natural-1",
        name: "Rose Petal Cleansing Milk",
        slug: "rose-petal-cleansing-milk",
        category: "Cleanser",
        price: "€34",
        image: "/products/rosepetal-cleansing-milk.png",
        keyIngredient: "Rosa Damascena",
    },
    {
        id: "natural-2",
        name: "Chamomile Calming Toner",
        slug: "chamomile-calming-toner",
        category: "Toner",
        price: "€29",
        image: "/products/chamomile-calming-toner.png",
        keyIngredient: "Chamomilla Recutita",
    },
    {
        id: "natural-3",
        name: "Bakuchiol Renewal Serum",
        slug: "bakuchiol-renewal-serum",
        category: "Serum",
        price: "€52",
        image: "/products/bakuchiol-renewal-serum.png",
        keyIngredient: "Bakuchiol (Retinol Alternative)",
    },
    {
        id: "natural-4",
        name: "Squalane + Rosehip Oil",
        slug: "squalane-rosehip-oil",
        category: "Oil",
        price: "€44",
        image: "/products/squalane-rosehip-oil.png",
        keyIngredient: "Rosa Rubiginosa",
    },
    {
        id: "natural-5",
        name: "Aloe Vera Gel Moisturizer",
        slug: "aloe-vera-gel-moisturizer",
        category: "Moisturizer",
        price: "€36",
        image: "/products/aloevera-gel-moisturizer.png",
        keyIngredient: "Aloe Barbadensis",
    },
    {
        id: "natural-6",
        name: "Green Tea Antioxidant Mist",
        slug: "green-tea-antioxidant-mist",
        category: "Mist",
        price: "€26",
        image: "/products/green-tea-antioxidant-mist.png",
        keyIngredient: "Camellia Sinensis",
    },
];

export function NaturalProductsSection() {
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
                    {NATURAL_PRODUCTS.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group block"
                        >
                            {/* Product Image Placeholder */}
                            <div className="aspect-[3/4] relative rounded-lg overflow-hidden mb-4
                            border border-accent/20 transition-all duration-500
                            bg-gradient-to-b from-green-50/50 to-amber-50/30
                            group-hover:shadow-lg group-hover:border-accent/40
                            group-hover:scale-[1.02]">
                                {product.image ? (
                                    <img
                                        src={product.image}
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
                                        {product.category}
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
                                <p className="text-xs text-muted-foreground/70 italic">
                                    {product.keyIngredient}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Button asChild variant="outline" size="lg" className="border-accent/30 hover:border-accent">
                        <Link href="/products?category=natural">
                            View Botanical Collection
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
