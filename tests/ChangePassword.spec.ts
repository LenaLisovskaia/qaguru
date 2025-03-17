import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { SettingsPage } from '../src/pages/SettingsPage';
import { faker } from '@faker-js/faker';

const email = 'l_the_q@mail.ru';
const oldPassword = 'newpassword';
const newPassword = faker.internet.password(12);

test('User can change password and log in with new one, then revert password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const settingsPage = new SettingsPage(page, email);

  await page.goto('/');
  await loginPage.login(email, oldPassword);
  await settingsPage.verifyUserLoggedIn();
 
  await settingsPage.goto();
  await settingsPage.updatePassword(newPassword);
  await settingsPage.logout();

  await page.goto('/');
  await loginPage.login(email, newPassword);
  await settingsPage.verifyUserLoggedIn()

  await settingsPage.goto();
  await settingsPage.updatePassword(oldPassword);
  await settingsPage.logout();

  await page.goto('/');
  await loginPage.login(email, oldPassword);
  await settingsPage.verifyUserLoggedIn()
});
