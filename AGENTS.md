# AGENTS.md

## Quick Start

- **Type**: Node.js test automation framework
- **Entry scripts**: `npm run test:ui`, `npm run test:api`, `npm run test:a11y`, `npm run test:android`, `npm run test:load`, `npm run test:data`
- **Config files**: Root `.env` required with `TEST_URL`, `USERNAME`, `PASSWORD`, `API_KEY`
- **Package manager**: npm with ES6 module support (`"type": "module"` in package.json)

## Architecture Overview

This is a **multi-framework test automation project** showcasing 7 distinct testing approaches:

### Test Types & Their Patterns

1. **UI Tests** (`tests/ui/`) - WebdriverIO + Mocha + Chai
   - **Configuration**: `wdio.conf.mjs` (main config)
   - **Page Object Model**: Base `Page` class in `page-objects/page.js`, pages inherit and extend
   - **Test structure**: Gherkin-style (Given-When-Then) in nested `describe` blocks
   - **Navigation**: `tests/ui/page-objects/main.js` handles `browser.url()` with TEST_URL env var
   - Example: `tests/ui/specs/login-spec.js` shows pattern - import page objects, use in tests

2. **API Tests** (`tests/api/`) - Superagent + Mocha + Chai + AJV schema validation
   - **Configuration**: `api.mocharc.cjs` (parallel: true for faster execution)
   - **Request layer**: `tests/api/requests.js` centralizes all HTTP calls and validation
   - **Schema validation**: `tests/api/validation.js` pre-loads all JSON schemas, validates responses
   - **Pattern**: Each request function catches errors, validates response against schema, returns response
   - Add new schemas → import in `validation.js`, register with `ajv.addSchema()`

3. **Accessibility Tests** (`tests/accessibility/`) - Axe-core + WebdriverIO
   - **Separate config**: `a11y.wdio.conf.js` (not in main wdio.conf.mjs)
   - **Validator**: Uses `AxeBuilder` from `@axe-core/webdriverio`

4. **Load Tests** (`tests/load/`) - K6 (not Node.js)
   - **Runner**: `k6 run` (separate from npm scripts)
   - **Environment**: Uses `__ENV` variable (K6-native)

5. **Database Tests** (`tests/data/`) - Mocha + pg (PostgreSQL)
   - **Configuration**: `data.mocharc.cjs`

6. **Web Performance** (`tests/web-performance/`) - bash script + sitespeed.io

7. **Mobile Tests** (`tests/mobile/`) - WebdriverIO + Appium + Mocha
   - **Configuration**: `mobile.wdio.conf.mjs` (separate config, managed by wdio-appium-service)
   - **Framework**: Appium with UiAutomator2 driver for Android
   - **Page Object Model**: Same singleton pattern as UI tests, `MobileLoginPage` extends no base (Android-specific selectors)
   - **Test structure**: Gherkin-style (Given-When-Then) in nested `describe` blocks
   - **Selector syntax**: App accessibility IDs using `~` prefix (e.g., `$('~Username input field')`), XPath for complex queries
   - **Setup**: Requires Android Studio emulator, Appium running on localhost:4723
   - **Dependencies**: `appium`, `appium-uiautomator2-driver`, `@wdio/appium-service`

## Code Quality & Conventions

### Linting & Formatting

- **ESLint config**: `eslint.config.mjs` (flat config format, NOT .eslintrc)
- **WDIO plugin**: `eslint-plugin-wdio` automatically catches WebdriverIO best practices
- **Pre-commit hooks**: `husky` + `lint-staged` run eslint --fix + prettier before commits
- **Custom rules**: `eqeqeq: 2` (strict equality), `prefer-const`, no-unused-vars
- **WDIO globals**: Automatically available in tests (browser, $, $$, describe, it, etc.)

### Commit Convention

- Use conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:` (enforced by commitlint)
- `commitlint.config.mjs` references `@commitlint/config-conventional`

## Key Workflows

### Running Tests

```bash
npm run test:ui      # WebdriverIO UI tests (headless Chrome)
npm run test:api     # API tests with schema validation (parallel)
npm run test:a11y    # Accessibility tests
npm run test:android # Appium mobile tests (Android emulator)
npm run test:load    # K6 load tests
npm run test:data    # Database tests
npm run wdio         # Direct WebdriverIO (bypasses npm script)
npm run allure       # Generate & open Allure report
npm run sitespeed    # Web performance check
```

### Test Execution Details

- **UI Tests**: 10 parallel instances (maxInstances in wdio.conf.mjs), 60s timeout per test
- **Mobile Tests**: 1 instance only (single emulator, maxInstances in mobile.wdio.conf.mjs), 60s timeout, requires Appium server running
- **API Tests**: Parallel execution enabled, 5s timeout, 1s slow threshold
- **Allure reporting**: Automatically collected for WebdriverIO tests in `allure-results/`

## Required Environment Variables

Create `.env` file in project root:

```
TEST_URL=http://uitestingplayground.com  # For UI tests
USERNAME=tester                           # For UI login tests
PASSWORD=pwd                              # For UI login tests
API_KEY=<your-api-key>                   # From reqres.in for API tests
TEST_URL=https://reqres.in/api           # For API tests (overwrites above or use different var)
```

**Note**: Some tests hardcode defaults if env vars missing (see `process.env.USERNAME || "tester"` pattern)

## Test File Organization

### UI Tests - Structural Pattern

- **Base class**: `Page` with common selectors (`.button`, `.bgSuccess`)
- **Inheritance**: `LoginPage extends Page` adds specific selectors as getters
- **Instantiation**: Pages exported as singletons: `export default new LoginPage()`
- **Selector syntax**: Mix of CSS (`.userNameField`) and XPath (`//input[@name="UserName"]`)
- **Browser globals**: `$()` and `browser.$()` both available (WDIO globals)

### API Tests - Structural Pattern

- **Centralized requests**: All HTTP calls in `requests.js` with error handling
- **Schema validation inline**: Each request function calls `validate(schemaName, body)`
- **JSON schema storage**: `tests/api/schema/*` contains AJV schemas
- **Error handling pattern**: Catch block returns `error.response` if exists, throws otherwise
- **Test pattern**: Call request function, assert on status + response body properties

## Integration Points & External Dependencies

### External Services

- **UI tests**: http://uitestingplayground.com (public testing playground)
- **API tests**: https://reqres.in/api (free mock API, requires free API key)
- **Accessibility tests**: Real websites (Wikipedia, MTA, RNID) - these serve as test subjects

### Browser Automation

- **Driver**: Chrome only (headless mode, no-sandbox for CI)
- **Services**: `wdio-intercept-service` for request interception, `wdio-wait-for` for custom waits
- **Reporter**: Allure reporter configured for detailed HTML reports

### Database Testing

- **Driver**: PostgreSQL via `pg` package
- **Connection**: Likely configured via env vars (check `tests/data/rnacentral-spec.js`)

### Mobile Testing

- **Framework**: Appium with UiAutomator2 driver for Android
- **Service**: `@wdio/appium-service` manages Appium server lifecycle
- **Emulator**: Android Studio emulator required, launched before test execution
- **Connection**: Appium server runs on `127.0.0.1:4723` (localhost unavailable on some systems)
- **App**: SauceLabs demo APK (`tests/mobile/com.saucelabs.mydemoapp.rn.apk`) includes pre-configured test credentials
- **Selectors**: Accessibility IDs (`~element-id`) used for stability, XPath as fallback

## When Adding New Tests

### UI Test Checklist

1. Create `tests/ui/specs/<feature>-spec.js`
2. Create page object in `tests/ui/page-objects/<feature>-page.js` extending `Page`
3. Import page object in spec file
4. Structure with nested describes (Given-When-Then)
5. Use `waitForDisplayed()` before assertions (WebdriverIO best practice)

### API Test Checklist

1. Add request function to `tests/api/requests.js` (follow error handling pattern)
2. Add JSON schema to `tests/api/schema/` if needed
3. Register schema in `tests/api/validation.js` with `ajv.addSchema()`
4. Create spec in `tests/api/specs/<resource>-spec.js`
5. Use `Requests.<functionName>()` to call endpoints
6. Assert both status codes and response body schema

### Accessibility Test Checklist

1. Update URLs in `tests/accessibility/a11y.wdio.conf.js` (separate config file)
2. Use `new AxeBuilder(browser).analyze()` pattern
3. Run with `npm run test:a11y` (uses accessibility-specific config)

### Mobile Test Checklist

1. Create `tests/mobile/specs/<feature>-spec.js`
2. Create page object in `tests/mobile/pages/<feature>-page.js` using singleton pattern
3. Import page object in spec file
4. Structure with nested describes (Given-When-Then)
5. Use app accessibility IDs with `~` prefix (e.g., `$('~element id')`) for stable selectors
6. Use XPath for complex queries or elements without accessibility IDs
7. Include `waitForDisplayed({ timeout: 10000 })` before assertions
8. Ensure Android emulator is running: `emulator -avd <emulator_name>`
9. Appium server must be running on `127.0.0.1:4723` (started automatically by wdio-appium-service)

## Critical Files Not To Miss

| File                      | Purpose                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `wdio.conf.mjs`           | Main WebdriverIO config - 315 lines, defines capabilities, timeouts, hooks, reporters |
| `mobile.wdio.conf.mjs`    | Mobile WebdriverIO config - Appium service, Android emulator setup, maxInstances: 1   |
| `tests/api/requests.js`   | All HTTP request abstractions with validation - must update when adding API endpoints |
| `tests/api/validation.js` | AJV schema registry - must register schemas here before validation calls              |
| `.env`                    | Runtime configuration - local only, never commit                                      |
| `eslint.config.mjs`       | Flat config format - NOT .eslintrc, ESLint 8.0+ syntax                                |
| `package.json`            | ES6 modules enabled (`"type": "module"`) - affects import syntax                      |

## Common Debugging Patterns

- **WDIO failures**: Check `allure-results/` for screenshots/video
- **API schema errors**: Add `console.log(validate.errors)` in `requests.js` validation function
- **Test timeouts**: UI tests default 60s (mochaOpts.timeout), API tests 5s (mocharc)
- **Environment config**: Verify `.env` file exists and is in `.gitignore`
- **Port/URL issues**: Ensure TEST_URL env var matches actual service URL

## File Modification Safety

- ✅ **Add new test specs** - `tests/*/specs/*` (safe to add, linted automatically)
- ✅ **Add page objects** - `tests/ui/page-objects/*` (follow inheritance pattern)
- ✅ **Add mobile page objects** - `tests/mobile/pages/*` (follow singleton pattern with accessibility IDs)
- ✅ **Add API schemas** - `tests/api/schema/*.json` (register in validation.js)
- ⚠️ **Modify `requests.js`** - Central to API tests, validate error handling
- ⚠️ **Modify `wdio.conf.mjs`** - Affects all UI tests, understand hook system
- ⚠️ **Modify `mobile.wdio.conf.mjs`** - Affects mobile tests, Appium service configuration critical
- ⚠️ **Modify config files** - Changes affect all test execution
