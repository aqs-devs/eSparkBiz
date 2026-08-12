// import type { Kysely } from 'kysely'

// // `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// export async function up(db: Kysely<any>): Promise<void> {
// 	// up migration code goes here...
// 	// note: up migrations are mandatory. you must implement this function.
// 	// For more info, see: https://kysely.dev/docs/migrations
// }

// // `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// export async function down(db: Kysely<any>): Promise<void> {
// 	// down migration code goes here...
// 	// note: down migrations are optional. you can safely delete this function.
// 	// For more info, see: https://kysely.dev/docs/migrations
// }


// import type { Kysely } from 'kysely';

// export async function up(db: Kysely<any>): Promise<void> {
//     await db.schema
//         .alterTable('applicant')
//         .dropColumn('is_deleted')
//         .addColumn('deleted_at', 'datetime')
//         .execute();

//     await db.schema
//         .alterTable('technologies')
//         .dropColumn('is_deleted')
//         .addColumn('deleted_at', 'datetime')
//         .execute();
// }

// export async function down(db: Kysely<any>): Promise<void> {
//     await db.schema
//         .alterTable('technologies')
//         .dropColumn('deleted_at')
//         .addColumn('is_deleted', 'tinyint', (column) =>
//             column.notNull().defaultTo(0)
//         )
//         .execute();

//     await db.schema
//         .alterTable('applicant')
//         .dropColumn('deleted_at')
//         .addColumn('is_deleted', 'tinyint', (column) =>
//             column.notNull().defaultTo(0)
//         )
//         .execute();
// }


// import { sql, type Kysely } from 'kysely';

// export async function up(db: Kysely<any>): Promise<void> {
//     await db.schema
//         .alterTable('applicant')
//         .dropColumn('is_deleted')
//         .addColumn('deleted_at', 'datetime')
//         .execute();

//     await db.schema
//         .alterTable('technologies')
//         .dropColumn('is_deleted')
//         .addColumn('deleted_at', 'datetime')
//         .execute();
// }

// // export async function down(db: Kysely<any>): Promise<void> {
// //     await db.schema
// //         .alterTable('technologies')
// //         .addColumn('is_deleted', sql`TINYINT(1)`, (column) =>
// //             column.notNull().defaultTo(0)
// //         )
// //         .execute();

// //     await db.schema
// //         .alterTable('applicant')
// //         .addColumn('is_deleted', sql`TINYINT(1)`, (column) =>
// //             column.notNull().defaultTo(0)
// //         )
// //         .execute();

// //     await db.schema
// //         .alterTable('technologies')
// //         .dropColumn('deleted_at')
// //         .execute();

// //     await db.schema
// //         .alterTable('applicant')
// //         .dropColumn('deleted_at')
// //         .execute();
// // }
// export async function down(db: Kysely<any>): Promise<void> {
//     await db.schema
//         .alterTable('technologies')
//         .addColumn('is_deleted', sql`TINYINT(1)`, (column) =>
//             column.notNull().defaultTo(0)
//         )
//         .execute();

//     await sql`
//         UPDATE technologies
//         SET is_deleted = deleted_at IS NOT NULL
//     `.execute(db);

//     await db.schema
//         .alterTable('technologies')
//         .dropColumn('deleted_at')
//         .execute();

//     await db.schema
//         .alterTable('applicant')
//         .addColumn('is_deleted', sql`TINYINT(1)`, (column) =>
//             column.notNull().defaultTo(0)
//         )
//         .execute();

//     await sql`
//         UPDATE applicant
//         SET is_deleted = deleted_at IS NOT NULL
//     `.execute(db);

//     await db.schema
//         .alterTable('applicant')
//         .dropColumn('deleted_at')
//         .execute();
// }

import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('applicant')
        .addColumn('deleted_at', 'datetime')
        .execute();

    await sql`
        UPDATE applicant
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE is_deleted = 1
    `.execute(db);

    await db.schema
        .alterTable('applicant')
        .dropColumn('is_deleted')
        .execute();

    await db.schema
        .alterTable('technologies')
        .addColumn('deleted_at', 'datetime')
        .execute();

    await sql`
        UPDATE technologies
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE is_deleted = 1
    `.execute(db);

    await db.schema
        .alterTable('technologies')
        .dropColumn('is_deleted')
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('technologies')
        .addColumn('is_deleted', sql`TINYINT(1)`, (column) =>
            column.notNull().defaultTo(0)
        )
        .execute();

    await sql`
        UPDATE technologies
        SET is_deleted = deleted_at IS NOT NULL
    `.execute(db);

    await db.schema
        .alterTable('technologies')
        .dropColumn('deleted_at')
        .execute();

    await db.schema
        .alterTable('applicant')
        .addColumn('is_deleted', sql`TINYINT(1)`, (column) =>
            column.notNull().defaultTo(0)
        )
        .execute();

    await sql`
        UPDATE applicant
        SET is_deleted = deleted_at IS NOT NULL
    `.execute(db);

    await db.schema
        .alterTable('applicant')
        .dropColumn('deleted_at')
        .execute();
}