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


//---


// export async function up(db: Kysely<any>): Promise<void> {
//     await db.schema
//         .createTable('applicant')
//         .addColumn('id', 'integer unsigned', (col) =>
//             col.primaryKey().autoIncrement()
//         )
//         .addColumn('first_name', 'varchar(20)', (col) =>
//             col.notNull()
//         )
//         .addColumn('last_name', 'varchar(20)', (col) =>
//             col.notNull()
//         )
//         .addColumn('designation', 'varchar(30)', (col) =>
//             col.notNull().defaultTo('Intern')
//         )
//         .addColumn('full_address', 'varchar(255)')
//         .addColumn('email', 'varchar(100)')
//         .addColumn('phone', 'varchar(20)', (col) =>
//             col.notNull()
//         )
//         .addColumn('country', 'char(2)')
//         .addColumn('city', 'varchar(30)')
//         .addColumn('state', 'char(2)')
//         .addColumn('gender', sql`enum('male', 'female', 'other')`, (col) =>
//             col.notNull()
//         )
//         .addColumn('zip_code', 'char(6)')
//         .addColumn(
//             'relationship_status',
//             sql`enum('single', 'committed')`
//         )
//         .addColumn('dob', 'date', (col) =>
//             col.notNull()
//         )
//         .addColumn('created_at', 'timestamp', (col) =>
//             col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
//         )
//         .addColumn('is_deleted', 'tinyint', (col) =>
//             col.notNull().defaultTo(0)
//         )
//         .addUniqueConstraint('uq_applicant_phone', ['phone'])
//         .addUniqueConstraint('uq_applicant_email', ['email'])
//         .execute();

//     await db.schema
//         .createTable('technologies')
//         .addColumn('id', 'bigint unsigned', (col) =>
//             col.primaryKey().autoIncrement()
//         )
//         .addColumn('applicant_id', 'integer unsigned', (col) =>
//             col.notNull()
//         )
//         .addColumn('label', 'varchar(50)', (col) =>
//             col.notNull()
//         )
//         .addColumn(
//             'proficiency',
//             sql`enum('beginner', 'intermediate', 'expert')`
//         )
//         .addColumn('created_at', 'timestamp', (col) =>
//             col.defaultTo(sql`CURRENT_TIMESTAMP`)
//         )
//         .addColumn(
//             'updated_at',
//             'timestamp',
//             (col) =>
//                 col
//                     .defaultTo(sql`CURRENT_TIMESTAMP`)
//                     .modify()
//         )
//         .addColumn('is_deleted', 'tinyint', (col) =>
//             col.notNull().defaultTo(0)
//         )
//         .addUniqueConstraint(
//             'uq_technologies_applicant_label',
//             ['applicant_id', 'label']
//         )
//         .addForeignKeyConstraint(
//             'fk_technologies_applicants',
//             ['applicant_id'],
//             'applicant',
//             ['id']
//         )
//         .execute();
// }



// ---


// import { sql, type Kysely } from 'kysely';

// export async function up(db: Kysely<unknown>): Promise<void> {
//     await sql`
//         CREATE TABLE applicant (
//             id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//             first_name VARCHAR(20) NOT NULL,
//             last_name VARCHAR(20) NOT NULL,
//             designation VARCHAR(30) NOT NULL DEFAULT 'Intern',
//             full_address VARCHAR(255) DEFAULT NULL,
//             email VARCHAR(100) DEFAULT NULL,
//             phone VARCHAR(20) NOT NULL,
//             country CHAR(2) DEFAULT NULL,
//             city VARCHAR(30) DEFAULT NULL,
//             state CHAR(2) DEFAULT NULL,
//             gender ENUM('male', 'female', 'other') NOT NULL,
//             zip_code CHAR(6) DEFAULT NULL,
//             relationship_status ENUM('single', 'committed') DEFAULT NULL,
//             dob DATE NOT NULL,
//             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//             is_deleted TINYINT(1) NOT NULL DEFAULT '0',

//             PRIMARY KEY (id),
//             UNIQUE KEY phone (phone),
//             UNIQUE KEY email (email)
//         )
//         ENGINE=InnoDB
//         DEFAULT CHARSET=utf8mb4
//         COLLATE=utf8mb4_0900_ai_ci
//     `.execute(db);

//     await sql`
//         CREATE TABLE technologies (
//             id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
//             applicant_id INT UNSIGNED NOT NULL,
//             label VARCHAR(50) NOT NULL,
//             proficiency ENUM('beginner', 'intermediate', 'expert') DEFAULT NULL,
//             created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
//             updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
//                 ON UPDATE CURRENT_TIMESTAMP,
//             is_deleted TINYINT(1) NOT NULL DEFAULT '0',

//             PRIMARY KEY (id),
//             UNIQUE KEY applicant_id (applicant_id, label),
//             KEY idx_technologies_applicant_id (applicant_id),

//             CONSTRAINT fk_technologies_applicants
//                 FOREIGN KEY (applicant_id)
//                 REFERENCES applicant (id)
//         )
//         ENGINE=InnoDB
//         DEFAULT CHARSET=utf8mb4
//         COLLATE=utf8mb4_0900_ai_ci
//     `.execute(db);
// }

// export async function down(db: Kysely<unknown>): Promise<void> {
//     await sql`DROP TABLE technologies`.execute(db);
//     await sql`DROP TABLE applicant`.execute(db);
// }


//--


import type { Kysely } from 'kysely';

export async function up(_db: Kysely<any>): Promise<void> {
    // Existing database schema is the baseline.
}

export async function down(_db: Kysely<any>): Promise<void> {
    // Intentionally empty.
}