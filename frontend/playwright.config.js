import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Limit parallel execution to a reasonable number of workers.
  workers: 2,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry failed tests only on CI environment with a maximum of 2 retries.
  retries: process.env.CI ? 2 : 0,

  // Use a longer timeout duration to accommodate potentially slower tests.
  timeout: 90000, // 90 seconds

  // Use the HTML reporter to generate test reports.
  reporter: 'html',

  // Base URL to use in actions like `await page.goto('/')`.
  use: {
    baseURL: 'http://localhost:3000',
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },

  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  // Run your local dev server before starting the tests.
  webServer: {
    // command: 'npm run dev', // You can uncomment this line if you need to run a specific command for your server.
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
