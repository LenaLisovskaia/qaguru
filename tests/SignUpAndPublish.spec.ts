import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/MainPage';
import { SignUpPage } from '../src/pages/SignUpPage';
import { EditorPage } from '../src/pages/EditorPage';
import { ArticlePage } from '../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let username: string;
let email: string;
let password: string;
let editorPage: EditorPage;
let articlePage: ArticlePage;

const ARTICLE_TITLE = faker.lorem.words(3);
const ARTICLE_DESCRIPTION = faker.lorem.sentence();
const ARTICLE_BODY = faker.lorem.paragraph();
const ARTICLE_TAGS = faker.lorem.word();

test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);
  const signUpPage = new SignUpPage(page);

  await mainPage.goto();
  await mainPage.navigateToSignUp();

  username = faker.internet.username();
  email = faker.internet.email();
  password = faker.internet.password({ length: 10 });

  await signUpPage.signUp(username, email, password);
  editorPage = new EditorPage(page);
  articlePage = new ArticlePage(page);
});

test('User can publish a new article', async ({ page }) => {
  await editorPage.goto();
  await editorPage.createArticle(ARTICLE_TITLE, ARTICLE_DESCRIPTION, ARTICLE_BODY, ARTICLE_TAGS);

  await articlePage.waitForArticlePage();

  const articleTitle = await articlePage.getArticleTitle();
  const articleBody = await articlePage.getArticleBody();
  const articleTags = await articlePage.getArticleTags();

  await expect(articleTitle).toBe(ARTICLE_TITLE);
  await expect(articleBody).toBe(ARTICLE_BODY);
  await expect(articleTags).toContain(ARTICLE_TAGS);
})