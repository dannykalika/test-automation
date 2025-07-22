import * as Main from "../page-objects/main";
import Page from "../page-objects/page";

describe("UI Testing Playground", () => {
  describe("Scenario: Disabled Input", () => {
    before(async () => {
      await Main.open("/disabledinput");
    });
    describe("Given: the user is on a page where inputs can be disabled", () => {
      describe("When: the user wants to interact with a disabled input", () => {
        it("Then: the user should wait for the disabled element to become enabled", async () => {
          const input = await $("#inputField");
          await input.waitForDisplayed();
          await Page.button.waitForClickable();
          await Page.button.click();
          await input.waitForEnabled({ reverse: true });
          await expect(input).not.toBeEnabled();
          await input.waitForEnabled();
          await expect(input).toBeEnabled();
        });
      });
    });
  });
});
