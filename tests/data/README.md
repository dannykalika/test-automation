## Database Tests

### What am I testing?

These tests do some checks against RNAcentral data records.

    RNAcentral is a free, public resource that offers integrated
    access to a comprehensive and up-to-date set of non-coding RNA
    sequences provided by a collaborating group of Expert Databases
    representing a broad range of organisms and RNA types.

RNAcentral provides a public Postgres database.

### What am I using?

I am using node-postgres, a PostgreSQL client for Node.js.

### How to run

You must define environment variables in a `.env` file or otherwise.
The variables needed are:

    DB="pfmegrnargs"
    DB_HOST="hh-pgsql-public.ebi.ac.uk"
    DB_USER=""
    DB_PASSWORD=""
    DB_PORT="5432"

Please find the credentials for the public database in the RNAcentral docs

- `npm install`
- `npm run test:data`
