import { createClient } from "@/lib/supabase/server";
import type { Product, ProductVariant, ProductWithVariants } from "@/types";

/**
 * VÉRA Product Data Fetching
 *
 * Server-side functions for fetching product data from Supabase.
 * All functions return empty arrays/null gracefully when Supabase is not configured.
 */

/**
 * Fetch all active products (without variants)
 */
export async function getProducts(): Promise<Product[]> {
    const supabase = await createClient();

    if (!supabase) {
        console.warn("[Products] Supabase not configured - returning empty array");
        return [];
    }

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });

    if (error) {
        console.error("[Products] Error fetching products:", error.message);
        return [];
    }

    return data || [];
}

/**
 * Fetch all active products with their variants
 */
export async function getProductsWithVariants(): Promise<ProductWithVariants[]> {
    const supabase = await createClient();

    if (!supabase) {
        console.warn("[Products] Supabase not configured - returning empty array");
        return [];
    }

    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      variants:product_variants(*)
    `)
        .eq("is_active", true)
        .order("name", { ascending: true });

    if (error) {
        console.error("[Products] Error fetching products with variants:", error.message);
        return [];
    }

    // Filter to only include active variants
    const productsWithActiveVariants = (data || []).map((product) => ({
        ...product,
        variants: (product.variants || []).filter(
            (variant: ProductVariant) => variant.is_active
        ),
    }));

    return productsWithActiveVariants;
}

/**
 * Fetch a single product by slug (with variants)
 */
export async function getProductBySlug(
    slug: string
): Promise<ProductWithVariants | null> {
    const supabase = await createClient();

    if (!supabase) {
        console.warn("[Products] Supabase not configured - returning null");
        return null;
    }

    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      variants:product_variants(*)
    `)
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error) {
        if (error.code !== "PGRST116") {
            // PGRST116 = no rows returned (not a real error, just not found)
            console.error("[Products] Error fetching product by slug:", error.message);
        }
        return null;
    }

    if (!data) {
        return null;
    }

    // Filter to only include active variants
    return {
        ...data,
        variants: (data.variants || []).filter(
            (variant: ProductVariant) => variant.is_active
        ),
    };
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
    category: string
): Promise<ProductWithVariants[]> {
    const supabase = await createClient();

    if (!supabase) {
        console.warn("[Products] Supabase not configured - returning empty array");
        return [];
    }

    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      variants:product_variants(*)
    `)
        .eq("category", category)
        .eq("is_active", true)
        .order("name", { ascending: true });

    if (error) {
        console.error("[Products] Error fetching products by category:", error.message);
        return [];
    }

    // Filter to only include active variants
    return (data || []).map((product) => ({
        ...product,
        variants: (product.variants || []).filter(
            (variant: ProductVariant) => variant.is_active
        ),
    }));
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
    const supabase = await createClient();

    if (!supabase) {
        console.warn("[Products] Supabase not configured - returning empty array");
        return [];
    }

    const { data, error } = await supabase
        .from("products")
        .select("category")
        .eq("is_active", true);

    if (error) {
        console.error("[Products] Error fetching categories:", error.message);
        return [];
    }

    // Get unique categories
    const categories = [...new Set((data || []).map((p) => p.category))];
    return categories.sort();
}

/**
 * Utility: Format price in cents to display string
 */
export function formatPrice(priceInCents: number): string {
    return new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR",
    }).format(priceInCents / 100);
}

/**
 * Utility: Get the lowest price variant for a product
 */
export function getLowestPrice(variants: ProductVariant[]): number | null {
    if (!variants || variants.length === 0) return null;
    return Math.min(...variants.map((v) => v.price));
}

/**
 * Utility: Get price range string for a product
 */
export function getPriceRange(variants: ProductVariant[]): string {
    if (!variants || variants.length === 0) return "Price unavailable";

    const prices = variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    if (min === max) {
        return formatPrice(min);
    }

    return `${formatPrice(min)} – ${formatPrice(max)}`;
}
