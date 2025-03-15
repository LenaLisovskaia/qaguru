import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private loginLink: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private logoutButton: Locator;
  private userDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: ' Login' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    this.userDropdown = page.locator('.nav-link', { hasText: 'Jane' });
  }

  async login(email: string, password: string) {
    await this.page.goto('https://realworld.qa.guru/', { waitUntil: 'domcontentloaded' });

    await this.loginLink.waitFor({ state: 'visible' });
    await this.loginLink.click();

    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.loginButton.click();
    await this.userDropdown.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.page.reload();

    await this.userDropdown.waitFor({ state: 'visible' });
    await this.userDropdown.click();

    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();

    await this.loginLink.waitFor({ state: 'visible' });
  }
}
