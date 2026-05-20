import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30000,
  fullyParallel: false,
  reporter: "html",
  use: {
    // Aquí conectamos Playwright con tu web alojada en Vercel
    baseURL: "https://visual-testing.vercel.app",
    trace: "on-first-retry",
    // Si quieres ver cómo el navegador se abre y hace los clics, déjalo en false
    headless: process.env.CI ? true : false,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
