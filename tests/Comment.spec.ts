import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const email = 'l_the_q@mail.ru';
const password = 'newpassword';

test('User can leave a random comment on an article', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/');

  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/realworld.qa.guru\/#?/);

  await page.getByRole('button', { name: 'Global Feed' }).click();
  await page.waitForSelector('a[href*="/article/"]');

  await page.getByRole('link', { name: 'Read more' }).first().click();
  await page.waitForURL(/.*\/article\//);

  const commentText = faker.lorem.sentence();

  await page.getByRole('textbox', { name: 'Write a comment...' }).fill(commentText);
  await page.getByRole('button', { name: 'Post Comment' }).click();

  const lastComment = page.locator('.card-text').last();
  await expect(lastComment).toContainText(commentText);
});
