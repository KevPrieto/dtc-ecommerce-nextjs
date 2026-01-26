
import fs from "fs";
import path from "path";

async function checkStripe() {
    console.log("Checking Stripe configuration...");

    try {
        const envPath = path.resolve(process.cwd(), ".env.local");
        if (!fs.existsSync(envPath)) {
            console.error("❌ .env.local not found!");
            process.exit(1);
        }

        const envConfig = fs.readFileSync(envPath, "utf8");
        const envVars: Record<string, string> = {};

        envConfig.split("\n").forEach((line) => {
            const [key, value] = line.split("=");
            if (key && value) {
                envVars[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
            }
        });

        const REQUIRED_KEYS = [
            "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
            "STRIPE_SECRET_KEY",
            "STRIPE_WEBHOOK_SECRET"
        ];

        let missing = false;
        for (const key of REQUIRED_KEYS) {
            if (!envVars[key] || envVars[key].length === 0) {
                console.error(`❌ Missing or empty: ${key}`);
                missing = true;
            } else {
                console.log(`✅ Found: ${key}`);
            }
        }

        if (missing) {
            console.error("🛑 HARD STOP: Stripe configuration incomplete.");
            process.exit(1);
        } else {
            console.log("✨ Stripe configuration verified.");
        }

    } catch (e) {
        console.error("❌ Error reading .env.local", e);
        process.exit(1);
    }
}

checkStripe();
