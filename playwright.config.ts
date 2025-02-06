import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
