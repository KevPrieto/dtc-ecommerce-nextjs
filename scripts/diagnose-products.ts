
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

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
    console.log("🔍 Diagnosing Products...");
    const { data: products, error } = await supabase
        .from("products")
        .select("id, name, slug, category, image_url");

    if (error) {
        console.error("❌ Error fetching products:", error);
        return;
    }

    // Write to file
    fs.writeFileSync("products-dump.json", JSON.stringify(products, null, 2));
    console.log("✅ Wrote products to products-dump.json");

    // Check for issues
    const missingSlugs = products.filter(p => !p.slug);
    const badSlugs = products.filter(p => p.slug && p.slug.includes(" "));

    if (missingSlugs.length > 0) {
        console.error(`❌ Found ${missingSlugs.length} products with missing slugs!`);
    }
    if (badSlugs.length > 0) {
        console.error(`❌ Found ${badSlugs.length} products with invalid slugs (spaces)!`);
    }

    if (missingSlugs.length === 0 && badSlugs.length === 0) {
        console.log("✅ All product slugs appear valid (no empty or spaces).");
    }
}

diagnose();
