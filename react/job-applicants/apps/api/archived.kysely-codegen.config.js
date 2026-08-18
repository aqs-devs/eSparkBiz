import { defineConfig } from "kysely-codegen";

export default defineConfig({
  dialect: "mysql",
  camelCase: true,
  outFile: "../../packages/server-core/src/db/db-types.ts",
  typeMapping: {
    date: "string",
    datetime: 'string',
    timestamp: 'string',
  },
});
