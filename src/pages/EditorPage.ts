import { Page } from '@playwright/test';

export class EditorPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createArticle(title: string, description: string, body: string, tags: string) {
    await this.page.getByRole('link', { name: ' New Article' }).click();
    await this.page.getByPlaceholder('Article Title').fill(title);
    await this.page.getByPlaceholder("What's this article about?").fill(description);
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(body);
    await this.page.getByPlaceholder('Enter tags').fill(tags);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
  }

  async getArticleTitle() {
    return await this.page.locator('h1').textContent();
  }
}
