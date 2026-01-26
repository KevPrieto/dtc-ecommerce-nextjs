
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

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

async function updateSunscreen() {
    console.log("Updating Mineral Sunscreen image...");
    const { error } = await supabase
        .from("products")
        .update({ image_url: "/products/mineral-sunscreen-spf50.png" })
        .eq("slug", "mineral-sunscreen-spf50");

    if (error) {
        console.error("❌ Failed:", error.message);
    } else {
        console.log("✅ Updated sunscreen image in DB");
    }
}

updateSunscreen();
