import * as Main from "../page-objects/main";
import VisibilityPage from "../page-objects/visibility-page";

describe("UI Testing Playground", () => {
  describe("Scenario: Visibility", () => {
    before(async () => {
      await Main.open("/visibility");
    });
    describe("Given: the user is on a page where elements are expected to be visible", () => {
      describe("When: the user wants to click a specific element", () => {
        it("Then: the user should be able to click rendered elements", async () => {
          await VisibilityPage.hideBtn.waitForDisplayed();
          await expect(VisibilityPage.hideBtn).toBeClickable();
        });
        it("Then: the user should be able to click an element with width", async () => {
          await expect(VisibilityPage.zeroWidthBtn).toBeClickable();
        });
        it("Then: the user should be able to click an element that is not overlapped", async () => {
          await expect(VisibilityPage.overlapBtn).toBeClickable();
        });
        it("Then: the user should be able to click an element with opacity", async () => {
          await expect(VisibilityPage.transparentBtn).toBeClickable();
        });
        it("Then: the user should be able to click an element with visibility", async () => {
          await expect(VisibilityPage.invisibleBtn).toBeClickable();
        });
        it("Then: the user should be able to click an element with a display value", async () => {
          await expect(VisibilityPage.noDisplayBtn).toBeClickable();
        });
        it("Then: the user should be able to click an element that is on screen", async () => {
          await expect(VisibilityPage.offscreenBtn).toBeClickable();
        });
        it("Then: the user should not be able to click an element with zero width", async () => {
          await VisibilityPage.hideBtn.click();
          await expect(VisibilityPage.zeroWidthBtn).not.toBeClickable();
        });
        it("Then: the user should not be able to click an element that is overlapped", async () => {
          await expect(VisibilityPage.overlapBtn).not.toBeClickable();
        });
        it("Then: the user should not be able to click an element with 0 opacity", async () => {
          await expect(VisibilityPage.transparentBtn).not.toBeClickable();
        });
        it("Then: the user should not be able to click an element with hidden visibility", async () => {
          await expect(VisibilityPage.invisibleBtn).not.toBeClickable();
        });
        it("Then: the user should not be able to click an element with display none", async () => {
          await expect(VisibilityPage.noDisplayBtn).not.toBeClickable();
        });
        it("Then: the user should not be able to click an element that is offscreen", async () => {
          await expect(VisibilityPage.offscreenBtn).not.toBeClickable();
        });
      });
    });
  });
});
