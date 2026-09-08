// As your project grows, mapper.ts will likely also contain:

// toApplicantInsert()
// toApplicantUpdate()
// toBasicInfoDto()
// toApplicantSummaryDto()

// which keeps all Applicant-specific transformations together.

// NOTE:
// | Purpose                   | Kysely type             |
// | ------------------------- | ----------------------- |
// | Database table definition | `Applicant`             |
// | `INSERT` payload          | `Insertable<Applicant>` |
// | `UPDATE` payload          | `Updateable<Applicant>` |
// | `SELECT` result           | `Selectable<Applicant>` |

// import type { DBOverride } from '../../db/db-overrides.js';
import type { DB } from '../../db/db-types.js';
import type {
    BasicInfo,
    CreateBasicInfo,
    UpdateBasicInfo,
} from '@job-applicants/schemas';
import { formBasicInfoFields } from '@job-applicants/shared';
import type { Insertable, Selectable, Updateable } from 'kysely';
import type { Applicant } from '../../db/db-types.ts';

// console.log(
//     formBasicInfoFields.map(f => ({
//         key: f.key,
//         visibility: f.visibility,
//     })),
// );

// type ApplicantInsert = Insertable<Applicant>;
// type ApplicantRow = Selectable<Applicant>;
type ApplicantInsert = Insertable<DB['applicant']>;
type ApplicantRow = Selectable<DB['applicant']>;

// export function toApplicantDbFields(body: CreateBasicInfo | UpdateBasicInfo) {
//     const row = {} as ApplicantInsert;

//     for (const field of formBasicInfoFields) {
//         (row as Record<string, unknown>)[field.dbColumn] = body[field.key];
//     }

//     return row;
// }

export function toBasicInfoDto(applicant: ApplicantRow): BasicInfo {
    // console.log(
    //     applicant.createdAt,
    //     typeof applicant.createdAt,
    //     applicant.createdAt instanceof Date,
    // );

    return {
        ...applicant,
        // createdAt: new Date(applicant.createdAt).toISOString(),
        // createdAt: applicant.createdAt.toISOString(),
        // createdAt: applicant.createdAt, //might not even need this now, as `...applicants` covers it
    };
}

// type ApplicantUpdate = Updateable<Applicant>;
type ApplicantUpdate = Updateable<DB['applicant']>;

export function toApplicantInsert(body: CreateBasicInfo): ApplicantInsert {
    const row = {} as ApplicantInsert;

    for (const field of formBasicInfoFields) {
        (row as Record<string, unknown>)[field.dbColumn] = body[field.key];
    }

    return row;
}

export function toApplicantUpdate(body: UpdateBasicInfo): ApplicantUpdate {
    const row = {} as ApplicantUpdate;

    for (const field of formBasicInfoFields) {
        const value = body[field.key];

        if (value !== undefined) {
            (row as Record<string, unknown>)[field.dbColumn] = value;
        }
    }

    return row;
}
