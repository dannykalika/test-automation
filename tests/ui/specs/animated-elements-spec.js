import * as Main from "../page-objects/main";

describe("UI Testing Playground", () => {
  describe("Scenario: Animated elements", () => {
    before(async () => {
      await Main.open("/animation");
    });
    describe("Given: the user is on a page where elements can become animated", () => {
      describe("When: an element is animated", () => {
        it("Then: the user should wait for the animation to complete", async () => {
          const startBtn = await $("#animationButton");
          const animatedElement = await $("#movingTarget");
          await startBtn.waitForClickable();
          await startBtn.click();
          await expect(animatedElement).toHaveElementClass("spin");
          await animatedElement.waitForStable();
          await expect(animatedElement).not.toHaveElementClass("spin");
        });
      });
    });
  });
});
