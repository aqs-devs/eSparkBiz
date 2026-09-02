import { useLoaderData, useNavigate } from 'react-router';
import { useRef } from 'react';
import { useBasicInfoForm } from '../hooks/useBasicInfoForm';
import { ApplicantFormPage } from './ApplicantFormPage';
import { RouteBuilder } from '@job-applicants/shared';

export function DetailEditPage() {
    const { applicant } = useLoaderData();
    const navigate = useNavigate();
    const allowNavigationRef = useRef(false);

    const form = useBasicInfoForm({
        defaultValues: applicant,
        mode: 'edit',
        applicantId: applicant.id,
        onSuccess: () => {
            allowNavigationRef.current = true;
            navigate(RouteBuilder.applicants.basicInfo.detail(applicant.id));
        },
    });

    return (
        <ApplicantFormPage
            form={form}
            mode="edit"
            cancelTo={RouteBuilder.applicants.basicInfo.list()}
            allowNavigationRef={allowNavigationRef}
        />
    );
}
