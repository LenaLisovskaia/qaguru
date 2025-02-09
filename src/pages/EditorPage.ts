import { Page, Locator } from '@playwright/test';

export class EditorPage {
  private page: Page;
  private articleTitle: Locator;
  private newArticleButton: Locator;
  private publishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newArticleButton = page.getByRole('link', { name: ' New Article' });
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.articleTitle = page.locator('h1');
  }

  async createArticle(title: string, description: string, body: string, tags: string) {
    await this.newArticleButton.click();
    await this.page.getByPlaceholder('Article Title').fill(title);
    await this.page.getByPlaceholder("What's this article about?").fill(description);
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(body);
    await this.page.getByPlaceholder('Enter tags').fill(tags);
    await this.publishButton.click();
  }

  async getArticleTitle() {
    await this.articleTitle.waitFor({ state: 'visible' });
    return await this.articleTitle.textContent();
  }
}
