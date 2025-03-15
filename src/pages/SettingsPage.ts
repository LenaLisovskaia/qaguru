import { Page } from '@playwright/test';

export class SettingsPage {
    constructor(private page: Page) { }

    async changePassword(newPassword: string) {
        await this.page.getByRole('textbox', { name: 'Password' }).fill(newPassword);
        await this.page.getByRole('button', { name: 'Update Settings' }).click();
    }
}
