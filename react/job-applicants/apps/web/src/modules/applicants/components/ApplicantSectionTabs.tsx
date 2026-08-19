import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

import { applicantSections } from '@job-applicants/shared';

type ApplicantSectionTabsProps = {
    applicantId: number;
};

export function ApplicantSectionTabs({
    applicantId,
}: ApplicantSectionTabsProps) {
    const { t } = useTranslation('common');

    return (
        <nav className="border-b">
            <ul className="flex gap-6">
                {applicantSections.map((section) => (
                    <li key={section.key}>
                        <NavLink
                            to={section.to(applicantId)}
                            className={({ isActive }) =>
                                [
                                    'inline-flex border-b-2 px-1 py-3 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent text-muted-foreground hover:border-muted text-muted-foreground',
                                ].join(' ')
                            }
                        >
                            {t(`sections.${section.key}`)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}