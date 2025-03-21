import { test, expect } from '@playwright/test';
import { MainPage, SignUpPage, EditorPage, ArticlePage } from '../src/pages';
import { UserBuilder, ArticleBuilder } from '../tests/builders'

test.describe('Article Publishing Tests', () => {
  let user: { username: string; email: string; password: string };

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const signUpPage = new SignUpPage(page);

    user = new UserBuilder().build();
    
    await mainPage.goto();
    await mainPage.navigateToSignUp();
    await signUpPage.signUp(user.username, user.email, user.password);
  });

  test('User can publish a new article', async ({ page }) => {
  const editorPage = new EditorPage(page);
  const articlePage = new ArticlePage(page);

  const article = new ArticleBuilder().build();

  await editorPage.goto();
  await editorPage.createArticle(article.title, article.description, article.body, article.tags.join(','));

  await articlePage.waitForArticlePage();
  await expect(await articlePage.getArticleTitle()).toBe(article.title);
  await expect(await articlePage.getArticleBody()).toBe(article.body);
  await expect(await articlePage.getArticleTags()).toContain(article.tags[0]);
  });
})