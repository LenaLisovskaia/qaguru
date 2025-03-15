import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/MainPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { SettingsPage } from '../src/pages/SettingsPage';
import { LoginPage } from '../src/pages/LoginPage';
import { YourFeedPage } from '../src/pages/YourFeedPage';

const URL_UI = 'https://realworld.qa.guru';

test.describe('User Registration and Password Update', () => {
    let user: { username: string; email: string; password: string };
    let newPassword: string;

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        user = {
            username: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
        };

        newPassword = faker.internet.password({ length: 12 });

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
    });

    test('User should be able to update password and login with new credentials', async ({ page }) => {
        const yourFeedPage = new YourFeedPage(page);
        const settingsPage = new SettingsPage(page);
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await yourFeedPage.waitForProfileToLoad();
        expect(await yourFeedPage.getProfileName()).toBe(user.username);

        await yourFeedPage.gotoSettings();
        await settingsPage.changePassword(newPassword);

        await yourFeedPage.logout();

        await mainPage.gotoLogin();
        await loginPage.login(user.email, newPassword);

        await yourFeedPage.waitForProfileToLoad();
        expect(await yourFeedPage.getProfileName()).toBe(user.username);
    });
});
