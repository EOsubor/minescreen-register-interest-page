import { INTEREST_AREAS, registrationSchema } from "@/app/lib/schema";

describe("registrationSchema", () => {
  test("accepts valid data", () => {
    const result = registrationSchema.safeParse({
      full_name: "Jane Smith",
      email: "jane@example.com",
      company: "Acme Mining",
      role_title: "Analyst",
      interest_areas: [INTEREST_AREAS[0]],
      other_interest: "",
      message: "Looking forward to it.",
    });

    expect(result.success).toBe(true);
  });

  test("rejects invalid data", () => {
    const result = registrationSchema.safeParse({
      full_name: "A",
      email: "not-an-email",
      company: "",
      role_title: "",
      interest_areas: [],
      other_interest: "",
      message: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toEqual(
        expect.arrayContaining([
          "Name must be at least 2 characters",
          "Please enter a valid email address",
          "Please select at least one area of interest",
        ])
      );
    }
  });
});
