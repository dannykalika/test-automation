import * as Main from "../page-objects/main";
import Page from "../page-objects/page";
import { expect as expectChai } from "chai";

describe("UI Testing Playground", () => {
  describe("Scenario: AJAX request", () => {
    before(async () => {
      await Main.open("/ajax");
      await browser.setupInterceptor();
    });
    describe("Given: the user is on a page where AJAX requests are needed", () => {
      describe("When: the user triggers an AJAX request on the page", () => {
        it("Then: the page should be updated with needed content upon completion of the request", async () => {
          const btn = await $("#ajaxButton");
          const requestData = await Page.bgSuccess;
          await btn.waitForClickable();
          await expect(requestData).not.toBeExisting();
          await btn.click();
          // eslint-disable-next-line wdio/no-pause
          await browser.pause(2000);
          await expectChai(await browser.hasPendingRequests()).to.be.true;
          await browser.waitUntil(
            async function () {
              return (await browser.hasPendingRequests()) === false;
            },
            {
              timeout: 20000,
              timeoutMsg: "page still waiting for AJAX requests to complete",
            },
          );
          await expectChai(await browser.hasPendingRequests()).to.be.false;
          await expect(requestData).toBeDisplayed();
        });
      });
    });
  });
});
