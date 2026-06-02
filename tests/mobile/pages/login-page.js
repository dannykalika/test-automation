class MobileLoginPage {
  // Define element selectors using stable accessibility IDs
  get usernameInput() {
    return $("~Username input field");
  }
  get passwordInput() {
    return $("~Password input field");
  }
  get loginButton() {
    return $("~Login button");
  }

  async login(username, password) {
    await this.usernameInput.waitForDisplayed({ timeout: 10000 });
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async getErrorMessageText() {
    const errorText = await browser.$(
      '//*[@text="Provided credentials do not match any user in this service."]',
    );
    await errorText.waitForDisplayed({ timeout: 5000 });
    return await errorText.getText();
  }
}

export default new MobileLoginPage();
