import { CamelCasePlugin, DeduplicateJoinsPlugin, HandleEmptyInListsPlugin, Kysely, MysqlDialect, replaceWithNoncontingentExpression } from 'kysely';
// import { createPool, type Pool } from 'mysql2/promise';
import { createPool, type Pool } from "mysql2";
// import type { DBOverride } from './db-overrides.js';
import type { DB } from './db-types.js';

// console.log({
//     DB_HOST: process.env.DB_HOST,
//     DB_USER: process.env.DB_USER,
//     DB_PASSWORD: process.env.DB_PASSWORD ? "***" : undefined,
//     DB_NAME: process.env.DB_NAME,
//     DB_PORT: process.env.DB_PORT,
// });

const pool:Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    dateStrings: true,
});

export const db = new Kysely<DB>({
    dialect: new MysqlDialect({ pool }),
    plugins: [
        new CamelCasePlugin(),
        new HandleEmptyInListsPlugin({strategy: replaceWithNoncontingentExpression}),
        new DeduplicateJoinsPlugin(),

    ],
});


// // db.ts
// import { CamelCasePlugin, Kysely, MysqlDialect } from 'kysely';
// import { createPool } from 'mysql2';
// import type { DBOverride } from './db-overrides.js';

// export const db = new Kysely<DBOverride>({
//     dialect: new MysqlDialect({
//         pool: createPool({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//             port: Number(process.env.DB_PORT),
//             dateStrings: true,
//         }),
//     }),
//     plugins: [new CamelCasePlugin()],
// });
