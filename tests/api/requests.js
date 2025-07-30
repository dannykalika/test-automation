import request from "superagent";
import "dotenv/config";
import { ajv } from "./validation.js";

const test_url = process.env.TEST_URL;

export async function headers() {
  return { "x-api-key": process.env.API_KEY };
}

export async function validate(schemaName, body) {
  const validate = ajv.getSchema(schemaName);
  if (validate(body)) {
    return true;
  } else {
    await console.log(validate.errors);
    throw new Error(JSON.stringify(validate.errors));
  }
}

export async function getUsers(path, headers) {
  try {
    const res = await request.get(test_url + path).set(headers);
    await validate("user", res._body);
    return res;
  } catch (error) {
    if (error.response) {
      await validate("user", error.response.body);
      return error.response;
    } else {
      throw new Error(error);
    }
  }
}

export async function getUsersByID(id, headers) {
  try {
    const res = await request.get(`${test_url}/users/${id}`).set(headers);
    await validate("user-id", res._body);
    return res;
  } catch (error) {
    if (error.response) {
      await validate("user-id", error.response.body);
      return error.response;
    } else {
      throw new Error(error);
    }
  }
}

export async function createUser(body, headers) {
  try {
    const res = await request
      .post(`${test_url}/users/`)
      .send(body)
      .set(headers);
    await validate("create-user", res._body);
    return res;
  } catch (error) {
    if (error.response) {
      await validate("create-user", error.response.body);
      return error.response;
    } else {
      throw new Error(error);
    }
  }
}

export async function updateUser(id, body, headers) {
  try {
    const res = await request
      .put(`${test_url}/users/${id}`)
      .send(body)
      .set(headers);
    await validate("update-user", res._body);
    return res;
  } catch (error) {
    if (error.response) {
      await validate("update-user", error.response.body);
      return error.response;
    } else {
      throw new Error(error);
    }
  }
}

export async function registerUser(body, headers) {
  try {
    const res = await request
      .post(`${test_url}/register/`)
      .send(body)
      .set(headers);
    await validate("register", res._body);
    return res;
  } catch (error) {
    if (error.response) {
      await validate("register", error.response.body);
      return error.response;
    } else {
      throw new Error(error);
    }
  }
}
