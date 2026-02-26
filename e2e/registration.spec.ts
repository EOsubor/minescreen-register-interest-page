import { test, expect, type Page } from "@playwright/test";

const isLive =
  process.env.PLAYWRIGHT_LIVE === "1" || Boolean(process.env.PLAYWRIGHT_BASE_URL);
const failureTest = isLive ? test.skip : test;

function uniqueEmail(prefix: string, domain = "example.com") {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${stamp}-${rand}@${domain}`;
}

async function fillRequiredFields(
  page: Page,
  {
    fullName,
    email,
    interest,
  }: { fullName: string; email: string; interest: string }
) {
  await page.getByLabel("Full Name").fill(fullName);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel(interest).check();
}

test.describe("Registration flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#register");
    await expect(page.getByRole("heading", { name: /register your interest/i })).toBeVisible();
  });

  test("submits successfully", async ({ page }) => {
    const email = uniqueEmail("qa");
    await fillRequiredFields(page, {
      fullName: "QA Tester",
      email,
      interest: "Portfolio Due Diligence",
    });

    await page.getByRole("button", { name: /^register$/i }).click();

    await expect(page.getByRole("heading", { name: /you're registered/i })).toBeVisible();
    await expect(
      page.getByText(/we'll keep you updated on demos and the mvp/i)
    ).toBeVisible();
  });

  test("shows validation errors", async ({ page }) => {
    await page.getByLabel("Full Name").fill("A");
    await page.getByLabel("Email").fill("valid@example.com");

    await page.getByRole("button", { name: /^register$/i }).click();

    await expect(page.getByText("Please fix the errors below.")).toBeVisible();
    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
    await expect(
      page.getByText("Please select at least one area of interest")
    ).toBeVisible();
  });

  failureTest("shows failure state when Supabase insert fails", async ({ page }) => {
    const email = uniqueEmail("qa", "fail.test");
    await fillRequiredFields(page, {
      fullName: "QA Tester",
      email,
      interest: "Portfolio Due Diligence",
    });

    await page.getByRole("button", { name: /^register$/i }).click();

    await expect(
      page.getByText("Something went wrong. Please try again.")
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /register your interest/i })
    ).toBeVisible();
  });
});
