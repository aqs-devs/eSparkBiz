import { BriefcaseBusiness, Users } from 'lucide-react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
    Sidebar,
    SidebarContent,
    SidebarRail,
} from '@job-applicants/ui/components/sidebar';

import { NavMain } from './nav-main';

export function AppSidebar() {
    const location = useLocation();
    const { i18n } = useTranslation();

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
        <Sidebar
            side={i18n.dir() === 'rtl' ? 'right' : 'left'}
            className="top-16 h-[calc(100svh-4rem)]"
            collapsible="icon"
        >
            <SidebarContent>
                <NavMain items={items} />
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
