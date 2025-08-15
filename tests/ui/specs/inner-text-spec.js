import * as Main from '../page-objects/main';
import { expect as expectChai } from 'chai';

describe('UI Testing Playground', () => {
    describe('Scenario: Inner Text', () => {
        before(async () => {
            await Main.open('/verifytext');
        });
        describe('Given: the user is on a page where there is inner text', () => {
            describe('When: the user wants to validate the inner text of an element', () => {
                it('Then: the user should be able to validate the inner text by getting the text', async () => {
                    const elem = await $('div.bg-primary');
                    await elem.waitForExist();
                    const text = await elem.getText();
                    await expectChai(text).to.equal('Welcome UserName!');
                });
                it('Then: the XPATH selector strategy can be used to validate the inner text', async () => {
                    const elem = await browser.$(
                        '//div/span[normalize-space(.)=\'Welcome UserName!\']',
                    );
                    await elem.waitForExist();
                    await expect(elem).toBeExisting();
                });
            });
        });
    });
});
