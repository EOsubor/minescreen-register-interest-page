/** @jest-environment node */

import { getSupabaseClient } from "@/app/lib/supabase";

describe("getSupabaseClient", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  afterEach(() => {
    if (originalUrl !== undefined) {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    } else {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    }

    if (originalKey !== undefined) {
      process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    } else {
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    }
  });

  test("throws when required env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(() => getSupabaseClient()).toThrow(
      "Missing required Supabase environment variables"
    );
  });

  test("returns a client when env vars exist", () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase environment variables are required for this test.");
    }

    const client = getSupabaseClient();
    expect(typeof client.from).toBe("function");
  });
});
