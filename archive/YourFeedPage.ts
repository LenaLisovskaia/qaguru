import { Page, Locator } from '@playwright/test';

export class YourFeedPage {
    readonly page: Page;
    readonly profileNameField: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileNameField = page.locator('.navbar .user-name'); // ���������� ��������
        this.signupButton = page.locator('text=Sign up'); // �������� �������� ��� ������
    }

    async gotoRegister() {
        await this.signupButton.click();
    }

    async open(url: string) {
        await this.page.goto(url);
    }
}
