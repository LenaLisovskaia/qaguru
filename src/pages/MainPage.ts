import { Page, Locator } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  private signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async navigateToSignUp(): Promise<void> {
    await this.signUpLink.click();
  }
}
