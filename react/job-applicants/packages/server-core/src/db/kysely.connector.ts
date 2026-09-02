import { CamelCasePlugin, DeduplicateJoinsPlugin, HandleEmptyInListsPlugin, Kysely, MysqlDialect, replaceWithNoncontingentExpression } from 'kysely';
import { createPool, type Pool } from 'mysql2';
// import type { DBOverride } from './db-overrides.js';
import type { DB } from './db-types.js';

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required.');
}

const url = new URL(databaseUrl);
const pool: Pool = createPool({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    typeCast(field, next) {
        if (field.type === 'DATE' || field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
            return field.string();
        }

        return next();
    },
});

export const db = new Kysely<DB>({
    dialect: new MysqlDialect({ pool }),
    plugins: [
        new CamelCasePlugin(),
        new HandleEmptyInListsPlugin({strategy: replaceWithNoncontingentExpression}),
        new DeduplicateJoinsPlugin(),

    ],
});
