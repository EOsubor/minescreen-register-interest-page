"use server";

import { getSupabaseClient } from "./supabase";
import { registrationSchema, type FormState } from "./schema";

export async function registerInterest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot check
  const honeypot = formData.get("website");
  if (honeypot) {
    return { success: true, message: "Thank you for registering!" };
  }

  const raw = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    role_title: formData.get("role_title") as string,
    interest_areas: formData.getAll("interest_areas") as string[],
    other_interest: formData.get("other_interest") as string,
    message: formData.get("message") as string,
  };

  const result = registrationSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (!errors[key]) errors[key] = [];
      errors[key].push(issue.message);
    }
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  const supabase = getSupabaseClient();

  const { error } = await supabase.from("registrations").insert({
    full_name: result.data.full_name,
    email: result.data.email,
    company: result.data.company || null,
    role_title: result.data.role_title || null,
    interest_areas: result.data.interest_areas,
    other_interest: result.data.other_interest || null,
    message: result.data.message || null,
  });

  if (error) {
    if (process.env.SUPABASE_MOCK !== "1") {
      console.error("Supabase insert error:", error);
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    success: true,
    message:
      "Thank you for registering! We'll keep you updated on demos and the MVP.",
  };
}
