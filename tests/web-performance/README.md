### What am I testing?

I am checking the web performances of the following URLs:

    https://www.bing.com
    https://www.google.com
    https://www.wikipedia.com

these URLs are defined in the [urls.txt](./urls.txt) file.

Each URL is using headless Chrome and will be processed five times to generate median scores,
and is expected to pass all metrics defined in the [budget.json](./budget.json) file.

### What am I using?

The [performance script](performance-check.sh), leverages sitespeed.io, a
web performance tool.

### How to run

- `npm install`
- `npm run sitespeed`
