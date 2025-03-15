import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/MainPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { YourFeedPage } from '../src/pages/YourFeedPage';
import { NewArticlePage } from '../src/pages/NewArticlePage'

const URL_UI = 'https://realworld.qa.guru';

test.describe('User can register and publish an article', () => {
    let user: { username: string; email: string; password: string };
    let article: { title: string; description: string; body: string; tags: string[] };

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        user = {
            username: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
        };

        article = {
            title: faker.lorem.sentence(1),
            description: faker.lorem.sentence(5),
            body: faker.lorem.paragraphs(5),
            tags: [faker.word.noun(), faker.word.noun()], 
        };

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
    });

    test('User should be able to publish an article', async ({ page }) => {
        const yourFeedPage = new YourFeedPage(page);
        const newArticlePage = new NewArticlePage(page);

        await yourFeedPage.gotoNewArticle();
        await newArticlePage.createArticle(article.title, article.description, article.body, article.tags);

        await expect(page.getByRole('heading', { name: article.title })).toBeVisible();
        await expect(page.getByText(article.body)).toBeVisible();
        await expect(page.getByText(article.tags[0])).toBeVisible();
        await expect(page.getByText(article.tags[1])).toBeVisible();
    });
});
