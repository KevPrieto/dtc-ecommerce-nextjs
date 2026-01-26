
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Manually parse .env.local
try {
    const envConfig = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
        }
    });
} catch (e) {
    console.warn("Could not read .env.local", e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

const NEW_PRODUCTS = [
    {
        name: "Rose Petal Cleansing Milk",
        slug: "rose-petal-cleansing-milk",
        category: "cleansers", // Normalized
        description: "Gentle cleansing milk with Rosa Damascena.",
        price: 3400,
        image_url: "/products/rosepetal-cleansing-milk.png"
    },
    {
        name: "Chamomile Calming Toner",
        slug: "chamomile-calming-toner",
        category: "treatments",
        description: "Soothing toner with Chamomilla Recutita.",
        price: 2900,
        image_url: "/products/chamomile-calming-toner.png"
    },
    {
        name: "Bakuchiol Renewal Serum",
        slug: "bakuchiol-renewal-serum",
        category: "treatments",
        description: "Natural retinol alternative for renewal.",
        price: 5200,
        image_url: "/products/bakuchiol-renewal-serum.png"
    },
    {
        name: "Squalane + Rosehip Oil",
        slug: "squalane-rosehip-oil",
        category: "treatments",
        description: "Nourishing oil blend with Rosa Rubiginosa.",
        price: 4400,
        image_url: "/products/squalane-rosehip-oil.png"
    },
    {
        name: "Aloe Vera Gel Moisturizer",
        slug: "aloe-vera-gel-moisturizer",
        category: "moisturizers",
        description: "Lightweight hydration with Aloe Barbadensis.",
        price: 3600,
        image_url: "/products/aloevera-gel-moisturizer.png"
    },
    {
        name: "Green Tea Antioxidant Mist",
        slug: "green-tea-antioxidant-mist",
        category: "treatments",
        description: "Refreshing mist with Camellia Sinensis.",
        price: 2600,
        image_url: "/products/green-tea-antioxidant-mist.png"
    }
];

async function seed() {
    console.log("🌱 Seeding missing products...");
    for (const p of NEW_PRODUCTS) {
        // Check if exists
        const { data } = await supabase.from("products").select("id").eq("slug", p.slug).single();
        if (data) {
            console.log(`🔹 Skping ${p.slug} (exists)`);

            // Update image just in case
            await supabase.from("products").update({ image_url: p.image_url }).eq("id", data.id);
            continue;
        }

        // Insert
        const { data: newProd, error } = await supabase.from("products").insert({
            name: p.name,
            slug: p.slug,
            category: p.category,
            description: p.description,
            image_url: p.image_url,
            is_active: true
        }).select().single();

        if (error) {
            console.error(`❌ Failed to insert ${p.slug}:`, error.message);
        } else {
            console.log(`✅ Created ${p.slug}`);
            // Create default variant
            await supabase.from("product_variants").insert({
                product_id: newProd.id,
                name: "Standard",
                price: p.price,
                stock: 99,
                is_active: true,
                sku: `SKU-${newProd.slug.toUpperCase().slice(0, 10)}`
            });
        }
    }
}

seed();
