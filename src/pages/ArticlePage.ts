import { Page, Locator } from '@playwright/test';

export class ArticlePage {
    private page: Page;
    private commentField: Locator;
    private postCommentButton: Locator;
    private commentsSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentField = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentsSection = page.locator('.card'); 
    }

    async addComment(comment: string) {
        await this.commentField.fill(comment);
        await this.postCommentButton.click();
    }

    getCommentLocator(comment: string): Locator {
        return this.commentsSection.locator(`text=${comment}`);
    }
}
