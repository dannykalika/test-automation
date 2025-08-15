import * as Main from '../page-objects/main';
import { expect as expectChai } from 'chai';

describe('UI Testing Playground', () => {
    describe('Scenario: Shadom DOM', () => {
        before(async () => {
            await Main.open('/shadowdom');
        });
        describe('Given: the user is on a page where shadow DOM is used', () => {
            it('Then: the user should be able to interact with the shadow DOM elements', async () => {
                const guidField = $('guid-generator').shadow$('#editField');
                const generateButton = $('guid-generator').shadow$('#buttonGenerate');
                await expect(generateButton).toBeClickable();
                await generateButton.click();
                const fieldText = await guidField.getValue();
                await expectChai(fieldText).to.be.a('string');
            });
        });
    });
});
