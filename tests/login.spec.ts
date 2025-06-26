// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

test.describe('Login Functionality', () => {
    test('should allow a standard user to log in successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('should display an error for invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('invalid_user', 'wrong_password');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('should lock out a locked_out_user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});