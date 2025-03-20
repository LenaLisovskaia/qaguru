import { Page, Locator } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  private articleTitle: Locator;
  private articleDescription: Locator;
  private articleBody: Locator;
  private articleTags: Locator;
  private globalFeedButton: Locator;
  private articlePreview: Locator;
  private commentBox: Locator;
  private postCommentButton: Locator;
  private commentList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
    this.articlePreview = page.locator('.article-preview').first();
    this.articleTitle = page.locator('.article-page h1');
    this.articleDescription = page.locator('.article-meta + div p'); 
    this.articleBody = page.locator('.article-content p'); 
    this.articleTags = page.locator('.tag-list .tag-pill');
    this.commentBox = page.locator('textarea[placeholder="Write a comment..."]');
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.commentList = page.locator('.card-text');
  }

  async waitForArticlePage(): Promise<void> {
      await this.page.waitForURL('**/#/article/**');
      await this.page.waitForSelector('.article-page', { state: 'visible' });
    }

  async getArticleTitle(): Promise<string> {
    await this.articleTitle.waitFor({ state: 'visible' });
    return this.articleTitle.innerText();
  }

  async getArticleBody(): Promise<string> {
    await this.articleBody.waitFor({ state: 'visible' });
    return this.articleBody.innerText();
  }

  async getArticleTags(): Promise<string[]> {
    await this.articleTags.first().waitFor({ state: 'visible' });
    return await this.articleTags.allTextContents();
  }

  async openFirstArticle(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.globalFeedButton.waitFor({ state: 'visible' });
    await this.globalFeedButton.click();
    await this.page.waitForSelector('.article-preview');
    await this.articlePreview.waitFor({ state: 'visible' });
    await this.articlePreview.click();
    await this.articleTitle.isVisible();
  }

  async addComment(commentText: string): Promise<void> {
    await this.commentBox.isVisible()
    await this.commentBox.fill(commentText);
    await this.postCommentButton.click();
  }

  async getLastCommentText(expectedComment?: string): Promise<string> {
    const lastComment = await this.commentList.last().innerText();

    if (expectedComment && !lastComment.includes(expectedComment)) {
        throw new Error(`Expected comment "${expectedComment}" does not match "${lastComment}"`);
    }

    return lastComment;
  }

}
