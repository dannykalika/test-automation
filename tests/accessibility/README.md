## Accessibility Tests

### What am I testing?

These tests are designed to assert that any set of given
HTML pages conform to the WCAG rules. The list of rules enforced can be found [here](https://github.com/dequelabs/axe-core/blob/HEAD/doc/rule-descriptions.md).

The websites that I am validating in my example are:

- https://www.wikipedia.org/
- https://www.mta.info/
- https://rnid.org.uk/

### What am I using?

I am using axe-core - an accessibility testing engine, in tandem with webdriverio.

### How to run

- `npm install`
- `npm run test:a11y`
