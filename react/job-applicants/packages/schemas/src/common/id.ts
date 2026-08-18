import { z } from 'zod';

export const IdSchema = z.coerce
    .number({
        error: 'Applicant ID must be a number.',
    })
    .int()
    .positive('Applicant ID must be greater than 0.');

export const IdParamsSchema = z.object({
    id: IdSchema,
});
