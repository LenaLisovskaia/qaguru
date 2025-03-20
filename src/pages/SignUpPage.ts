import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  private usernameField: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private signUpButton: Locator;
  private yourFeedButton: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Your Name');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.yourFeedButton = page.getByRole('button', {name: 'Your Feed' });
  
  }

  async signUp(username: string, email: string, password: string): Promise<void> {
    await this.page.goto('/#/register');
    await this.usernameField.fill(username);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signUpButton.click();

    await this.page.waitForURL('**/#/');

    await expect(this.yourFeedButton).toBeVisible();

  }
}
