// pages/CheckoutStepOnePage.js

// Definición de la clase CheckoutStepOnePage
class CheckoutStepOnePage {
    // Constructor que inicializa la página y los localizadores de elementos.
    constructor(page) {
        this.page = page;
        this.checkoutTitle = page.locator('.title'); // Título de la página ("Checkout: Your Information")
        this.firstNameField = page.locator('[data-test="firstName"]'); // Campo de nombre
        this.lastNameField = page.locator('[data-test="lastName"]'); // Campo de apellido
        this.postalCodeField = page.locator('[data-test="postalCode"]'); // Campo de código postal
        this.continueButton = page.locator('[data-test="continue"]'); // Botón de Continuar
        this.cancelButton = page.locator('[data-test="cancel"]'); // Botón de Cancelar
        this.errorMessage = page.locator('[data-test="error"]'); // Mensaje de error
    }

    // Verifica si el título de la página del paso uno del checkout es visible.
    async isCheckoutStepOnePageLoaded() {
        return await this.checkoutTitle.isVisible();
    }

    // Rellena la información del cliente.
    async fillYourInformation(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    // Haz clic en el botón de Continuar.
    async continueToNextStep() {
        await this.continueButton.click();
    }

    // Haz clic en el botón de Cancelar.
    async cancelCheckout() {
        await this.cancelButton.click();
    }

    // Obtiene el texto del mensaje de error.
    async getErrorMessageText() {
        return await this.errorMessage.textContent();
    }
}

// Exporta la clase CheckoutStepOnePage.
module.exports = CheckoutStepOnePage;
