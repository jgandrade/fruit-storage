import path from "path";
import { makeSchema } from "nexus";
import * as userSchemas from "../../../modules/User/_Services/auth/auth";

const types = { ...userSchemas };

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "../nexus_generated/schemas.graphql"),
    typegen: path.join(__dirname, "../nexus_generated/schema-types.d.ts"),
  },
});
