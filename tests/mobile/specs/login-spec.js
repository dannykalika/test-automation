import LoginPage from "../pages/login-page.js";

describe("SauceLabs Demo App", () => {
  describe("Scenario: Login", () => {
    describe("Given: the user is on a login page", () => {
      describe("When: the user enters invalid credentials", () => {
        it("Then: an error message should be shown", async () => {
          const menuButton = await $("~open menu");
          await menuButton.waitForDisplayed({ timeout: 10000 });
          await menuButton.click();
          const loginMenuItem = await $("~menu item log in");
          await loginMenuItem.waitForDisplayed({ timeout: 5000 });
          await loginMenuItem.click();
          await LoginPage.login("locked_out_user", "wrong_password");
          const errorText = await LoginPage.getErrorMessageText();
          expect(errorText).toContain("Provided credentials do not match");
        });
      });
    });
  });
});
