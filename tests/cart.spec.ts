// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test.describe('Funcionalidad del Carrito de Compras', () => {
    // Antes de cada prueba, iniciamos sesión y añadimos un producto al carrito
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('debería mostrar el título "Your Cart"', async ({ page }) => {
        const cartPage = new CartPage(page);
        await expect(cartPage.cartTitle).toBeVisible();
        await expect(cartPage.cartTitle).toHaveText('Your Cart');
    });

    test('debería mostrar el producto añadido en el carrito', async ({ page }) => {
        const cartPage = new CartPage(page);
        await expect(cartPage.isProductInCart('Sauce Labs Backpack')).resolves.toBeTruthy();
    });

    test('debería permitir continuar comprando', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.continueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('debería ir a la página de checkout', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    // Puedes añadir casos de prueba para eliminar elementos del carrito desde esta página,
    // o para un flujo completo de checkout si creas más Page Objects.
});