import {
    // Link,
    useLoaderData,
} from 'react-router';
import {
    detailBasicInfoFields,
    detailBasicInfoSections,
} from '@job-applicants/shared';
import {
    Card,
    // CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@job-applicants/ui/components/card';
// import { buttonVariants } from '@job-applicants/ui/components/button';
import {
    Field,
    FieldContent,
    FieldLabel,
} from '@job-applicants/ui/components/field';
// import { Edit } from 'lucide-react';
import type { loadApplicant } from '../loaders';
import { formatFieldValue } from '../lib/formatFieldValue';

// export function DetailViewPage() {
//     const { applicant } = useLoaderData() as Awaited<
//         ReturnType<typeof loadApplicant>
//     >;

//     return (
//         <section className="mx-auto flex max-w-2xl flex-col gap-6">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>
//                         {applicant.firstName} {applicant.lastName}
//                     </CardTitle>
//                     <CardAction>
//                         <Link
//                             to={`/applicants/${applicant.id}/edit/basic-info`}
//                             className={buttonVariants({
//                                 variant: 'outline',
//                                 size: 'sm',
//                             })}
//                         >
//                             <Edit />
//                             Edit
//                         </Link>
//                     </CardAction>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     {detailBasicInfoFields.map((field) => (
//                         <Field key={field.key} orientation="horizontal">
//                             <FieldLabel>{field.label}</FieldLabel>
//                             <FieldContent>
//                                 {formatFieldValue(field, applicant[field.key])}
//                             </FieldContent>
//                         </Field>
//                     ))}
//                 </CardContent>
//             </Card>
//         </section>
//     );
// }

// export function DetailViewPage() {
//     const { applicant } = useLoaderData() as Awaited<
//         ReturnType<typeof loadApplicant>
//     >;

//     return (
//         <>
//             <ApplicantPageHeader applicant={applicant} />
//             <ApplicantTabs applicantId={applicant.id} />
//             <BasicInfoOverview applicant={applicant} />
//         </>
//     );
// }

// import { ApplicantToolbar } from '../../../components/ApplicantToolbar';
// import { ApplicantHeader } from '../../../components/ApplicantHeader';
// import { ApplicantSectionTabs } from '../../../components/ApplicantSectionTabs';

import { ApplicantHeader } from '#src/modules/applicants/components/ApplicantHeader.tsx';
import { ApplicantSectionTabs } from '#src/modules/applicants/components/ApplicantSectionTabs.tsx';
import { ApplicantToolbar } from '#src/modules/applicants/components/ApplicantToolbar.tsx';

export function DetailViewPage() {
    const { applicant } = useLoaderData() as Awaited<
        ReturnType<typeof loadApplicant>
    >;

    return (
        // <section className="mx-auto flex max-w-5xl flex-col gap-6">
        //     <ApplicantToolbar applicantId={applicant.id} />

        //     <ApplicantHeader applicant={applicant} />

        //     <ApplicantSectionTabs applicantId={applicant.id} />

        //     {detailBasicInfoSections.map((section) => (
        //         <Card key={section.key}>
        //             <CardHeader>
        //                 <CardTitle>{section.title}</CardTitle>
        //             </CardHeader>

        //             <CardContent className="grid gap-6 md:grid-cols-2">
        //                 {detailBasicInfoFields
        //                     .filter((field) => field.section === section.key)
        //                     .map((field) => (
        //                         <Field key={field.key} orientation="vertical">
        //                             <FieldLabel>{field.label}</FieldLabel>

        //                             <FieldContent>
        //                                 {formatFieldValue(
        //                                     field,
        //                                     applicant[field.key],
        //                                 )}
        //                             </FieldContent>
        //                         </Field>
        //                     ))}
        //             </CardContent>
        //         </Card>
        //     ))}
        // </section>
        <section className="mx-auto flex max-w-5xl flex-col gap-6">
            <ApplicantToolbar applicantId={applicant.id} />

            <ApplicantHeader applicant={applicant} />

            <ApplicantSectionTabs applicantId={applicant.id} />

            <div className="flex flex-col gap-8">
                {detailBasicInfoSections.map((section) => (
                    <Card key={section.key}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {section.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-6 md:grid-cols-2">
                            {detailBasicInfoFields
                                .filter(
                                    (field) => field.section === section.key,
                                )
                                .map((field) => (
                                    <Field
                                        key={field.key}
                                        orientation="vertical"
                                    >
                                        <FieldLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                                            {field.label}
                                        </FieldLabel>

                                        <FieldContent className="mt-1 font-medium">
                                            {formatFieldValue(
                                                field,
                                                applicant[field.key],
                                            )}
                                        </FieldContent>
                                    </Field>
                                ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
