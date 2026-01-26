
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Manually parse .env.local
try {
    const envConfig = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, ""); // Remove quotes if any
        }
    });
} catch (e) {
    console.warn("Could not read .env.local", e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Usually seed scripts use service role. Let's check .env.local via process.env if available, or just try.
// Given strict instructions "Supabase env vars configured", I will assume standard ones.
// However, RLS might block updates. I should check if there's a SERVICE_ROLE key typically used.
// But I can't see .env.local content for security. I'll check if seed-products.ts used anything special.
// It used "@/lib/supabase/server" which uses cookies/headers context usually, or process.env.
// For a script running in Node, we need a direct client.

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey);

const MAPPING = [
    { slug: "gentle-cleansing-gel", image: "/products/gentle-cleansing-gel.png" },
    { slug: "hydrating-essence", image: "/products/hydrating-essence.png" },
    { slug: "hyaluronic-serum", image: "/products/hyaluronic-serum.png" },
    { slug: "vitamin-c-serum", image: "/products/vitamin-c-serum.png" },
    { slug: "barrier-repair-oil", image: "/products/barrier-repair-oil.png" },
];

async function updateImages() {
    console.log("Updating product images...");

    for (const item of MAPPING) {
        const { error } = await supabase
            .from("products")
            .update({ image_url: item.image })
            .eq("slug", item.slug);

        if (error) {
            console.error(`Failed to update ${item.slug}:`, error.message);
        } else {
            console.log(`Updated ${item.slug} -> ${item.image}`);
        }
    }
}

updateImages();
