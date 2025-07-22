import * as Main from "../page-objects/main";

describe("UI Testing Playground", () => {
  describe("Scenario: Non-Breaking space", () => {
    before(async () => {
      await Main.open("/nbsp");
    });
    describe("Given: the user is on a page where non-breaking space is used", () => {
      describe("When: the user wants to reference an element using nbsp", () => {
        it("Then: the XPATH selector strategy can be used to reference the element", async () => {
          const element = await browser.$('//button[text()="My\u00a0Button"]');
          await expect(element).toBeClickable();
          await expect(element).toBeDisplayed();
        });
      });
    });
  });
});
