// Because you'll eventually reuse it for:
//
// Sidebar
// Breadcrumbs
// Mobile navigation
// Permission checks
// Page titles
// Keyboard shortcuts
//
// The list of applicant sections is domain knowledge, not UI knowledge.
//
// The component should only be responsible for rendering those sections.

import { RouteBuilder } from "./routes";


export const applicantSections = [
    {
        key: 'basicInfo',
        label: 'Basic Info',
        to: (id: number) => RouteBuilder.applicants.basicInfo.detail(id),
    },
    {
        key: 'education',
        label: 'Education',
        to: (id: number) => RouteBuilder.applicants.education.detail(id),
    },
    {
        key: 'experience',
        label: 'Experience',
        to: (id: number) => RouteBuilder.applicants.experience.detail(id),
    },
    {
        key: 'technologies',
        label: 'Technologies',
        to: (id: number) => RouteBuilder.applicants.technologies.detail(id),
    },
] as const;