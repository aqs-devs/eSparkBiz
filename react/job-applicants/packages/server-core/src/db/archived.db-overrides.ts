import type { Applicant, DB } from './db-types.js';
import type { ColumnType } from 'kysely';

// // kysely-codegen types DATE columns as Date, but dateStrings: true in MySQL2
// // means they arrive at runtime as "YYYY-MM-DD" strings. This override corrects that.
// type StringDate<T> = T extends Date ? string : T;
type DateTimeColumn = ColumnType<string, Date | string, Date | string>;

// type FixDates<T> = {
//     [K in keyof T]: StringDate<T[K]>;
// };

// export type ApplicantOverride = FixDates<Applicant>;
type ApplicantOverride = Omit<Applicant, 'createdAt' | 'deletedAt'> & {
    // createdAt: ColumnType<Date, Date | string, Date | string>;
    createdAt: DateTimeColumn;
    deletedAt: DateTimeColumn | null;
};

export interface DBOverride extends Omit<DB, 'applicant'> {
    applicant: ApplicantOverride;
}