import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
    // Ejecución con navegador visible para desarrollo (headless: false)
    headless: false,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
