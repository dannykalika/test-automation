import "dotenv/config";

export const config = {
  runner: "local",
  specs: ["./validate-spec.js"],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless=new",
          "--disable-gpu",
          "--window-size=1920,1080",
          "--no-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
    },
  ],
  logLevel: "error",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
};
