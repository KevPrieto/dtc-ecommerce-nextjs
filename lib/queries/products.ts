import { createClient } from "@/lib/supabase/server";
import { ProductWithVariants } from "@/types";

export async function getProducts(
  category?: string
): Promise<ProductWithVariants[]> {
  const supabase = await createClient();

  if (!supabase) {
    console.warn("[Products] Supabase not configured - returning empty array");
    return [];
  }

  let query = supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*)
    `
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Products] Error fetching products:", error.message);
    return [];
  }
  return (data as ProductWithVariants[]) || [];
}

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
    .select(
      `
      *,
      variants:product_variants(*)
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as ProductWithVariants;
}

export async function getFeaturedProducts(
  limit = 4
): Promise<ProductWithVariants[]> {
  const supabase = await createClient();

  if (!supabase) {
    console.warn("[Products] Supabase not configured - returning empty array");
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*)
    `
    )
    .eq("is_active", true)
    .neq("category", "bundles")
    .limit(limit);

  if (error) {
    console.error("[Products] Error fetching featured products:", error.message);
    return [];
  }
  return (data as ProductWithVariants[]) || [];
}

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

  const categories = [...new Set(data?.map((p) => p.category) || [])];
  return categories;
}
