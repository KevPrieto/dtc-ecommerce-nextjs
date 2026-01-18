import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase server client with cookie handling.
 *
 * TODO: REQUIRES CONFIGURATION
 * - Set NEXT_PUBLIC_SUPABASE_URL in .env.local
 * - Set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 *
 * SAFE MODE: Returns null if env vars are missing (prevents runtime crashes)
 * This allows the app to render in a degraded state until Supabase is configured.
 */
export async function createClient() {
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

  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
