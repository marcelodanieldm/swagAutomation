// pages/loginPage.js

// Definición de la clase LoginPage
class LoginPage {
    // Constructor que inicializa la página y los localizadores de elementos.
    // 'page' es la instancia de Page de Playwright.
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#user-name'); // Campo de nombre de usuario
        this.passwordField = page.locator('#password'); // Campo de contraseña
        this.loginButton = page.locator('#login-button'); // Botón de inicio de sesión
        this.errorMessage = page.locator('[data-test="error"]'); // Mensaje de error
    }

    // Navega a la URL de la página de inicio de sesión.
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Realiza una operación de inicio de sesión con el nombre de usuario y la contraseña proporcionados.
    async login(username, password) {
        await this.usernameField.fill(username); // Rellena el campo de usuario
        await this.passwordField.fill(password); // Rellena el campo de contraseña
        await this.loginButton.click(); // Haz clic en el botón de iniciar sesión
    }

    // Obtiene el texto del mensaje de error, si está visible.
    async getErrorMessageText() {
        return await this.errorMessage.textContent();
    }

    // Verifica si el mensaje de error es visible.
    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }
}

// Exporta la clase LoginPage para que pueda ser utilizada en otros archivos.
module.exports = LoginPage;
