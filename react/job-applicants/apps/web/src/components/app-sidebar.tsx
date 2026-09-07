import { BriefcaseBusiness, Users } from 'lucide-react';
import { useLocation } from 'react-router';

import {
    Sidebar,
    SidebarContent,
    SidebarRail,
} from '@job-applicants/ui/components/sidebar';

import { NavMain } from './nav-main';

export function AppSidebar() {
    const location = useLocation();

    const isApplicantsActive = location.pathname.startsWith('/applicants');
    const isUsersActive = location.pathname.startsWith('/users');
    const items = [
        {
            title: 'Applicants',
            url: '/applicants/basic-info',
            icon: BriefcaseBusiness,
            isActive: isApplicantsActive,
        },
        {
            title: 'Users',
            url: '/users/list',
            icon: Users,
            isActive: isUsersActive,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <NavMain items={items} />
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
