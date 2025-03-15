import { Page } from '@playwright/test';

export class NewArticlePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createArticle(title: string, description: string, body: string, tags: string[]) {
        await this.page.getByRole('textbox', { name: 'Article Title' }).fill(title);
        await this.page.getByRole('textbox', { name: "What's this article about?" }).fill(description);
        await this.page.getByRole('textbox', { name: 'Write your article (in' }).fill(body);
        await this.page.getByRole('textbox', { name: 'Enter tags' }).fill(tags.join(','));
        await this.page.getByRole('button', { name: 'Publish Article' }).click();
    }
}
