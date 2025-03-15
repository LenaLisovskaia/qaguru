import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/MainPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { YourFeedPage } from '../src/pages/YourFeedPage';

const URL_UI = 'https://realworld.qa.guru';

test.describe('User Registration', () => {
    let user: { username: string; email: string; password: string };

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        user = {
            username: faker.person.firstName(),
            email: faker.internet.email(undefined, undefined, 'example.com'),
            password: faker.internet.password({ length: 10 }),
        };

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
    });

    test('User should see their profile name after registration', async ({ page }) => {
        const yourFeedPage = new YourFeedPage(page);

        await yourFeedPage.waitForProfileToLoad(); // Метод ожидания загрузки профиля
        const profileName = await yourFeedPage.getProfileName(); // Метод получения имени профиля

        await expect(profileName).toBe(user.username);
    });
});
