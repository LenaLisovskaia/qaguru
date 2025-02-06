import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const email = 'l_the_q@mail.ru';
const oldPassword = 'newpassword';
const newPassword = faker.internet.password(12); 

test('User can change password and log in with new one, then revert password', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/');
  await page.waitForLoadState('domcontentloaded');

  // login
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(oldPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  // waiting for a profile
  const userDropdown = page.locator('div.nav-link.dropdown-toggle');
  await userDropdown.waitFor({ state: 'visible', timeout: 10_000 });

  // opening settings
  await userDropdown.click();
  await page.locator('.dropdown-menu').waitFor({ state: 'visible', timeout: 5000 });
  await page.locator('a.dropdown-item[href="#/settings"]').click();
  await page.waitForURL(/.*\/settings/);

  // changing password
  await page.locator('input[name="password"]').fill(newPassword);
  await page.getByRole('button', { name: 'Update Settings' }).click();

  // logout
  await userDropdown.click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.waitForURL(/realworld.qa.guru\/#?/);

  // new password login
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(newPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await userDropdown.waitFor({ state: 'visible', timeout: 10_000 });

  //  setting an old password
  await userDropdown.click();
  await page.locator('a.dropdown-item[href="#/settings"]').click();
  await page.waitForURL(/.*\/settings/);

  await page.locator('input[name="password"]').fill(oldPassword);
  await page.getByRole('button', { name: 'Update Settings' }).click();

  // logout
  await userDropdown.click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.waitForURL(/realworld.qa.guru\/#?/);

  // logging in with the old password
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(oldPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await userDropdown.waitFor({ state: 'visible', timeout: 10_000 });
});
