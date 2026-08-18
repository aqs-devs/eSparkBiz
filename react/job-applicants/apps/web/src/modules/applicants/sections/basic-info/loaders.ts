import { BasicInfoListQuerySchema, BasicInfoSchema, IdSchema } from '@job-applicants/schemas';
import { type LoaderFunctionArgs } from 'react-router';
import { getApplicant, getApplicants } from '@job-applicants/api-client';

export const loadApplicants = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const rawQuery = Object.fromEntries(url.searchParams.entries());

    const queryParams = BasicInfoListQuerySchema.parse(rawQuery);

    const [applicantsResponse, 
        // filterOptions,
    ] = await Promise.all([
        getApplicants(queryParams),
    ]);

    return {
        applicants: BasicInfoSchema.array().parse(applicantsResponse.data),
        pagination: applicantsResponse.pagination,
        // filterOptions,
    };
};

export const loadApplicant = async ({ params }: LoaderFunctionArgs) => {
    const id = IdSchema.parse(params.id);

    const applicantResponse = await getApplicant(id);

    return {
        applicant: BasicInfoSchema.parse(applicantResponse),
    };
};
