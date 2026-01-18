import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase browser client.
 *
 * TODO: REQUIRES CONFIGURATION
 * - Set NEXT_PUBLIC_SUPABASE_URL in .env.local
 * - Set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 *
 * SAFE MODE: Returns null if env vars are missing (prevents runtime crashes)
 * This allows the app to render in a degraded state until Supabase is configured.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // TODO: Configure Supabase environment variables
  // Safe mode: Return null if not configured
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[Supabase] Missing environment variables. App running in degraded mode. " +
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
