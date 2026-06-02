export const config = {
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    runner: 'local',

    specs: [
        './tests/mobile/specs/*-spec.js'
    ],
    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android_Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.saucelabs.mydemoapp.rn',
        'appium:appActivity': 'com.saucelabs.mydemoapp.rn.MainActivity',
        'appium:app': './tests/mobile/com.saucelabs.mydemoapp.rn.apk',
        'appium:autoAcceptAlerts': true,
        'appium:noReset': false,
        'appium:fullReset': false
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Declare the Appium service so WDIO manages server lifecycles automatically
    services: [['appium', {
        command: 'appium',
        args: {
            address: '127.0.0.1', // Switched from localhost to 127.0.0.1
            port: 4723,
            basePath: '/'         // Added to align with path: '/' above
        }
    }]]
};