## API Tests

### What am I testing?

These tests are designed to validate some of the reqres.in endpoints.
Reqres.in is a free public API that anyone can get an API key for.

### What am I using?

This project is purely using NodeJS/Javascript.
I am leveraging the superagent request library to simplify requests and assertions.
Ajv is used to check response bodies against assumed schemas, this approach helps to
validate returned data by following a standard(schema) without additional test code in each test case.
Test cases are created using Mocha, paired with chaijs & chai-superagent for extended assertions.
Each test case is written in gherkin syntax to help with readability
and consistency.

### How to run

You must define environment variables in a `.env` file or otherwise.
The variables needed are `TEST_URL` and `API_KEY`.
The `TEST_URL` should be "https://reqres.in/api" and while the `API_KEY` is free
and not sensitive in nature - I request you obtain it from reqres.in.

- `npm install`
- `npm run test:api`
