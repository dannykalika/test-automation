import * as Main from '../page-objects/main';

describe('UI Testing Playground', () => {
    describe('Scenario: Text Input', () => {
        before(async () => {
            await Main.open('/textinput');
        });
        describe('Given: the user is on a page where sending text via DOM events do not work', () => {
            describe('When: the user emulates real keyboard input', () => {
                it('Then: the input should be applied to the application', async () => {
                    const btn = await $('#newButtonName');
                    await btn.waitForExist();
                    const text = 'adding input text to element';
                    await btn.addValue(text);
                    const updatingBtn = await $('#updatingButton');
                    await updatingBtn.click();
                    await expect(updatingBtn).toHaveText(text);
                });
            });
        });
    });
});
