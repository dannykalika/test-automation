import * as Main from "../page-objects/main";
import { expect as expectChai } from "chai";

describe("UI Testing Playground", () => {
  describe("Scenario: Progress bar", () => {
    before(async () => {
      await Main.open("/progressbar");
    });
    describe("Given: the user is on a page where there is a progress bar", () => {
      describe("When: the user triggers the progress bar to be active", () => {
        it("Then: the user should be able to act in accordance to the progress bar data", async () => {
          const progressBar = $("#progressBar");
          const startButton = $("#startButton");
          const stopButton = $("#stopButton");
          await startButton.waitForClickable();
          await expect(startButton).toBeClickable();
          await expect(stopButton).toBeClickable();
          await expect(progressBar).toBeDisplayed();
          await startButton.click();
          await progressBar.waitUntil(
            async function () {
              return parseFloat(await this.getText()) >= 75;
            },
            {
              timeout: 30000,
              timeoutMsg: `progress percentage was ${parseFloat(await progressBar.getText())}`,
            },
          );
          await stopButton.click();
          await expectChai(
            parseFloat(await progressBar.getText()),
          ).to.be.greaterThanOrEqual(75);
        });
      });
    });
  });
});
