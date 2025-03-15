import { Page, Locator } from '@playwright/test';

export class YourFeedPage {
    readonly page: Page;
    readonly profileNameField: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileNameField = page.locator('.navbar .user-name'); // Уточненный селектор
        this.signupButton = page.locator('text=Sign up'); // Добавлен селектор для кнопки
    }

    async gotoRegister() {
        await this.signupButton.click();
    }

    async open(url: string) {
        await this.page.goto(url);
    }
}
