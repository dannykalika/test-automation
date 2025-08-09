### What am I testing?

I am generating a small ramping load test (up to 300 iterations) against https://quickpizza.grafana.com,
which is a shared testing environment. Specifically, we're generating a load
against the login endpoint with the following thresholds:

- Response body length should be at least 10 characters
- Should more than 5% of response status be 4XX or 5XX, the test run will abort
- 95% of requests should be below 200 ms

### What am I using?

This load test uses k6.io, a load testing tool where tests can be written
in JavaScript. However, k6 is not built upon Node.js.

### How to run

- [Install k6](https://grafana.com/docs/k6/latest/set-up/install-k6/)
- export credentials for https://quickpizza.grafana.com/login
  - `export USER_NAME="yourusername"`
  - `export PASSWORD="yourpassword"`
- `npm run test:load`
