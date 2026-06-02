## Mobile Tests

### What am I testing?

These tests are against the SauceLabs demo mobile app.

### What am I using?

Android Studio is used to create and manage Android emulators.
Appium is used as the automation framework for running these mobile tests.
Test cases are created using Mocha, paired with chaijs for extended assertions. Each test case is written in gherkin syntax to help with readability and consistency.

### Setup

- Install Android Studio
- Set Android SDK Paths for Appium Automation

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

- Install an Android Emulator
- List available emulators
  - `emulator -list-avds`
- Launch emulator
  - `emulator -avd <emulator_name>`
- Install Node Dependencies
  - `npm install`
- Install uiautomator2 driver for Appium
  - `npx appium driver install uiautomator2`

### How to run

- Run Tests
  - `npm run test:android`
