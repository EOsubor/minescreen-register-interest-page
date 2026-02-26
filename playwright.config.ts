import { defineConfig, devices } from "@playwright/test";

if (process.env.NO_COLOR) {
  delete process.env.NO_COLOR;
}

const port = process.env.PLAYWRIGHT_PORT
  ? Number(process.env.PLAYWRIGHT_PORT)
  : process.env.PORT
  ? Number(process.env.PORT)
  : 3100;
const reuseExistingServer = process.env.PLAYWRIGHT_REUSE === "1";
const isRemote = Boolean(process.env.PLAYWRIGHT_BASE_URL);
const isLive = process.env.PLAYWRIGHT_LIVE === "1";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  workers: isLive ? 1 : undefined,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: reuseExistingServer || isRemote
    ? undefined
    : {
        command: `npm run dev -- --hostname 127.0.0.1 --port ${port}`,
        port,
        reuseExistingServer,
        env: {
          ...process.env,
          ...(isLive ? {} : { SUPABASE_MOCK: "1" }),
        },
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
