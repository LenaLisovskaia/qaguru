import { Page } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openFirstArticleFromProfile(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('.nav-link', { timeout: 15000 });

    const userDropdown = this.page.getByText('Jane', { exact: true });
    await userDropdown.waitFor({ state: 'attached', timeout: 15000 });
    await userDropdown.click();

    const profileLink = this.page.getByRole('link', { name: ' Profile' });
    await profileLink.waitFor({ state: 'attached', timeout: 10000 });
    await profileLink.click();
    await this.page.waitForURL(/.*\/profile\//);

    await this.page.waitForSelector('.article-preview', { timeout: 15000 });
    const articlesCount = await this.page.locator('.article-preview').count();

    if (articlesCount === 0) {
      throw new Error('No articles found!');
    }

    await this.page.locator('.article-preview').first().click();
    await this.page.waitForURL(/.*\/article\//);
  }

  async addComment(commentText: string): Promise<void> {
    await this.page.waitForSelector('textarea[placeholder="Write a comment..."]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Write a comment...' }).fill(commentText);
    await this.page.getByRole('button', { name: 'Post Comment' }).click();
  }

  async getLastCommentText() {
    return this.page.locator('div.card-text').last();
  }
}
