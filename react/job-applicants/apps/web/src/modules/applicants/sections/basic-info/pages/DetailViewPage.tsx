import { Link, useLoaderData } from 'react-router';
import { detailBasicInfoFields } from '@job-applicants/shared';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@job-applicants/ui/components/card';
import { buttonVariants } from '@job-applicants/ui/components/button';
import { Field, FieldContent, FieldLabel } from '@job-applicants/ui/components/field';
import { Edit } from 'lucide-react';
import type { loadApplicant } from '../loaders';
import { formatFieldValue } from '../lib/formatFieldValue';

export function DetailViewPage() {
    const { applicant } = useLoaderData() as Awaited<
        ReturnType<typeof loadApplicant>
    >;

    return (
        <section className="mx-auto flex max-w-2xl flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {applicant.firstName} {applicant.lastName}
                    </CardTitle>
                    <CardAction>
                        <Link
                            to={`/applicants/${applicant.id}/edit/basic-info`}
                            className={buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                            })}
                        >
                            <Edit />
                            Edit
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                    {detailBasicInfoFields.map((field) => (
                        <Field key={field.key} orientation="horizontal">
                            <FieldLabel>{field.label}</FieldLabel>
                            <FieldContent>
                                {formatFieldValue(field, applicant[field.key])}
                            </FieldContent>
                        </Field>
                    ))}
                </CardContent>
            </Card>
        </section>
    );
}
