import { Page } from '@playwright/test';

export class RegisterPage {
    private page: Page;
    private signupButton;
    private mailField;
    private passwordField;
    private usernameField;

    constructor(page: Page) {
        this.page = page;
        this.signupButton = page.getByRole('button', { name: 'Sign up' });
        this.mailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('Password');
        this.usernameField = page.getByPlaceholder('Your Name');
    }

    async register(username: string, email: string, password: string) {
        await this.usernameField.fill(username);
        await this.mailField.fill(email);
        await this.passwordField.fill(password);
        await this.signupButton.click();
    }
}
