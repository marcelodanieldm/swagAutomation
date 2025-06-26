// pages/ProductsPage.js
class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = page.locator('.title');
        this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async getProductsTitle() {
        return await this.productsTitle.textContent();
    }

    async addBackpackToCart() {
        await this.backpackAddToCartButton.click();
    }

    async getShoppingCartBadgeText() {
        return await this.shoppingCartBadge.textContent();
    }

    async goToShoppingCart() {
        await this.shoppingCartLink.click();
    }
}
module.exports = ProductsPage;