// pages/CheckoutCompletePage.js

// Definición de la clase CheckoutCompletePage
class CheckoutCompletePage {
    // Constructor que inicializa la página y los localizadores de elementos.
    constructor(page) {
        this.page = page;
        this.checkoutTitle = page.locator('.title'); // Título de la página ("Checkout: Complete!")
        this.thankYouHeader = page.locator('.complete-header'); // Encabezado de agradecimiento
        this.ponyExpressImage = page.locator('.pony_express'); // Imagen de Pony Express
        this.backHomeButton = page.locator('[data-test="back-to-products"]'); // Botón de Volver a Casa
    }

    // Verifica si el título de la página de completado del checkout es visible.
    async isCheckoutCompletePageLoaded() {
        return await this.checkoutTitle.isVisible();
    }

    // Obtiene el texto del encabezado de agradecimiento.
    async getThankYouMessage() {
        return await this.thankYouHeader.textContent();
    }

    // Haz clic en el botón de Volver a Casa.
    async backHome() {
        await this.backHomeButton.click();
    }
}

// Exporta la clase CheckoutCompletePage.
module.exports = CheckoutCompletePage;
