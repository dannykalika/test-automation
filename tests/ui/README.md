## UI Tests

### What am I testing?

These tests leverage the pages within [UI testing playground](http://uitestingplayground.com/)
which offers examples of differing functionality you may come across on webapps.
The tests are not necessarily testing the UI testing playground itself but
instead showcasing what we can achieve with automation.

### What am I using?

The automation framework used for running these UI tests is WebdriverIO.
Test cases are created using Mocha, paired with chaijs for extended assertions.
Each test case is written in gherkin syntax to help with readability
and consistency.

### How to run

You must define environment variables in a `.env` file or otherwise.
The variables needed are `TEST_URL`, `USERNAME` and `PASSWORD`.
The `TEST_URL` should be "http://uitestingplayground.com" and you can feel free to use
"tester" and "pwd" respectively or whatever you prefer for the `USERNAME` and `PASSWORD`.

- `npm install`
- `npm run test:ui`
