import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private emailField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/login');
    await this.page.waitForURL('**/#/login'); 
  }

  async login(email: string, password: string): Promise<void> {
    await this.goto()
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/realworld.qa.guru\/#?/);
  }
}
