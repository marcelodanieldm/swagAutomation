
// tests/products.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage.js');
const ProductsPage = require('../pages/productsPage.js');

test.describe('Products Page Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should display products title', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await expect(productsPage.productsTitle).toHaveText('Products');
    });

    test('should add a product to cart and update badge', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.addBackpackToCart();
        await expect(productsPage.shoppingCartBadge).toHaveText('1');
    });

    test('should navigate to shopping cart from products page', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.addBackpackToCart();
        await productsPage.goToShoppingCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
});