import { cache } from "react";
import { createAnonClient } from "@/lib/supabase/server";
import { ProductWithVariants } from "@/types";

/**
 * Get a Supabase client that works in both request and build contexts.
 * Uses anon key (respects RLS) and doesn't require cookies.
 */
function getSupabase() {
  return createAnonClient();
}

/**
 * Fetch all active products (optionally filtered by category).
 */
export const getProducts = cache(async (
  category?: string
): Promise<ProductWithVariants[]> => {
  const supabase = getSupabase();

  let query = supabase
    .from("products")
    .select(`*, variants:product_variants(*)`)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Products] Error fetching products:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as ProductWithVariants[]) || [];
});

/**
 * Fetch a single product by slug.
 * Uses maybeSingle() to avoid false 404s when row is missing or filtered by RLS.
 */
export const getProductBySlug = cache(async (
  slug: string
): Promise<ProductWithVariants | null> => {
  const supabase = getSupabase();

  const normalizedSlug = decodeURIComponent(slug).trim();

  const { data, error } = await supabase
    .from("products")
    .select(`*, variants:product_variants(*)`)
    .eq("slug", normalizedSlug)
    .eq("is_active", true)
    .maybeSingle(); // 🔒 critical fix

  if (error) {
    console.error("[Product] Error fetching product by slug:", {
      slug: normalizedSlug,
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return null;
  }

  if (!data) {
    console.warn("[Product] Product not found:", {
      slug: normalizedSlug,
    });
    return null;
  }

  // Defensive: product exists but variants may be blocked by RLS or missing seed
  if (!Array.isArray((data as any).variants)) {
    console.warn("[Product] Variants missing or blocked by RLS:", {
      slug: normalizedSlug,
      productId: (data as any).id,
    });
  }

  return data as ProductWithVariants;
});

/**
 * Fetch featured products (non-bundles).
 */
export const getFeaturedProducts = cache(async (
  limit = 4
): Promise<ProductWithVariants[]> => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("products")
    .select(`*, variants:product_variants(*)`)
    .eq("is_active", true)
    .neq("category", "bundles")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Products] Error fetching featured products:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as ProductWithVariants[]) || [];
});

/**
 * Fetch unique product categories.
 */
export const getCategories = cache(async (): Promise<string[]> => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true);

  if (error) {
    console.error("[Products] Error fetching categories:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  const categories = [...new Set(data?.map((p) => p.category) || [])];
  return categories;
});

/**
 * Fetch product slugs for generateStaticParams (build-time).
 * IMPORTANT: Must not throw or use single().
 */
export async function getProductSlugsForBuild(): Promise<{ slug: string }[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);

  if (error) {
    console.error("[Products] Error fetching slugs for build:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data || [])
    .filter((p) => typeof p.slug === "string" && p.slug.length > 0)
    .map((p) => ({ slug: p.slug }));
}
