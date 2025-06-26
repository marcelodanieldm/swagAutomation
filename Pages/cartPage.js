// pages/CartPage.js
class CartPage {
    constructor(page) {
        this.page = page;
        this.cartTitle = page.locator('.title');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItem = (productName) => page.locator(`.cart_item:has-text("${productName}")`);
    }

    async isCartPageLoaded() {
        return await this.cartTitle.isVisible();
    }

    async isProductInCart(productName) {
        return await this.cartItem(productName).isVisible();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}
module.exports = CartPage;