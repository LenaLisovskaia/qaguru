import { Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly signupButton;

  constructor(page: Page) {
    this.page = page;
    this.signupButton = page.getByRole('link', { name: 'Sign up' });
  }

  async gotoRegister() {
    await this.signupButton.click();
  }

  async open(url: string) {
    await this.page.goto(url);
  }
}
