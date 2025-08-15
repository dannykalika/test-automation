import * as Main from '../page-objects/main';

describe('UI Testing Playground', () => {
    describe('Scenario: Dynamic ID', () => {
        before(async () => {
            await Main.open('/dynamicid');
        });
        describe('Given: the user is on a page with dynamic ID elements', () => {
            describe('When: the user wants to interact with Dynamic ID elements', () => {
                it('Then: the XPATH selector strategy can be used', async () => {
                    const button = await browser.$(
                        '//button[@class="btn btn-primary" and @type="button"]',
                    );
                    await button.waitForClickable();
                    await expect(button).toBeClickable();
                });
                it('Then: the XPATH selector strategy with text can be used', async () => {
                    const button = await browser.$(
                        '//button[.="Button with Dynamic ID"]',
                    );
                    await expect(button).toBeClickable();
                });
            });
        });
    });
});
