/** @jest-environment node */

import { randomUUID } from "node:crypto";
import { registerInterest } from "@/app/lib/actions";
import { getSupabaseClient } from "@/app/lib/supabase";

const buildFormData = (overrides: Partial<Record<string, string | string[]>> = {}) => {
  const data: Record<string, string | string[]> = {
    full_name: "Test User",
    email: `test-${randomUUID()}@example.com`,
    company: "Test Co",
    role_title: "Analyst",
    interest_areas: ["Portfolio Due Diligence"],
    other_interest: "Pilot integration",
    message: "Looking forward to the demo.",
    ...overrides,
  };

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => formData.append(key, entry));
    } else {
      formData.set(key, value);
    }
  });

  return formData;
};

describe("registerInterest", () => {
  const supabase = getSupabaseClient();
  const emailsToClean: string[] = [];
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  afterEach(async () => {
    while (emailsToClean.length) {
      const email = emailsToClean.pop();
      if (!email) continue;
      await supabase.from("registrations").delete().eq("email", email);
    }

    if (originalKey !== undefined) {
      process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    } else {
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    }
  });

  test("returns success immediately when honeypot is filled", async () => {
    const formData = buildFormData({ website: "bot-field" });

    const result = await registerInterest({ success: false, message: "" }, formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Thank you for registering!");
  });

  test("returns validation errors for invalid data", async () => {
    const formData = new FormData();
    formData.set("full_name", "A");
    formData.set("email", "invalid-email");
    formData.set("company", "");
    formData.set("role_title", "");
    formData.append("interest_areas", new Blob(["bad-1"]));
    formData.append("interest_areas", new Blob(["bad-2"]));
    formData.set("other_interest", "");
    formData.set("message", "");

    const result = await registerInterest({ success: false, message: "" }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Please fix the errors below.");
    expect(result.errors).toBeDefined();
    expect(result.errors?.full_name?.length).toBeGreaterThan(0);
    expect(result.errors?.email?.length).toBeGreaterThan(0);
    expect(result.errors?.interest_areas?.length).toBeGreaterThan(0);
  });

  test("inserts into Supabase when data is valid", async () => {
    const email = `test-${randomUUID()}@example.com`;
    const formData = buildFormData({
      email,
      company: "",
      role_title: "",
      other_interest: "",
      message: "",
    });

    const result = await registerInterest({ success: false, message: "" }, formData);

    expect(result.success).toBe(true);
    expect(result.message).toMatch(/Thank you for registering!/);

    emailsToClean.push(email);
  });

  test("returns a friendly error when Supabase insert fails", async () => {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for this test.");
    }

    process.env.SUPABASE_SERVICE_ROLE_KEY = "invalid-key";
    const formData = buildFormData();

    const result = await registerInterest({ success: false, message: "" }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Something went wrong. Please try again.");
  });
});
