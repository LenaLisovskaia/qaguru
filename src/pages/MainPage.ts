import { Page } from '@playwright/test';

export class MainPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await this.page.goto(url);
    }

    async gotoRegister() {
        await this.page.getByRole('link', { name: 'Sign up' }).click();
    }

    async gotoLogin() {
        const loginButton = this.page.getByRole('link', { name: 'Login' });

        await loginButton.waitFor({ state: 'attached' }); // ��������, ��� ������� �� ��������
        await loginButton.waitFor({ state: 'visible' });  // ����, ���� ������� ����� �������
        await loginButton.click(); // �������, ����� ��� ���������
    }
}
