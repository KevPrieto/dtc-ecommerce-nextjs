import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Creates a Supabase server client with cookie handling.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * environment variables to be configured in .env.local
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[Supabase] Missing environment variables. " +
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
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

/**
 * Creates a Supabase service role client that bypasses RLS.
 * Use ONLY for server-side operations that require elevated permissions.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * environment variables to be configured in .env.local
 *
 * @throws Error if environment variables are missing or invalid
 */
export function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  // Check for missing variables
  if (!supabaseUrl || !supabaseServiceKey) {
    const missingVars = [];
    if (!supabaseUrl) missingVars.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!supabaseServiceKey) missingVars.push("SUPABASE_SERVICE_ROLE_KEY");

    throw new Error(
      `[Supabase Service Role] Missing required environment variables: ${missingVars.join(", ")}. ` +
      `Configure these in .env.local`
    );
  }

  // Validate URL format
  if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
    throw new Error(
      `[Supabase Service Role] Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". ` +
      `URL must start with https:// (e.g., https://your-project.supabase.co)`
    );
  }

  try {
    return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    throw new Error(
      `[Supabase Service Role] Failed to create client. Check that your URL and service role key are correct. ` +
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
