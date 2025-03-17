import { test, expect } from '@playwright/test';
import { SignUpPage } from '../src/pages/SignUpPage';
import { ArticlePage } from '../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let username: string;
let email: string;
let password: string;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  username = faker.internet.username();
  email = faker.internet.email();
  password = faker.internet.password({ length: 12 });
  await signUpPage.signUp(username, email, password);
});


test('User can leave a random comment on an article', async ({ page }) => {
  const articlePage = new ArticlePage(page);

  await articlePage.openFirstArticle();

  const commentText = faker.lorem.sentence();

  await articlePage.addComment(commentText);

  const lastComment = await articlePage.getLastCommentText();
  expect(lastComment).toContain(commentText);
})