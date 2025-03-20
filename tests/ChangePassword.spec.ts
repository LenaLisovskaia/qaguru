import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/MainPage';
import { SignUpPage } from '../src/pages/SignUpPage';
import { LoginPage } from '../src/pages/LoginPage';
import { SettingsPage } from '../src/pages/SettingsPage';
import { EditorPage } from '../src/pages/EditorPage';
import { ArticlePage } from '../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let username: string;
let email: string;
let password: string;
let editorPage: EditorPage;
let articlePage: ArticlePage;

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

test('User can change password and log in with new one, then revert password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const settingsPage = new SettingsPage(page, email)

  await settingsPage.goto();
  await settingsPage.updatePassword(password);
  await settingsPage.logout();

  await page.goto('/');
  await loginPage.login(email, password);
  await settingsPage.verifyUserLoggedIn()

  await settingsPage.goto();
  await settingsPage.updatePassword(password);
  await settingsPage.logout();

  await page.goto('/');
  await loginPage.login(email, password);
  await settingsPage.verifyUserLoggedIn()
});
