import { z } from "zod";

export const INTEREST_AREAS = [
  "Portfolio Due Diligence",
  "Technical Report Analysis",
  "Investment Screening",
  "Risk Assessment",
  "Regulatory Compliance",
  "Other",
] as const;

export const registrationSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(200).optional().or(z.literal("")),
  role_title: z.string().max(200).optional().or(z.literal("")),
  interest_areas: z
    .array(z.string())
    .min(1, "Please select at least one area of interest"),
  other_interest: z.string().max(500).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
