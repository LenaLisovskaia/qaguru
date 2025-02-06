import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../src/pages/LoginPage';
import { EditorPage } from '../src/pages/EditorPage';

const URL_UI = 'https://realworld.qa.guru/';
const email = 'l_the_q@mail.ru';
const password = 'newpassword';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
  await expect(page).toHaveURL(/realworld.qa.guru\/#?/);
});

test('User can publish a new article', async ({ page }) => {
  const editorPage = new EditorPage(page);


  const title = faker.lorem.words(3); 
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(2);
  const tags = faker.word.noun();

  console.log(`Generated title: ${title}`);
  console.log(`Generated description: ${description}`);
  console.log(`Generated body: ${body}`);
  console.log(`Generated tags: ${tags}`);

  await editorPage.createArticle(title, description, body, tags);
  await expect(page.locator('h1')).toHaveText(title);
});
