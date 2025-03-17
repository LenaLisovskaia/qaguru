import { Page, Locator,expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  private expectedEmail: string;
  private profileMenuButton: Locator;
  private dropdownMenu: Locator;
  private profileImage: Locator;
  private settingsLink: Locator;
  private emailField: Locator;
  private nameField: Locator;
  private passwordField: Locator;
  private updateSettingsButton: Locator;
  private logoutButton: Locator;

  constructor(page: Page, expectedEmail:string) {
    this.page = page;
    this.expectedEmail = expectedEmail;
    this.profileMenuButton = page.locator('.nav-link.dropdown-toggle');
    this.dropdownMenu = page.locator('.dropdown-menu');
    this.profileImage = page.getByRole('img', { name: 'Jane' }); 
    this.settingsLink = page.getByRole('link', { name: ' Settings' });
    this.emailField = page.locator('//input[@placeholder="Email"]'); 
    this.nameField = page.locator('//input[@placeholder="Your Name"]'); 
    this.passwordField = page.getByPlaceholder('Password'); 
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' }); 
    this.logoutButton = page.locator('.dropdown-item:has-text("Logout")'); 
  }

  async goto(): Promise<void> {
    await this.profileImage.click();
    await this.settingsLink.click();
    await this.page.waitForURL('**/#/settings'); 
  }

  async verifyUserLoggedIn(): Promise<void> {
    await expect(this.profileImage).toBeVisible();
   
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