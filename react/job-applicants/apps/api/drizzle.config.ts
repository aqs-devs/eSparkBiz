// import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required.');
}

export default defineConfig({
    dialect: 'mysql',
    // schema: './src/db/schema/**/*.ts', //is also valid if you eventually split the schema into files. But since we currently have one canonical schema file, this is cleaner.
    schema: './src/db/schema.ts',
    out: './migrations',

    tablesFilter: [
        'applicant',
        'technologies',
    ],

    dbCredentials: {
        url: databaseUrl,
        ssl: {},
    },
});
