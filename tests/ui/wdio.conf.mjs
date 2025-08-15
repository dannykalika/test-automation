import 'dotenv/config';
import { mainConfig } from '../../main.wdio.conf.mjs';

export const config = {
    ...mainConfig,
    runner: 'local',
    specs: ['./specs/**/*-spec.js'],
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless=new',
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                ],
            },
        },
    ],
    services: ['intercept'],
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true
            },
        ],
    ],
};
