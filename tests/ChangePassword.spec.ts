import { test, expect } from '@playwright/test';
import { MainPage, SignUpPage, LoginPage, SettingsPage, EditorPage, ArticlePage } from '../src/pages';
import { UserBuilder } from '../builders';


test.describe('Change Password Tests', () => {
  let user: { username: string; password: string; email: string };
  let editorPage: EditorPage;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const signUpPage = new SignUpPage(page);

    await mainPage.goto();
    await mainPage.navigateToSignUp();

    user = new UserBuilder().build();

    await signUpPage.signUp(user.username, user.email, user.password);
    editorPage = new EditorPage(page);
    articlePage = new ArticlePage(page);
  });

test('User can change password and log in with new one, then revert password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const settingsPage = new SettingsPage(page, user.email)

  await settingsPage.goto();
  await settingsPage.updatePassword(user.password,);
  await settingsPage.logout();

  await page.goto('/');
  await loginPage.login(user.email, user.password);
  await settingsPage.verifyUserLoggedIn()
  await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
  });
});