import { browser } from '@wdio/globals';
import { expect } from 'chai';
import AxeBuilder from '@axe-core/webdriverio';
import fs from 'fs';
import 'dotenv/config';

const fileContent = fs.readFileSync('./tests/accessibility/pages.json', 'utf8');
const pages = JSON.parse(fileContent);

describe('Accessibility Test', () => {
    pages.forEach((data) => {
        describe(`Page: ${data.url}`, function () {
            it(' should conform to WCAG rules', async () => {
                const builder = new AxeBuilder({ client: browser });
                await browser.url(data.url);
                const result = await builder.analyze();
                if (result.incomplete.length > 0) {
                    for (const item of result.incomplete) {
                        for (const node of item.nodes) {
                            console.warn(
                                `Manual review recommended for ${data.url} - ${node.html} - ${node.failureSummary} \n`,
                            );
                        }
                    }
                }
                await expect(result.violations).to.be.empty;
            });
        });
    });
});
