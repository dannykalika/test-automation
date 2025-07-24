import Ajv from "ajv";
import schema_user from "./schema/users-schema.json" with { type: "json" };
import schema_user_id from "./schema/users-id-schema.json" with { type: "json" };
import schema_create_user from "./schema/create-user-schema.json" with { type: "json" };
import schema_update_user from "./schema/update-user-schema.json" with { type: "json" };
import register from "./schema/register-schema.json" with { type: "json" };
import addFormats from "ajv-formats";

export const ajv = new Ajv();
addFormats(ajv);
ajv.addSchema(schema_user, "user");
ajv.addSchema(schema_user_id, "user-id");
ajv.addSchema(schema_create_user, "create-user");
ajv.addSchema(schema_update_user, "update-user");
ajv.addSchema(register, "register");
