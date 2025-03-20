import { Page, Locator,expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  private profileMenuButton: Locator;
  private yourFeedButton: Locator
  private dropdownMenu: Locator;
  private settingsLink: Locator;
  private emailField: Locator;
  private nameField: Locator;
  private passwordField: Locator;
  private updateSettingsButton: Locator;
  private logoutButton: Locator;

  constructor(page: Page, expectedEmail:string) {
    this.page = page;
    this.expectedEmail = expectedEmail;
    this.dropdownMenu = page.locator('.dropdown-menu');
    this.profileMenuButton = page.locator("div.nav-link.dropdown-toggle.cursor-pointer");
    this.settingsLink = page.getByRole('link', { name: ' Settings' });
    this.emailField = page.locator('//input[@placeholder="Email"]'); 
    this.nameField = page.locator('//input[@placeholder="Your Name"]'); 
    this.passwordField = page.getByPlaceholder('Password'); 
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' }); 
    this.logoutButton = page.locator('.dropdown-item:has-text("Logout")'); 
    this.yourFeedButton = page.getByRole('button', {name: 'Your Feed'});
  }

  async goto(): Promise<void> {
    await this.profileMenuButton.waitFor({state: 'visible'});
    await this.profileMenuButton.click()
    await this.settingsLink.click();
    await this.page.waitForURL('**/#/settings'); 
  }

  async verifyUserLoggedIn(): Promise<void> {
    await this.profileMenuButton.waitFor({state: 'visible'});
    await this.yourFeedButton.waitFor({state: 'visible'});
   
  }

  async updatePassword(newPassword: string): Promise<void> {
    await this.passwordField.fill(newPassword);
    await this.updateSettingsButton.click();
  }

  async logout(): Promise<void> {
    await this.profileMenuButton.click();
    await this.dropdownMenu.waitFor({ state: 'visible' });

    await this.logoutButton.click();
    await this.page.waitForURL('**/#/');
  }
}