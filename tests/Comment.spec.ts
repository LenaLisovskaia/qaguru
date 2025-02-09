import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ArticlePage } from '../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

const email = 'l_the_q@mail.ru';
const password = 'newpassword';

test('User can leave a random comment on an article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  await loginPage.login(email, password);
  await articlePage.openFirstArticle();

  const commentText = faker.lorem.sentence();

  await articlePage.addComment(commentText);

  const lastComment = await articlePage.getLastCommentText();
  await expect(lastComment).toContain(commentText);
});
