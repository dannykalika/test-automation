import * as Main from "../page-objects/main";
import Page from "../page-objects/page";

describe("UI Testing Playground", () => {
  describe("Scenario: Class attribute", () => {
    before(async () => {
      await Main.open("/classattr");
    });
    describe("Given: the user is on a page where elements are using classes", () => {
      describe("When: the user wants to interact with a specific element", () => {
        it("Then: the unique class should be used", async () => {
          const button = await Page.button;
          await expect(button).toBeExisting();
        });
      });
    });
  });
});
