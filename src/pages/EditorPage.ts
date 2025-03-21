import { Page, Locator } from '@playwright/test';

export class EditorPage {
  readonly page: Page;
  private newArticleButton: Locator;
  private articleTitleField: Locator;
  private articleDescriptionField: Locator;
  private articleBodyField: Locator;
  private articleTagsField: Locator;
  private publishArticleButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newArticleButton = page.locator('a[href="#/editor"]');
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(`What's this article about?`); 
    this.articleBodyField = page.getByPlaceholder('Write your article (in markdown)'); 
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async goto(): Promise<void> {
    await this.newArticleButton.isVisible();
    await this.newArticleButton.click();
    await this.articleTitleField.waitFor({ state: 'visible' });
  
  }

  async createArticle(title: string, description: string, body: string, tags: string): Promise<void> {
    await this.articleTitleField.fill(title);
    await this.articleDescriptionField.fill(description);
    await this.articleBodyField.fill(body);
    await this.articleTagsField.fill(tags);
    await this.publishArticleButton.click();
  }
}
