import * as Main from '../page-objects/main';

describe('UI Testing Playground', () => {
    describe('Scenario: Stale elements', () => {
        before(async () => {
            await Main.open('/mouseover');
        });
        describe('Given: the user is on a page where elements become stale', () => {
            describe('When: the user wants to reference an updated element', () => {
                it('Then: the XPATH selector strategy can be used to reference the element', async () => {
                    const element = await browser.$(
                        '//a[@onmouseenter="linkActive(this)"]',
                    );
                    const clickCount = $('#clickCount');
                    await element.waitForClickable();
                    await expect(clickCount).toHaveText('0');
                    await element.doubleClick();
                    await expect(clickCount).toHaveText('2');
                });
            });
        });
    });
});
