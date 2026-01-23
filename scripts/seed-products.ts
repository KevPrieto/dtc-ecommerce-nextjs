/**
 * CALM FORM Product Seed Data
 *
 * This script populates the database with:
 * - 8 individual skincare products
 * - 2 routine bundles (AM / PM)
 *
 * Brand tone: Minimal, clinical, premium
 * Copy style: Benefit-focused, no hype
 */

import { createClient } from "@/lib/supabase/server";

// ============================================================================
// PRODUCT SEED DATA STRUCTURE
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
    price: number; // in cents (e.g., 2800 = €28.00)
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
    description: "pH-balanced gel cleanser that removes impurities without disrupting skin barrier. Suitable for daily use, all skin types.",
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
    description: "Lightweight hydrating layer that optimizes absorption of active ingredients. Prepares skin and restores balance.",
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
    name: "Hydrating Serum",
    slug: "hydrating-serum",
    description: "Multi-weight hyaluronic acid complex that delivers deep hydration across skin layers. Visibly plumps and smooths.",
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
    name: "Brightening Serum",
    slug: "brightening-serum",
    description: "Stabilized vitamin C formulation that targets uneven tone and dullness. Clinically proven to improve radiance.",
    image_url: null,
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "SER-BRT-30",
        price: 4800, // €48.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml",
        sku: "SER-BRT-50",
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
    description: "Barrier-supporting moisturizer formulated for individual skin types. Non-greasy texture, clinically tested for 24-hour hydration.",
    image_url: null,
    category: "moisturizers",
    is_active: true,
    variants: [
      {
        name: "50ml - Normal Skin",
        sku: "MOI-DAY-50-NRM",
        price: 3800, // €38.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml - Dry Skin",
        sku: "MOI-DAY-50-DRY",
        price: 3800, // €38.00
        stock: 50,
        is_active: true,
      },
      {
        name: "50ml - Oily Skin",
        sku: "MOI-DAY-50-OIL",
        price: 3800, // €38.00
        stock: 50,
        is_active: true,
      },
    ],
  },

  // 6. EYE CREAM
  {
    name: "Revitalizing Eye Cream",
    slug: "revitalizing-eye-cream",
    description: "Targeted eye treatment addressing fine lines, puffiness, and dark circles. Ophthalmologist-tested formula for delicate skin.",
    image_url: null,
    category: "moisturizers",
    is_active: true,
    variants: [
      {
        name: "15ml",
        sku: "EYE-REV-15",
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
    description: "Broad-spectrum mineral sunscreen with zinc oxide and titanium dioxide. Invisible finish, suitable for daily use.",
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
    name: "Nourishing Face Oil",
    slug: "nourishing-face-oil",
    description: "Botanical oil blend that strengthens skin barrier and locks in moisture. Use as final step in evening routine.",
    image_url: null,
    category: "treatments",
    is_active: true,
    variants: [
      {
        name: "30ml",
        sku: "OIL-NOU-30",
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
    name: "Morning Routine",
    slug: "am-routine-bundle",
    description: "Complete morning regimen: Gentle Cleansing Gel, Brightening Serum, Daily Moisturizer, and Mineral Sunscreen SPF 50.",
    image_url: null,
    category: "bundles",
    is_active: true,
    variants: [
      {
        name: "Complete Set",
        sku: "BUN-AM-SET",
        price: 12800, // €128.00 (15% bundle discount)
        stock: 30,
        is_active: true,
      },
    ],
  },

  // 10. PM ROUTINE BUNDLE
  {
    name: "Evening Routine",
    slug: "pm-routine-bundle",
    description: "Complete evening regimen: Gentle Cleansing Gel, Hydrating Essence, Hydrating Serum, and Nourishing Face Oil.",
    image_url: null,
    category: "bundles",
    is_active: true,
    variants: [
      {
        name: "Complete Set",
        sku: "BUN-PM-SET",
        price: 13200, // €132.00 (15% bundle discount)
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
