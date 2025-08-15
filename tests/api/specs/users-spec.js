import * as Requests from '../requests.js';
import { expect, use } from 'chai';
import superagent from 'chai-superagent';

use(superagent());

describe('Reqres API', () => {
    describe('Scenario: Users', () => {
        describe('Given: the user wants to see available users', () => {
            describe('When: the user wants to find a specific user', () => {
                it('Then: data for the user should be returned', async () => {
                    const res = await Requests.getUsersByID(
                        '1',
                        await Requests.headers(),
                    );
                    await expect(res).to.have.status(200);
                });
            });
            it('Then: data of users should be returned', async () => {
                const res = await Requests.getUsers('/users', await Requests.headers());
                await expect(res).to.have.status(200);
            });
        });
        describe('Given: the user wants to create a new user', () => {
            it('Then: a user should be created', async () => {
                const res = await Requests.createUser(
                    { name: 'tester', job: 'tester' },
                    await Requests.headers(),
                );
                await expect(res).to.have.status(201);
            });
        });
        describe('Given: the user wants to update a user', () => {
            it('Then: a user should be updated', async () => {
                const res = await Requests.updateUser(
                    '1',
                    { name: 'tester', job: 'tester' },
                    await Requests.headers(),
                );
                await expect(res).to.have.status(200);
            });
        });
    });
    describe('Scenario: Users - Bad requests', () => {
        describe('Given: the user wants to see available users', () => {
            describe('When: an alphabetic character is used', () => {
                it('Then: a 404 should be returned', async () => {
                    const res = await Requests.getUsersByID(
                        'a',
                        await Requests.headers(),
                    );
                    await expect(res).to.have.status(404);
                });
            });
            describe('When: a special character is used', () => {
                it('Then: a 404 should be returned', async () => {
                    const res = await Requests.getUsersByID(
                        '!',
                        await Requests.headers(),
                    );
                    await expect(res).to.have.status(404);
                });
            });
        });
    });
});
