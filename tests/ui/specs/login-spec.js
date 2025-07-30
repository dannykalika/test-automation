import * as Main from "../page-objects/main";
import LoginPage from "../page-objects/login-page";

describe("UI Testing Playground", () => {
  describe("Scenario: Login", () => {
    before(async () => {
      await Main.open("/sampleapp");
    });
    describe("Given: the user is on a login page", () => {
      describe("When: the user enters valid credentials", () => {
        // hardcoded credentials as they are not sensitive for this sample app
        const userName = process.env.USERNAME || "tester";
        const password = process.env.PASSWORD || "pwd";
        it("Then: the user should be logged in", async () => {
          await LoginPage.userNameField.waitForDisplayed();
          await LoginPage.userNameField.setValue(userName);
          await LoginPage.passwordField.setValue(password);
          await LoginPage.loginButton.click();
          await LoginPage.successMessage.waitForDisplayed();
          await expect(LoginPage.successMessage).toBeDisplayed();
        });
      });
    });
    describe("Given: the user is logged in", () => {
      describe("When: the user wants to logout", async () => {
        it("Then: the user should be able to click the logout button to log off", async () => {
          await LoginPage.loginButton.click();
          await LoginPage.infoMessage.waitForDisplayed();
          await expect(LoginPage.infoMessage).toHaveText("User logged out.");
        });
      });
    });
    // there are few negative scenarios as the sample app is very simple and takes any character
    describe("Given: the user is not logged in", () => {
      describe("When: the user enters invalid credentials", () => {
        it("Then: the user should not be logged in", async () => {
          const userName = "";
          const password = "";
          await LoginPage.userNameField.setValue(userName);
          await LoginPage.passwordField.setValue(password);
          await LoginPage.loginButton.click();
          await LoginPage.errorMessage.waitForDisplayed();
          await expect(LoginPage.errorMessage).toHaveText(
            "Invalid username/password",
          );
        });
      });
    });
  });
});
