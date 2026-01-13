import * as Requests from "../requests.js";
import { expect, use } from "chai";
import superagent from "chai-superagent";

use(superagent());

describe("Reqres API", () => {
  describe("Scenario: Register", () => {
    describe("Given: the user wants to register a user", () => {
      it("Then: a user should be registered", async () => {
        const res = await Requests.registerUser(
          { email: "eve.holt@reqres.in", password: "testing" },
          await Requests.headers(),
        );
        await expect(res).to.have.status(200);
      });
    });
  });
  describe("Scenario: Register - Bad requests", () => {
    describe("Given: the user wants to register a user", () => {
      describe("When: the user does not define a password", () => {
        it("Then: the user should be notified that the password is missing", async () => {
          const res = await Requests.registerUser(
            { email: "eve.holt@reqres.in" },
            await Requests.headers(),
          );
          await expect(res).to.have.status(400);
          await expect(res.body).to.include({ error: "Missing password" });
        });
      });
      describe("When: a non defined user is entered", () => {
        it("Then: the user should be notified only defined users succeed registration", async () => {
          const res = await Requests.registerUser(
            { email: "test@testin.com", password: "testing" },
            await Requests.headers(),
          );
          await expect(res).to.have.status(400);
          await expect(res.body).to.include({
            error: "Note: Only defined users succeed registration",
          });
        });
      });
    });
  });
});
