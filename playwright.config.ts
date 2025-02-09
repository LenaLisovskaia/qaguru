import { defineConfig } from '@playwright/test';

export default defineConfig({
    maxFailures: 0, 
  use: {
    trace: 'on',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
