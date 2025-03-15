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

        await loginButton.waitFor({ state: 'attached' }); // Убедимся, что элемент не исчезает
        await loginButton.waitFor({ state: 'visible' });  // Ждем, пока элемент будет видимым
        await loginButton.click(); // Кликаем, когда все стабильно
    }
}
