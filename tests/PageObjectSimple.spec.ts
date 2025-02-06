/* import { test, expect } from '@playwright/test';
//import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/MainPage';

const URL_UI = 'https://realworld.qa.guru/';

test('The user goes through authorization with valid login and password', async ({
    page,
}) => {
    const mainPage = new MainPage(page);
    await mainPage.open(URL_UI);
    await mainPage.gotoRegister();
    await expect('simple').toContainText('s1');
});

/* function getUsername() {
    return faker.person.firstName();
}

const getEmail = function () {
    return faker.internet.email();
};

//стрелочная функция 
const getPassword = () => {
    retuen faker.internet.password({ length: 10});
}; */