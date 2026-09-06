// import type { DBOverride } from "../../db/db-overrides.js";

import type { ApplicantColumn } from "@job-applicants/shared";

// export type ApplicantColumn = keyof DBOverride['applicant'];

export type FindAllParams = {
    pageSize: number;
    offset: number;
    sortOn?: ApplicantColumn;
    order?: 'asc' | 'desc';
    filters?: Partial<Record<ApplicantColumn, string[]>>;
    dob_from?: string;
    dob_to?: string;
};

export type GetCountParams = {
    filters?: Partial<Record<ApplicantColumn, string[]>>;
    dob_from?: string;
    dob_to?: string;
};
