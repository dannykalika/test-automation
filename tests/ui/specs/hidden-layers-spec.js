import * as Main from "../page-objects/main";
import { expect as expectChai } from "chai";

describe("UI Testing Playground", () => {
  describe("Scenario: Hidden layers", () => {
    before(async () => {
      await Main.open("/hiddenlayers");
    });
    describe("Given: the user is on a page where elements are cached", () => {
      describe("When: the user wants to interact with a cached element", () => {
        it("Then: the state of the element should persist", async () => {
          const greenBtn = await $("#greenButton");
          const blueBtn = await $("#blueButton");
          await greenBtn.waitForClickable();
          await expect(greenBtn).toBeClickable();
          await expectChai(await blueBtn.isDisplayed()).to.be.false;
          await greenBtn.click();
          await greenBtn.waitForClickable({ reverse: true });
          await expect(greenBtn).not.toBeClickable();
          await expect(blueBtn).toBeClickable();
          await expectChai(await blueBtn.isDisplayed()).to.be.true;
        });
      });
    });
  });
});
