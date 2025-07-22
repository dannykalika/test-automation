import * as Main from "../page-objects/main";
import { expect as expectChai } from "chai";

describe("UI Testing Playground", () => {
  describe("Scenario: Dynamic table", () => {
    before(async () => {
      await Main.open("/dynamictable");
    });
    describe("Given: the user is on a page with a dynamic table", () => {
      describe("When: the user wants to validate a specific set of data within the table", () => {
        it("Then: the XPATH selector strategy can be used to get the data", async () => {
          const tableElement = await browser.$(
            '//span[contains(text(), "Chrome")]/following-sibling::span[contains(text(), "%")]',
          );
          const comparingElement = await browser.$("p.bg-warning");
          const tableText = await tableElement.getText();
          await expectChai(await comparingElement.getText()).includes(
            tableText,
          );
        });
      });
    });
  });
});
