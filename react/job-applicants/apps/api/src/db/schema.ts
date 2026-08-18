import { mysqlTable, mysqlSchema, type AnyMySqlColumn, primaryKey, unique, int, varchar, char, mysqlEnum, date, timestamp, datetime, index, foreignKey, bigint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const applicant = mysqlTable("applicant", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	firstName: varchar("first_name", { length: 20 }).notNull(),
	lastName: varchar("last_name", { length: 20 }).notNull(),
	designation: varchar({ length: 30 }).default('Intern').notNull(),
	fullAddress: varchar("full_address", { length: 255 }),
	email: varchar({ length: 100 }),
	phone: varchar({ length: 20 }).notNull(),
	country: char({ length: 2 }),
	city: varchar({ length: 50 }),
	// state: char({ length: 2 }),
	state: varchar("state", { length: 10 }),
	gender: mysqlEnum(['male','female','other']).notNull(),
	// zipCode: char("zip_code", { length: 6 }), 
	zipCode: varchar("zip_code", { length: 20 }), // international postal codes
	relationshipStatus: mysqlEnum("relationship_status", ['single','committed']),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date({ mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: datetime("deleted_at", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "applicant_id"}),
	unique("phone").on(table.phone),
	unique("email").on(table.email),
]);

// export const kyselyMigration = mysqlTable("kysely_migration", {
// 	name: varchar({ length: 255 }).notNull(),
// 	timestamp: varchar({ length: 255 }).notNull(),
// },
// (table) => [
// 	primaryKey({ columns: [table.name], name: "kysely_migration_name"}),
// ]);

// export const kyselyMigrationLock = mysqlTable("kysely_migration_lock", {
// 	id: varchar({ length: 255 }).notNull(),
// 	isLocked: int("is_locked").default(0).notNull(),
// },
// (table) => [
// 	primaryKey({ columns: [table.id], name: "kysely_migration_lock_id"}),
// ]);

export const technologies = mysqlTable("technologies", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	applicantId: int("applicant_id", { unsigned: true }).notNull().references(() => applicant.id),
	label: varchar({ length: 50 }).notNull(),
	proficiency: mysqlEnum(['beginner','intermediate','expert']),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
	deletedAt: datetime("deleted_at", { mode: 'string'}),
},
(table) => [
	index("idx_technologies_applicant_id").on(table.applicantId),
	primaryKey({ columns: [table.id], name: "technologies_id"}),
	unique("applicant_id").on(table.applicantId, table.label),
]);
