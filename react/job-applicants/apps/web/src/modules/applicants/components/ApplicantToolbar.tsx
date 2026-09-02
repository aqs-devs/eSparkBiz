// ← Back to applicants
// 
// Edit
// Delete
// Duplicate
// Export

import { Link, useNavigate } from 'react-router';
import { ArrowLeft, SquarePen } from 'lucide-react';

import { buttonVariants } from '@job-applicants/ui/components/button';
import { RouteBuilder } from '@job-applicants/shared';
import { DeleteApplicantAction } from './DeleteApplicantAction';
import { useTranslation } from 'react-i18next';

type ApplicantToolbarProps = {
    applicantId: number;
};

export function ApplicantToolbar({
    applicantId,
}: ApplicantToolbarProps) {
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    return (
        <div className="flex items-center justify-between">
            <Link
                to={RouteBuilder.applicants.basicInfo.list()}
                className={buttonVariants({
                    variant: 'ghost',
                })}
            >
                <ArrowLeft className="size-4 shrink-0" />
                {t('actions.back')}
            </Link>

            <Link
                to={RouteBuilder.applicants.basicInfo.edit(applicantId)}
                className={buttonVariants({
                    variant: 'outline',
                })}
            >
                <SquarePen className="size-4 shrink-0" />
                {t('actions.edit')}
            </Link>

            {/* <DeleteApplicantAction applicantId={applicantId} /> */}
            <DeleteApplicantAction
                applicantId={applicantId}
                onDeleted={() => {
                    navigate(
                        RouteBuilder.applicants.basicInfo.list(),
                    );
                }}
            />
        </div>
    );
}
