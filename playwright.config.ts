import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "node:os";
import path from "node:path";

const testDirectory = path.join(tmpdir(), "deja-vu-e2e");
const buildDirectory = path.join(testDirectory, "dist");

export default defineConfig({
  testDir: "./e2e",
  outputDir: path.join(testDirectory, "results"),
  fullyParallel: true,
  use: { baseURL: "http://127.0.0.1:4175", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: `npm run build -- --outDir "${buildDirectory}" --emptyOutDir && npm run preview -- --outDir "${buildDirectory}" --host 127.0.0.1 --port 4175 --strictPort`,
    url: "http://127.0.0.1:4175",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
