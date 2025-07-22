import * as Main from "../page-objects/main";

describe("UI Testing Playground", () => {
  describe("Scenario: Overlapped elements", () => {
    before(async () => {
      await Main.open("/overlapped");
    });
    describe("Given: the user is on a page where an element is overlapped", () => {
      describe("When: the user brings the overlapped element into view", () => {
        it("Then: the user should be able to interact with the element", async () => {
          const nameInputField = await $("input#name");
          await nameInputField.scrollIntoView();
          await nameInputField.addValue("Test");
          await expect(nameInputField).toHaveValue("Test");
        });
      });
    });
  });
});
