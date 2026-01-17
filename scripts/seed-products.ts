/**
 * CALM FORM Product Seed Data
 *
 * This script populates the database with:
 * - 8 individual skincare products
 * - 2 routine bundles (AM / PM)
 *
 * IMPORTANT: This file contains PLACEHOLDER data.
 * Final product names, descriptions, and prices need approval.
 */

import { createClient } from "@/lib/supabase/server";

// ============================================================================
// PLACEHOLDER DATA - TO BE FINALIZED
// ============================================================================

type ProductSeed = {
  name: string; // PLACEHOLDER
  slug: string;
  description: string; // PLACEHOLDER
  image_url: string; // PLACEHOLDER - use placeholder image service or null
  category: string;
  is_active: boolean;
  variants: Array<{
    name: string;
    sku: string;
    price: number; // PLACEHOLDER - in cents
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
    name: "[PLACEHOLDER] Gentle Cleansing Gel",
    slug: "gentle-cleansing-gel",
    description: "[PLACEHOLDER] A gentle, pH-balanced cleanser that removes impurities without stripping skin. Suitable for daily use.",
    image_url: null, // PLACEHOLDER
    category: "cleansers",
    is_active: true,
    variants: [
      {
        name: "100ml",
        sku: "CLN-GEL-100",
        price: 2800, // PLACEHOLDER - €28.00
        stock: 50,
        is_active: true,
      },
      {
        name: "200ml",
        sku: "CLN-GEL-200",
        price: 4200, // PLACEHOLDER - €42.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 2. TONER/ESSENCE
  {
    name: "[PLACEHOLDER] Hydrating Essence",
    slug: "hydrating-essence",
    description: "[PLACEHOLDER] A lightweight essence that preps skin for better absorption of active ingredients. Hydrates and balances.",
    image_url: null, // PLACEHOLDER
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "100ml",
        sku: "ESS-HYD-100",
        price: 3200, // PLACEHOLDER - €32.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 3. SERUM - HYDRATING
  {
    name: "[PLACEHOLDER] Hydrating Serum",
    slug: "hydrating-serum",
    description: "[PLACEHOLDER] A concentrated serum with hyaluronic acid. Deeply hydrates and plumps skin.",
    image_url: null, // PLACEHOLDER
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "SER-HYD-30",
        price: 4500, // PLACEHOLDER - €45.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml",
        sku: "SER-HYD-50",
        price: 6800, // PLACEHOLDER - €68.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 4. SERUM - BRIGHTENING
  {
    name: "[PLACEHOLDER] Brightening Serum",
    slug: "brightening-serum",
    description: "[PLACEHOLDER] A vitamin C serum that targets dark spots and uneven tone. Reveals brighter, more radiant skin.",
    image_url: null, // PLACEHOLDER
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "SER-BRT-30",
        price: 4800, // PLACEHOLDER - €48.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml",
        sku: "SER-BRT-50",
        price: 7200, // PLACEHOLDER - €72.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 5. MOISTURIZER
  {
    name: "[PLACEHOLDER] Daily Moisturizer",
    slug: "daily-moisturizer",
    description: "[PLACEHOLDER] A lightweight, non-greasy moisturizer suitable for all skin types. Locks in hydration throughout the day.",
    image_url: null, // PLACEHOLDER
    category: "moisturizers",
    is_active: true,
    variants: [
      {
        name: "50ml - Normal Skin",
        sku: "MOI-DAY-50-NRM",
        price: 3800, // PLACEHOLDER - €38.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml - Dry Skin",
        sku: "MOI-DAY-50-DRY",
        price: 3800, // PLACEHOLDER - €38.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml - Oily Skin",
        sku: "MOI-DAY-50-OIL",
        price: 3800, // PLACEHOLDER - €38.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 6. EYE CREAM
  {
    name: "[PLACEHOLDER] Revitalizing Eye Cream",
    slug: "revitalizing-eye-cream",
    description: "[PLACEHOLDER] A rich eye cream that targets fine lines, puffiness, and dark circles. Gentle formula for delicate eye area.",
    image_url: null, // PLACEHOLDER
    category: "moisturizers",
    is_active: true,
    variants: [
      {
        name: "15ml",
        sku: "EYE-REV-15",
        price: 4200, // PLACEHOLDER - €42.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 7. SUNSCREEN
  {
    name: "[PLACEHOLDER] Mineral Sunscreen SPF 50",
    slug: "mineral-sunscreen-spf50",
    description: "[PLACEHOLDER] A broad-spectrum mineral sunscreen with SPF 50. Lightweight, non-white-cast formula suitable for daily use.",
    image_url: null, // PLACEHOLDER
    category: "sun-protection",
    is_active: true,
    variants: [
      {
        name: "50ml",
        sku: "SUN-MIN-50",
        price: 3600, // PLACEHOLDER - €36.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 8. FACE OIL
  {
    name: "[PLACEHOLDER] Nourishing Face Oil",
    slug: "nourishing-face-oil",
    description: "[PLACEHOLDER] A blend of botanical oils that nourish and restore skin barrier. Use as last step in PM routine.",
    image_url: null, // PLACEHOLDER
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "OIL-NOU-30",
        price: 4600, // PLACEHOLDER - €46.00
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
    name: "[PLACEHOLDER] AM Routine Bundle",
    slug: "am-routine-bundle",
    description: "[PLACEHOLDER] Complete morning skincare routine. Includes: Cleanser, Brightening Serum, Daily Moisturizer, and Mineral Sunscreen.",
    image_url: null, // PLACEHOLDER
    category: "bundles",
    is_active: true,
    variants: [
      {
        name: "Complete Set",
        sku: "BUN-AM-SET",
        price: 12800, // PLACEHOLDER - €128.00 (vs €150.20 individual)
        stock: 30,
        is_active: true,
      },
    ],
  },

  // 10. PM ROUTINE BUNDLE
  {
    name: "[PLACEHOLDER] PM Routine Bundle",
    slug: "pm-routine-bundle",
    description: "[PLACEHOLDER] Complete evening skincare routine. Includes: Cleanser, Hydrating Essence, Hydrating Serum, and Nourishing Face Oil.",
    image_url: null, // PLACEHOLDER
    category: "bundles",
    is_active: true,
    variants: [
      {
        name: "Complete Set",
        sku: "BUN-PM-SET",
        price: 13200, // PLACEHOLDER - €132.00 (vs €154.00 individual)
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

  console.log("🌱 Starting product seed...");
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

  console.log("✨ Product seed complete!");
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
