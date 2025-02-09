import { test, expect } from '@playwright/test';
import { EditorPage } from '../src/pages/EditorPage';
import { faker } from '@faker-js/faker'; 
import { ArticlePage } from '../src/pages/ArticlePage';

const URL_UI = 'https://realworld.qa.guru/';
const email = 'l_the_q@mail.ru';
const password = 'newpassword';


test.beforeEach(async ({ page }) => {
  await page.goto(URL_UI);
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/realworld.qa.guru\/#?/);
});

test('User can publish a new article', async ({ page }) => {
  const editorPage = new EditorPage(page);

  const title = `Article ${faker.string.alphanumeric(8)}`;
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraph();
  const tags = faker.lorem.word();

  await editorPage.createArticle(title, description, body, tags);

  const articleTitle = await editorPage.getArticleTitle();
  await expect(articleTitle).not.toBe('');
  await expect(articleTitle).toBe(title);
});
