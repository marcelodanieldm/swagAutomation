// tests/checkout.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

// Describe el conjunto de pruebas para el flujo de compra (checkout).
test.describe('Flujo de Compra (Checkout)', () => {
    // Antes de cada prueba, el usuario inicia sesión y añade un producto al carrito
    // para comenzar el flujo de checkout.
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await cartPage.goToCheckout(); // Ir al paso 1 del checkout
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    // Caso de prueba: Completar el flujo de compra exitosamente.
    test('debería completar un pedido exitosamente', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Paso 1: Rellenar la información personal.
        await checkoutStepOnePage.fillYourInformation('Juan', 'Perez', '12345');
        await checkoutStepOnePage.continueToNextStep();

        // Verificar que estamos en el paso 2 (Overview).
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(checkoutStepTwoPage.checkoutTitle).toHaveText('Checkout: Overview');
        await expect(checkoutStepTwoPage.isProductInOverview('Sauce Labs Backpack')).resolves.toBeTruthy();

        // Paso 2: Finalizar el pedido.
        await checkoutStepTwoPage.finishOrder();

        // Verificar que estamos en la página de confirmación.
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(checkoutCompletePage.checkoutTitle).toHaveText('Checkout: Complete!');
        await expect(checkoutCompletePage.getThankYouMessage()).resolves.toBe('Thank you for your order!');
    });

    // Caso de prueba: Intentar continuar el checkout sin rellenar el nombre.
    test('debería mostrar un error si el nombre está vacío en el checkout', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutOnePage(page);
        await checkoutStepOnePage.fillYourInformation('', 'Perez', '12345'); // Nombre vacío
        await checkoutStepOnePage.continueToNextStep();

        await expect(checkoutStepOnePage.errorMessage).toBeVisible();
        await expect(checkoutStepOnePage.getErrorMessageText()).resolves.toBe('Error: First Name is required');
    });

    // Caso de prueba: Cancelar el checkout en el primer paso.
    test('debería cancelar el checkout y volver al carrito desde el primer paso', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const cartPage = new CartPage(page);

        await checkoutStepOnePage.cancelCheckout(); // Cancelar en el paso 1
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html'); // Debería volver al carrito
        await expect(cartPage.cartTitle).toHaveText('Your Cart');
    });

    // Caso de prueba: Cancelar el checkout en el segundo paso.
    test('debería cancelar el checkout y volver a la página de productos desde el segundo paso', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const productsPage = new ProductsPage(page);

        // Rellenar información para llegar al paso 2
        await checkoutStepOnePage.fillYourInformation('Test', 'User', '00000');
        await checkoutStepOnePage.continueToNextStep();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.cancelOrder(); // Cancelar en el paso 2

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Debería volver a la página de productos
        await expect(productsPage.productsTitle).toHaveText('Products');
    });

    // Puedes añadir más casos de prueba para validar los campos obligatorios en el paso 1,
    // o para verificar los totales en el paso 2.
});
