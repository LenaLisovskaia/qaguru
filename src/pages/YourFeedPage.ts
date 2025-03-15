import { Page } from '@playwright/test';

export class YourFeedPage {
    private page: Page;
    private profileDropdown;
    private profileNameField;
    private logoutLink;
    private settingsLink;
    private dropdownMenu;
    private newArticleButton;
    private globalFeedButton;
    private firstArticleTitle;

    constructor(page: Page) {
        this.page = page;
        this.profileDropdown = page.locator('.nav-link.dropdown-toggle.cursor-pointer');
        this.profileNameField = this.profileDropdown; 
        this.dropdownMenu = page.locator('.dropdown-menu');
        this.logoutLink = page.locator('.dropdown-menu >> text=Logout');
        this.settingsLink = page.locator('.dropdown-menu >> text=Settings');
        this.newArticleButton = page.getByRole('link', { name: 'New Article' });
        this.globalFeedButton = page.getByRole('link', { name: 'Global Feed' });
        this.firstArticleTitle = page.locator('.article-preview').first();
    }

    async waitForProfileToLoad() {
        await this.profileNameField.waitFor({ state: 'visible' });
    }

    async getProfileName(): Promise<string> {
        return (await this.profileNameField.textContent())?.trim() ?? '';
    }

    async gotoSettings() {
        await this.profileDropdown.click();
        await this.dropdownMenu.waitFor({ state: 'visible' });
        await this.settingsLink.click();
    }

    async logout() {
        await this.profileDropdown.click();
        await this.dropdownMenu.waitFor({ state: 'visible' });
        await this.logoutLink.click();
    }

    async gotoNewArticle() {
        await this.newArticleButton.click();
    }

    async gotoGlobalFeed() {
        await this.globalFeedButton.waitFor({ state: 'attached' });
        await this.globalFeedButton.waitFor({ state: 'visible' }); 
        await this.globalFeedButton.click();
    }

    async openFirstArticle() {
        await this.firstArticleTitle.click();
    }
}
