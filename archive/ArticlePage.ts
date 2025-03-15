import { Page, Locator, expect } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  private globalFeedButton: Locator;
  private articlePreview: Locator;
  private commentBox: Locator;
  private postCommentButton: Locator;
  private commentList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
    this.articlePreview = page.locator('.article-preview').first();
    this.commentBox = page.locator('textarea[placeholder="Write a comment..."]');
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.commentList = page.locator('.card-text');
  }

  async openFirstArticle(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.globalFeedButton.waitFor({ state: 'visible' });
    await this.globalFeedButton.click();
    await this.page.waitForSelector('.article-preview');

    await this.articlePreview.waitFor({ state: 'visible' });
    await this.articlePreview.click();
    await this.page.waitForURL(/.*\/article\//);
  }

  async addComment(commentText: string): Promise<void> {
    await this.page.waitForSelector('textarea[placeholder="Write a comment..."]', { state: 'visible' });

    await this.commentBox.fill(commentText);
    await this.postCommentButton.click();

    await this.page.waitForFunction(
      (commentText) => {
        return [...document.querySelectorAll('.card-text')].some(
          (el) => el.textContent?.trim() === commentText
        );
      },
      commentText
    );
  }

  async getLastCommentText(): Promise<string> {
    return await this.commentList.last().innerText();
  }
}
