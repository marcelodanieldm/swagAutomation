// pages/CheckoutStepTwoPage.js

// Definición de la clase CheckoutStepTwoPage
class CheckoutStepTwoPage {
    // Constructor que inicializa la página y los localizadores de elementos.
    constructor(page) {
        this.page = page;
        this.checkoutTitle = page.locator('.title'); // Título de la página ("Checkout: Overview")
        this.finishButton = page.locator('[data-test="finish"]'); // Botón de Finalizar
        this.cancelButton = page.locator('[data-test="cancel"]'); // Botón de Cancelar
        this.cartItem = (productName) => page.locator(`.cart_item:has-text("${productName}")`); // Elemento en la lista de productos del overview
        this.itemTotal = page.locator('.summary_subtotal_label'); // Total de los artículos
        this.tax = page.locator('.summary_tax_label'); // Impuestos
        this.total = page.locator('.summary_total_label'); // Total final
    }

    // Verifica si el título de la página del paso dos del checkout es visible.
    async isCheckoutStepTwoPageLoaded() {
        return await this.checkoutTitle.isVisible();
    }

    // Verifica si un producto específico está visible en el resumen del pedido.
    async isProductInOverview(productName) {
        return await this.cartItem(productName).isVisible();
    }

    // Haz clic en el botón de Finalizar.
    async finishOrder() {
        await this.finishButton.click();
    }

    // Haz clic en el botón de Cancelar.
    async cancelOrder() {
        await this.cancelButton.click();
    }

    // Obtiene el total de los artículos.
    async getItemTotal() {
        return await this.itemTotal.textContent();
    }

    // Obtiene el valor del impuesto.
    async getTax() {
        return await this.tax.textContent();
    }

    // Obtiene el total final del pedido.
    async getTotal() {
        return await this.total.textContent();
    }
}

// Exporta la clase CheckoutStepTwoPage.
module.exports = CheckoutStepTwoPage;
