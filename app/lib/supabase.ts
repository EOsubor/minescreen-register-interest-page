import { createClient } from "@supabase/supabase-js";

type MockInsertResult = { error: { message: string } | null };

type MockSupabaseClient = {
  from: (table: string) => {
    insert: (payload: unknown) => Promise<MockInsertResult>;
    delete: () => {
      eq: (_field: string, _value: string) => Promise<{ error: null }>;
    };
  };
};

function createMockSupabaseClient(): MockSupabaseClient {
  return {
    from: (table: string) => ({
      insert: async (payload: unknown) => {
        if (table !== "registrations") {
          return { error: { message: "Mock table not supported" } };
        }

        const rows = Array.isArray(payload) ? payload : [payload];
        const shouldFail = rows.some((row) => {
          if (!row || typeof row !== "object") return false;
          const email = (row as { email?: unknown }).email;
          return typeof email === "string" && email.endsWith("@fail.test");
        });

        if (shouldFail) {
          return { error: { message: "Mock insert failure" } };
        }

        return { error: null };
      },
      delete: () => ({
        eq: async () => ({ error: null }),
      }),
    }),
  };
}

export function getSupabaseClient() {
  if (process.env.SUPABASE_MOCK === "1") {
    return createMockSupabaseClient();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing required Supabase environment variables");
  }

  return createClient(url, key);
}
