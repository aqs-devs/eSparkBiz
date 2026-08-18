// Typical methods include:
// findById()
// findByIdOrThrow()
// findAll()
// insert()
// update()
// delete()
// exists()
// count()

import { db } from '../../db/kysely.connector.js';
// import { connection } from '../../../db/mysql2.connector.js';
import type { FindAllParams, GetCountParams } from './types.js';
import { toApplicantInsert, toApplicantUpdate } from './mapper.js';
// import AppError from '../../errors/AppError.js';
import AppError from '@job-applicants/server-core/errors/AppError'; // adjust path
import {
    ErrorCode,
    type CreateBasicInfo,
    type UpdateBasicInfo,
} from '@job-applicants/schemas';
import type { ApplicantColumn } from '@job-applicants/shared';
import { sql } from 'kysely';

// db.selectFrom('applicant')
//     .selectAll()
//     .limit(1)
//     .execute()
//     .then(() => console.debug('DB connection OK'))
//     .catch((err) => console.error('DB connection FAILED', err));

//NOTE: MYSQL2 VERSION
// const allowedSortColumns = [
//     "id",
//     "first_name",
//     "last_name",
//     "created_at"
// ]

// async function findAll({ limit, offset, column = "id", order = "DESC" }){
//     if (!allowedSortColumns.includes(column)) {
//         column = "id"
//     }

//     const statement = `SELECT * FROM applicants.applicant ORDER BY ${column} ${order} pageSize ? OFFSET ?`
//     const values = [pageSize, offset]

//     const [rows] = await connection.query(statement, values)
//     return rows
// }

export async function findAll({
    pageSize,
    offset,
    sortOn = 'id',
    order = 'asc',
    filters,
    dob_from,
    dob_to,
}: FindAllParams) {
    let query = db
        .selectFrom('applicant')
        .selectAll()
        .where('deletedAt', 'is', null);

    if (filters) {
        for (const [column, value] of Object.entries(filters)) {
            if (value === undefined) continue;
            query = query.where(column as ApplicantColumn, '=', value); //this prevents injection using Kyesely types
        }
        if (dob_from) query = query.where('dob', '>=', dob_from);
        if (dob_to) query = query.where('dob', '<=', dob_to);
    }

    const result = await query
        .orderBy(sortOn, order)
        .limit(pageSize)
        .offset(offset)
        .execute();

    return result;
}

export async function findDistinct<K extends ApplicantColumn>(column: K) {
    return db
        .selectFrom('applicant')
        .select(column)
        .distinct()
        .where('deletedAt', 'is', null)
        .orderBy(column)
        .execute();
}

// // applicant.repository.ts

// export async function findPaginated({ pageSize, offset }) {
// const [rows, total] = await Promise.all([
//     db
//     .selectFrom("applicant")
//     .selectAll()
//     .limit(pageSize)
//     .offset(offset)
//     .execute(),

//     db
//     .selectFrom("applicant")
//     .select((eb) => eb.fn.countAll().as("count"))
//     .executeTakeFirst(),
// ])

// return {
//     rows,
//     total: Number(total.count),
// }
// }

export async function getCount({ filters, dob_from, dob_to }: GetCountParams) {
    let query = db
        .selectFrom('applicant')
        .select((eb) => eb.fn.countAll().as('count'))
        .where('deletedAt', 'is', null)

    if (filters) {
        for (const [column, value] of Object.entries(filters)) {
            if (value === undefined) continue;
            query = query.where(column as ApplicantColumn, '=', value);
        }
    }
    if (dob_from) query = query.where('dob', '>=', dob_from);
    if (dob_to) query = query.where('dob', '<=', dob_to);

    return query.executeTakeFirstOrThrow();
}

// export async function findById(id: number) {
//     const statement = `SELECT * FROM applicants.applicant where id = ?`;
//     console.log('id', id);

//     const value = id;
//     const [rows] = await connection.query(statement, value);

//     return [rows];
// }

// ---

// NOTE:
// This not is just to remember that the current implementation of findById is temporary and can be changed based on the following logic:
// 3. Don't modify findById() yet
// This distinction matters.
// You currently have:
// findById(id)
// used by things such as:
// GET /applicants/:id
// PATCH /applicants/:id
// We need to decide whether those operations should see deleted records.
// For the normal application flow, the clean rule is:
// A soft-deleted applicant behaves as nonexistent.
// So eventually findById() should probably include:
// .where('deletedAt', 'is', null)
// But let's verify how your current service/repository flow uses findById() first, because softDelete() itself deliberately needs to distinguish an existing active row from an already-deleted row.
//
// i've been told to "Remove that whole comment block. Otherwise six months from now it will misleadingly tell you that the change is still pending." but i won't for documentation purposes. i have a gut feeling that this would be important in the future.
export async function findById(id: number) {
    return db
        .selectFrom('applicant')
        .selectAll()
        .where('id', '=', id)
        .where('deletedAt', 'is', null)
        .executeTakeFirst();
}

export async function findByIdOrThrow(id: number) {
    const applicant = await findById(id);

    if (!applicant) {
        throw new AppError({
            code: ErrorCode.NOT_FOUND,
            message: `Applicant ${id} not found.`,
        });
    }

    return applicant;
}

// export async function insert(body) {
//     const statement = `insert into applicants.applicant (first_name, last_name, designation, full_address, email, phone, city, gender, zip_code, relationship_status, dob) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const values = [
//         body.first_name,
//         body.last_name,
//         body.designation,
//         body.full_address,
//         body.email,
//         body.phone,
//         body.city,
//         body.gender,
//         body.zip_code,
//         body.relationship_status,
//         body.dob,
//     ];

//     const result = await connection.query(statement, values);
//     return result;
// }
// type Dob = CreateBasicInfo['dob'];

export async function insert(body: CreateBasicInfo) {
    const result = await db
        .insertInto('applicant')
        .values(toApplicantInsert(body))
        .executeTakeFirst();

    if (result.insertId === undefined) {
        throw new AppError({
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: 'Insert failed: no insertId returned.',
        });
    }

    return Number(result.insertId);
}

export async function update(id: number, body: UpdateBasicInfo) {
    const result = await db
        .updateTable('applicant')
        .set(toApplicantUpdate(body))
        .where('id', '=', id)
        .where('deletedAt', 'is', null)
        .executeTakeFirst();

    if (result.numUpdatedRows === 0n) {
        throw new AppError({
            code: ErrorCode.NOT_FOUND,
            message: `Applicant ${id} not found.`,
        });
    }

    return findByIdOrThrow(id);
}

export async function softDelete(id: number) {
    const result = await db
        .updateTable('applicant')
        .set({
            // deletedAt: new Date(),
            deletedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where('id', '=', id)
        .where('deletedAt', 'is', null)
        .executeTakeFirst();

    if (result.numUpdatedRows === 0n) {
        throw new AppError({
            code: ErrorCode.NOT_FOUND,
            message: `Applicant ${id} not found.`,
        });
    }
}

export async function restore(id: number) {
    const result = await db
        .updateTable('applicant')
        .set({
            deletedAt: null,
        })
        .where('id', '=', id)
        .where('deletedAt', 'is not', null)
        .executeTakeFirst();

    if (result.numUpdatedRows === 0n) {
        throw new AppError({
            code: ErrorCode.NOT_FOUND,
            message: `Deleted applicant ${id} not found.`,
        });
    }
}