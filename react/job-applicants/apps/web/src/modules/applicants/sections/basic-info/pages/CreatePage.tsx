// import { BasicInfoForm } from '../components/BasicInfoForm';
// import { Button } from '@job-applicants/ui/components/button';
// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from '@job-applicants/ui/components/tabs';
import { RouteBuilder } from '@job-applicants/shared';
import { useNavigate } from 'react-router';
import { useBasicInfoForm } from '../hooks/useBasicInfoForm';

import { ApplicantFormPage } from './ApplicantFormPage';
import { toast } from 'sonner';

// export function CreatePage() {
//     const form = useApplicantForm();
//     return (
//         <section className="flex flex-col items-center gap-6 mx-auto max-w-full">
//             {/* <Edit className="self-end" /> */}
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     form.handleSubmit();
//                 }}
//             >
//                 <Tabs defaultValue="basic-info">
//                     <TabsList>
//                         <TabsTrigger value="basic-info">Basic Info</TabsTrigger>

//                         <TabsTrigger value="education">Education</TabsTrigger>

//                         <TabsTrigger value="experience">Experience</TabsTrigger>

//                         <TabsTrigger value="technologies">
//                             Technologies
//                         </TabsTrigger>
//                     </TabsList>

//                     <TabsContent value="basic-info">
//                         <BasicInfoForm form={form} />
//                     </TabsContent>

//                     <TabsContent value="education">Education</TabsContent>

//                     <TabsContent value="experience">Experience</TabsContent>

//                     <TabsContent value="technologies">Technologies</TabsContent>
//                 </Tabs>

//                 <Button type="submit">Create Applicant</Button>
//                 {/* <form.Subscribe
//                     selector={(state) => ({
//                         canSubmit: state.canSubmit,
//                         isSubmitting: state.isSubmitting,
//                     })}
//                 >
//                     {({ canSubmit, isSubmitting }) => (
//                         <Button
//                             type="submit"
//                             disabled={!canSubmit || isSubmitting}
//                         >
//                             {isSubmitting ? 'Creating...' : 'Create Applicant'}
//                         </Button>
//                     )}
//                 </form.Subscribe> */}
//             </form>
//         </section>
//     );
// }

export function CreatePage() {
    const navigate = useNavigate();

    const form = useBasicInfoForm({
        mode: 'create',
        onSuccess: (applicantId) => {
            if (applicantId === undefined) {
                return;
            }

            toast.success('Applicant created successfully.');

            navigate(
                RouteBuilder.applicants.basicInfo.detail(applicantId),
            );
        },
    });


    return (
        <ApplicantFormPage
            form={form}
            submitLabel="Create Applicant"
            cancelTo={RouteBuilder.applicants.basicInfo.list()}
        />
    );
}