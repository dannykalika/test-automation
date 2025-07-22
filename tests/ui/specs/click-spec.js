import * as Main from "../page-objects/main";

describe("UI Testing Playground", () => {
  describe("Scenario: Click", () => {
    before(async () => {
      await Main.open("/click");
    });
    describe("Given: the user is on a page where event based clicks do not work", () => {
      describe("When: the user does a physical mouse click", () => {
        it("Then: the page should register the mouse click", async () => {
          const btn = await $("#badButton");
          await btn.waitForClickable();
          await btn.click();
          const updatedBtn = await $("button.btn.btn-success");
          await expect(updatedBtn).toBeDisplayed();
        });
      });
    });
  });
});
