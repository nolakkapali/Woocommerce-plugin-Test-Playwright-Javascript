// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
// Function to encode username:password to Base64
function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

// Your credentials (replace with your actual username and password)
const username = 'ck_bbaa94221be116e8402d4d706a1adfdb1eff647a';
const password = 'ycs_5b236cfc306126ad55291e315232556fe3dc59df';
const credentials = `${username}:${password}`;
const base64Credentials = encodeBase64(credentials);

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
             ['allure-playwright',{outputFolder:'allure-result'}]

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'woocommerce-rest-api-tests',
      use: {
        baseURL: 'http://localhost:10016/', //base URL--ClaypotStore 
        extraHTTPHeaders: {
          // Add the Authorization header with Basic Auth
          'Authorization': `Basic ${base64Credentials}`,
        },
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // Desktop - Microsoft Edge
    {
      name: 'Desktop-Microsoft_Edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge', // Use Microsoft Edge
        headless: false, // Run in headed mode (visible browser)
        viewport: { width: 1280, height: 720 }, // Desktop resolution
      },
    },

    // Tablet - Microsoft Edge (e.g., iPad)
    {
      name: 'Tablet-Microsoft_Edge',
      use: {
        ...devices['iPad (gen 7)'], // Use built-in iPad Pro 11 device descriptor
        browserName: 'chromium',
        channel: 'msedge', // Use Microsoft Edge
        headless: false,
      },
    },

    // Mobile - Microsoft Edge (e.g., iPhone)
    {
      name: 'Mobile-Microsoft_Edge',
      use: {
        ...devices['iPhone 15 Pro Max'], // Use built-in iPhone 12 device descriptor
        browserName: 'chromium',
        channel: 'msedge', // Use Microsoft Edge
        headless: false,
      },
    }
    // {
    //     name: 'edge',
    //     use: { ...devices['iPhone 15 Pro Max'] },
    //   },
    //   {
    //     name: 'edge',
    //     use: { ...devices['iPad (gen 7)'] },
    //   },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

