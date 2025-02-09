import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { faker } from '@faker-js/faker';

const email = 'l_the_q@mail.ru';
const oldPassword = 'newpassword';
const newPassword = faker.internet.password(12);

test('User can change password and log in with new one, then revert password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(email, oldPassword);

  await page.getByRole('img', { name: 'Jane' }).click();
  await page.getByRole('link', { name: ' Settings' }).click();

  await page.getByRole('textbox', { name: 'Password' }).fill(newPassword);
  await page.getByRole('button', { name: 'Update Settings' }).click();

  await loginPage.logout();

  await loginPage.login(email, newPassword);

  await expect(page.getByRole('navigation')).toContainText('Jane');

  await page.getByRole('img', { name: 'Jane' }).click();
  await page.getByRole('link', { name: ' Settings' }).click();

  await page.getByRole('textbox', { name: 'Password' }).fill(oldPassword);
  await page.getByRole('button', { name: 'Update Settings' }).click();


  await loginPage.logout();

  
  await loginPage.login(email, oldPassword);
  await expect(page.getByRole('navigation')).toContainText('Jane');
});
