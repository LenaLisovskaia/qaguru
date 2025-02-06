import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.goto('https://realworld.qa.guru/', { waitUntil: 'domcontentloaded' });
    console.log('Current URL before login:', this.page.url()); 
    await this.page.waitForLoadState('networkidle'); 

    await this.page.getByRole('link', { name: ' Login' }).click();
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}
