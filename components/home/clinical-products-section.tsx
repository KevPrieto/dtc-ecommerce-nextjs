"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// Clinical product line - existing products
const CLINICAL_PRODUCTS = [
    {
        id: "clinical-1",
        name: "Gentle Cleansing Gel",
        slug: "gentle-cleansing-gel",
        category: "Cleanser",
        price: "€28",
        image: "/products/gentle-cleansing-gel.png",
    },
    {
        id: "clinical-2",
        name: "Hydrating Essence",
        slug: "hydrating-essence",
        category: "Treatment",
        price: "€32",
        image: "/products/hydrating-essence.png",
    },
    {
        id: "clinical-3",
        name: "Hyaluronic Serum",
        slug: "hyaluronic-serum",
        category: "Serum",
        price: "€45",
        image: "/products/hyaluronic-serum.png",
    },
    {
        id: "clinical-4",
        name: "Vitamin C Serum",
        slug: "vitamin-c-serum",
        category: "Serum",
        price: "€48",
        image: "/products/vitamin-c-serum.png",
    },
    {
        id: "clinical-5",
        name: "Daily Moisturizer",
        slug: "daily-moisturizer",
        category: "Moisturizer",
        price: "€38",
        image: "/products/daily-moisturizer.png",
    },
    {
        id: "clinical-6",
        name: "Mineral Sunscreen SPF 50",
        slug: "mineral-sunscreen-spf50",
        category: "Sun Protection",
        price: "€36",
        image: null,
    },
];

export function ClinicalProductsSection() {
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
                    {CLINICAL_PRODUCTS.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group block"
                        >
                            {/* Product Image Placeholder */}
                            <div className="aspect-[3/4] relative bg-muted/50 rounded-lg overflow-hidden mb-4
                            border border-border/50 transition-all duration-500
                            group-hover:shadow-lg group-hover:border-border
                            group-hover:scale-[1.02]">
                                {product.image ? (
                                    <img
                                        src={product.image}
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
                                        {product.category}
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
                                    {product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/products?category=clinical">
                            View Clinical Collection
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
