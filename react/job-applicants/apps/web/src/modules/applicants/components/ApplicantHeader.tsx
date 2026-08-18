import { Mail } from 'lucide-react';

import { ApplicantAvatar } from './ApplicantAvatar';
import type { BasicInfo } from '@job-applicants/schemas';

type ApplicantHeaderProps = {
    applicant: BasicInfo;
};

export function ApplicantHeader({
    applicant
}: ApplicantHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    {applicant.firstName} {applicant.lastName}
                </h1>

                {applicant.designation && (
                    <p className="mt-1 text-lg text-muted-foreground">
                        {applicant.designation}
                    </p>
                )}

                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4 shrink-0" />
                    <span className="truncate">{applicant.email}</span>
                </div>
            </div>

            <ApplicantAvatar
                firstName={applicant.firstName}
                lastName={applicant.lastName}
                // src={applicant.src} //TODO: avatar uploads/Gravatar are a future feature
                className="h-20 w-20"
            />
        </div>
    );
}
