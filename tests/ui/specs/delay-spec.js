import * as Main from '../page-objects/main';
import Page from '../page-objects/page';
import page from '../page-objects/page';

describe('UI Testing Playground', () => {
    describe('Scenario: Delay', () => {
        before(async () => {
            await Main.open('/clientdelay');
        });
        describe('Given: the user is on a page where JavaScript processing on client side happens', () => {
            describe('When: the user triggers client side logic', () => {
                it('Then: the page should wait for the logic to be processed', async () => {
                    const btn = await Page.button;
                    const newElement = await page.bgSuccess;
                    await btn.waitForClickable();
                    await expect(newElement).not.toBeExisting();
                    await btn.click();
                    await newElement.waitForDisplayed({ timeout: 17000 });
                    await expect(newElement).toBeDisplayed();
                });
            });
        });
    });
});
