import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/MainPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { YourFeedPage } from '../src/pages/YourFeedPage';


const URL_UI = 'https://realworld.qa.guru';


test('sign Up as a new user', async ({ page }) => {

    const user = {
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
    }
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const yourFeedPage = new YourFeedPage(page);


    await mainPage.open(URL_UI);
    await mainPage.gotoRegister();
    await registerPage.register(user.username, user.email, user.password);
    await expect(yourFeedPage.profileNameField).toBeVisible();
    await expect(yourFeedPage.profileNameField).toContainText(user.username);


});

