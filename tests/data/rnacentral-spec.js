import pkg from 'pg';
import { expect } from 'chai';
import 'dotenv/config';

const { Pool } = pkg;

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
};

const pool = new Pool(dbConfig);

describe('RNAcentral Database', () => {
    let client;
    before(async () => {
        client = await pool.connect();
    });
    after(async () => {
        await client.release();
        await pool.end();
    });
    it('should retrieve two specific RNA records', async () => {
        const ac1 = 'OTTHUMT00000106564.1';
        const ac2 = 'OTTHUMT00000416802.1';
        const result = await client.query(
            `SELECT upi,taxid, ac FROM xref WHERE ac IN ('${ac1}', '${ac2}')`,
        );
        expect(result.rows).to.have.lengthOf(2);
        expect(result.rows[0].upi).to.equal('URS00000B15DA');
        expect(result.rows[0].taxid).to.equal('9606');
        expect(result.rows[0].ac).to.equal(ac1);
        expect(result.rows[1].upi).to.equal('URS00000A54A6');
        expect(result.rows[1].taxid).to.equal('9606');
        expect(result.rows[1].ac).to.equal(ac2);
    });
    it('should retrieve 10 homo sapien records', async () => {
        const result = await client.query(
            'SELECT ac, upi FROM xref WHERE taxid = 9606 LIMIT 10;',
        );
        expect(result.rows).to.have.lengthOf(10);
    });
});
