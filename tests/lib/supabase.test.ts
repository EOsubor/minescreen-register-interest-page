/** @jest-environment node */

import { getSupabaseClient } from "@/app/lib/supabase";

describe("getSupabaseClient", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const originalMock = process.env.SUPABASE_MOCK;

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

    if (originalMock !== undefined) {
      process.env.SUPABASE_MOCK = originalMock;
    } else {
      delete process.env.SUPABASE_MOCK;
    }
  });

  test("returns a mock client when SUPABASE_MOCK is enabled", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.SUPABASE_MOCK = "1";

    const client = getSupabaseClient();
    expect(typeof client.from).toBe("function");

    const result = await client.from("registrations").insert({ email: "qa@example.com" });
    expect(result.error).toBeNull();
  });

  test("mock client surfaces insert failures and unsupported tables", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.SUPABASE_MOCK = "1";

    const client = getSupabaseClient() as unknown as {
      from: (table: string) => {
        insert: (payload: unknown) => Promise<{ error: { message: string } | null }>;
      };
    };

    const failResult = await client
      .from("registrations")
      .insert([{ email: "qa@fail.test" }, null]);
    expect(failResult.error?.message).toBe("Mock insert failure");

    const tableResult = await client.from("other_table").insert({ email: "qa@example.com" });
    expect(tableResult.error?.message).toBe("Mock table not supported");
  });

  test("throws when required env vars are missing and mock disabled", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_MOCK;

    expect(() => getSupabaseClient()).toThrow(
      "Missing required Supabase environment variables"
    );
  });

  test("returns a client when env vars exist", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";
    delete process.env.SUPABASE_MOCK;

    const client = getSupabaseClient();
    expect(typeof client.from).toBe("function");
  });
});
