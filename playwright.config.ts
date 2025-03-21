import { defineConfig } from '@playwright/test';

export default defineConfig({
    maxFailures: 0, 
  use: {
    trace: 'on',
    baseURL: 'https://realworld.qa.guru/',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
