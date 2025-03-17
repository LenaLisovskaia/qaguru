import { Page, Locator } from '@playwright/test';

export class EditorPage {
  readonly page: Page;
  private articleTitleField: Locator;
  private articleDescriptionField: Locator;
  private articleBodyField: Locator;
  private articleTagsField: Locator;
  private publishArticleButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(`What's this article about?`); 
    this.articleBodyField = page.getByPlaceholder('Write your article (in markdown)'); 
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/editor');
    await this.page.waitForURL('**/#/editor'); 
  }

  async createArticle(title: string, description: string, body: string, tags: string): Promise<void> {
   
    await this.articleTitleField.waitFor({ state: 'visible' });
    await this.articleTitleField.fill(title);
    await this.articleDescriptionField.fill(description);
    await this.articleBodyField.fill(body);
    await this.articleTagsField.fill(tags);
    await this.publishArticleButton.click();
  }
}
