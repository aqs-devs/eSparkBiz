import { useLoaderData, useNavigate } from 'react-router';
import { useBasicInfoForm } from '../hooks/useBasicInfoForm';
import { ApplicantFormPage } from './ApplicantFormPage';
import { RouteBuilder } from '@job-applicants/shared';

export function DetailEditPage() {
    const { applicant } = useLoaderData();
    const navigate = useNavigate();

    const form = useBasicInfoForm({
        defaultValues: applicant,
        mode: 'edit',
        applicantId: applicant.id,
        onSuccess: () => {
            navigate(`/applicants/${applicant.id}/basic-info`);
        },
    });

    return (
        <ApplicantFormPage
            form={form}
            submitLabel="Save Changes"
            cancelTo={RouteBuilder.applicants.basicInfo.list()}
        />
    );
}
