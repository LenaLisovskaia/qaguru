import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/MainPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { YourFeedPage } from '../src/pages/YourFeedPage';
import { ArticlePage } from '../src/pages/ArticlePage';

const URL_UI = 'https://realworld.qa.guru';

test.describe('User can comment on an article', () => {
    let user: { username: string; email: string; password: string };
    let commentText: string;

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        // Генерация данных пользователя
        user = {
            username: faker.person.firstName(),
            email: faker.internet.email(undefined, undefined, 'example.com'),
            password: faker.internet.password({ length: 10 }),
        };

        // Генерация случайного комментария
        commentText = faker.lorem.sentence();

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
    });

    test('User should be able to comment on an article', async ({ page }) => {
        const yourFeedPage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);

        // Переход в "Global Feed" и клик по первой статье
        await yourFeedPage.gotoGlobalFeed();
        await yourFeedPage.openFirstArticle();

        // Оставляем комментарий
        await articlePage.addComment(commentText);

        // Проверяем, что комментарий отображается
        await expect(articlePage.getCommentLocator(commentText)).toBeVisible();
    });
});
