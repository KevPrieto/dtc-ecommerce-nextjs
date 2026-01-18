/**
 * VÉRA Product Seed Data
 *
 * This script populates the database with:
 * - 8 individual skincare products
 * - 2 routine bundles (AM / PM)
 *
 * Brand: VÉRA - Premium clean skincare
 * Tone: Clinical, minimal, benefit-focused
 */

import { createClient } from "@/lib/supabase/server";

// ============================================================================
// PRODUCT DATA - FINALIZED
// ============================================================================

type ProductSeed = {
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  category: string;
  is_active: boolean;
  variants: Array<{
    name: string;
    sku: string;
    price: number; // in cents (EUR)
    stock: number;
    is_active: boolean;
  }>;
};

const PRODUCT_SEEDS: ProductSeed[] = [
  // ========================================================================
  // INDIVIDUAL PRODUCTS (8)
  // ========================================================================

  // 1. CLEANSER
  {
    name: "Gentle Cleansing Gel",
    slug: "gentle-cleansing-gel",
    description: "A pH-balanced gel cleanser that removes impurities without disrupting the skin barrier. Suitable for daily AM/PM use.",
    image_url: null,
    category: "cleansers",
    is_active: true,
    variants: [
      {
        name: "100ml",
        sku: "CLN-GEL-100",
        price: 2800, // €28.00
        stock: 50,
        is_active: true,
      },
      {
        name: "200ml",
        sku: "CLN-GEL-200",
        price: 4200, // €42.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 2. TONER/ESSENCE
  {
    name: "Hydrating Essence",
    slug: "hydrating-essence",
    description: "A lightweight liquid treatment that prepares skin for subsequent steps. Enhances absorption and balances hydration levels.",
    image_url: null,
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "100ml",
        sku: "ESS-HYD-100",
        price: 3200, // €32.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 3. SERUM - HYDRATING
  {
    name: "Hyaluronic Serum",
    slug: "hyaluronic-serum",
    description: "A concentrated serum with multi-weight hyaluronic acid. Delivers deep hydration and supports skin plumpness.",
    image_url: null,
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "SER-HYD-30",
        price: 4500, // €45.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml",
        sku: "SER-HYD-50",
        price: 6800, // €68.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 4. SERUM - BRIGHTENING
  {
    name: "Vitamin C Serum",
    slug: "vitamin-c-serum",
    description: "A stabilized vitamin C formula that targets uneven tone and dullness. Supports a brighter, more even complexion.",
    image_url: null,
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "SER-VTC-30",
        price: 4800, // €48.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml",
        sku: "SER-VTC-50",
        price: 7200, // €72.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 5. MOISTURIZER
  {
    name: "Daily Moisturizer",
    slug: "daily-moisturizer",
    description: "A lightweight, non-comedogenic moisturizer that locks in hydration. Available in formulations optimized for different skin types.",
    image_url: null,
    category: "moisturizers",
    is_active: true,
    variants: [
      {
        name: "50ml — Normal Skin",
        sku: "MOI-DAY-50-NRM",
        price: 3800, // €38.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml — Dry Skin",
        sku: "MOI-DAY-50-DRY",
        price: 3800, // €38.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml — Oily Skin",
        sku: "MOI-DAY-50-OIL",
        price: 3800, // €38.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 6. EYE CREAM
  {
    name: "Eye Repair Cream",
    slug: "eye-repair-cream",
    description: "A targeted treatment for the delicate eye area. Addresses fine lines, puffiness, and dark circles with peptide-rich formula.",
    image_url: null,
    category: "moisturizers",
    is_active: true,
    variants: [
      {
        name: "15ml",
        sku: "EYE-REP-15",
        price: 4200, // €42.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 7. SUNSCREEN
  {
    name: "Mineral Sunscreen SPF 50",
    slug: "mineral-sunscreen-spf50",
    description: "Broad-spectrum mineral protection with zinc oxide. Lightweight, non-whitening formula suitable for daily wear under makeup.",
    image_url: null,
    category: "sun-protection",
    is_active: true,
    variants: [
      {
        name: "50ml",
        sku: "SUN-MIN-50",
        price: 3600, // €36.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 8. FACE OIL
  {
    name: "Barrier Repair Oil",
    slug: "barrier-repair-oil",
    description: "A botanical oil blend that restores and strengthens the skin barrier. Best used as the final step in evening routines.",
    image_url: null,
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "OIL-BAR-30",
        price: 4600, // €46.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // ========================================================================
  // BUNDLES (2)
  // ========================================================================

  // 9. AM ROUTINE BUNDLE
  {
    name: "AM Routine Set",
    slug: "am-routine-set",
    description: "Complete morning routine for protection and radiance. Includes: Gentle Cleansing Gel, Vitamin C Serum, Daily Moisturizer, and Mineral Sunscreen SPF 50.",
    image_url: null,
    category: "bundles",
    is_active: true,
    variants: [
      {
        name: "Complete Set",
        sku: "BUN-AM-SET",
        price: 12800, // €128.00 (~15% off €150.00 individual)
        stock: 30,
        is_active: true,
      },
    ],
  },

  // 10. PM ROUTINE BUNDLE
  {
    name: "PM Routine Set",
    slug: "pm-routine-set",
    description: "Complete evening routine for repair and nourishment. Includes: Gentle Cleansing Gel, Hydrating Essence, Hyaluronic Serum, and Barrier Repair Oil.",
    image_url: null,
    category: "bundles",
    is_active: true,
    variants: [
      {
        name: "Complete Set",
        sku: "BUN-PM-SET",
        price: 13200, // €132.00 (~15% off €155.00 individual)
        stock: 30,
        is_active: true,
      },
    ],
  },
];

// ============================================================================
// SEED FUNCTION
// ============================================================================

export async function seedProducts() {
  const supabase = await createClient();

  if (!supabase) {
    console.error(
      "❌ Cannot seed products: Supabase not configured.\n" +
      "   Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
    return;
  }

  console.log("🌱 Starting VÉRA product seed...");
  console.log(`📦 Seeding ${PRODUCT_SEEDS.length} products...`);

  for (const productSeed of PRODUCT_SEEDS) {
    try {
      // Insert product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: productSeed.name,
          slug: productSeed.slug,
          description: productSeed.description,
          image_url: productSeed.image_url,
          category: productSeed.category,
          is_active: productSeed.is_active,
        })
        .select()
        .single();

      if (productError) {
        console.error(`❌ Failed to insert product: ${productSeed.name}`, productError);
        continue;
      }

      console.log(`✅ Created product: ${product.name}`);

      // Insert variants
      for (const variantSeed of productSeed.variants) {
        const { error: variantError } = await supabase
          .from("product_variants")
          .insert({
            product_id: product.id,
            name: variantSeed.name,
            sku: variantSeed.sku,
            price: variantSeed.price,
            stock: variantSeed.stock,
            is_active: variantSeed.is_active,
          });

        if (variantError) {
          console.error(
            `❌ Failed to insert variant: ${variantSeed.name}`,
            variantError
          );
          continue;
        }

        console.log(`  ↳ Created variant: ${variantSeed.name} (${variantSeed.sku})`);
      }
    } catch (error) {
      console.error(`❌ Unexpected error seeding product: ${productSeed.name}`, error);
    }
  }

  console.log("✨ VÉRA product seed complete!");
}

// ============================================================================
// RUN SEED (if executed directly)
// ============================================================================

if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log("✅ Seed completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seed failed:", error);
      process.exit(1);
    });
}
