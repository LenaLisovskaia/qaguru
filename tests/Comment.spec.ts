import { test, expect } from '@playwright/test';
import { MainPage, SignUpPage, ArticlePage } from '../src/pages';
import { UserBuilder } from '../tests/builders'
import { faker } from '@faker-js/faker';

test.describe('Commenting on the Article Tests', () => {
  let user: { username: string; email: string; password: string };

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const signUpPage = new SignUpPage(page);

    user = new UserBuilder().build();
    
    await mainPage.goto();
    await mainPage.navigateToSignUp();
    await signUpPage.signUp(user.username, user.email, user.password);
  });

  test('User can leave a random comment on an article', async ({ page }) => {
  const articlePage = new ArticlePage(page);
  await articlePage.openFirstArticle();

  const commentText = faker.lorem.sentence();

  await articlePage.addComment(commentText);
  
  const lastComment = await articlePage.getLastCommentText();
  await expect(lastComment).toBe(commentText);
  });
})