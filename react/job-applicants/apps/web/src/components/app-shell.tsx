import { Outlet, useLocation } from 'react-router';

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@job-applicants/ui/components/sidebar';
import { Separator } from '@job-applicants/ui/components/separator';

import { AppSidebar } from './app-sidebar';

export function AppShell() {
    const { pathname } = useLocation();
    const title = pathname.startsWith('/users') ? 'Users' : 'Applicants';

    return (
        <SidebarProvider defaultOpen={false}>
            <nav aria-label="Primary navigation">
                <AppSidebar />
            </nav>
            <SidebarInset className="min-w-0">
                <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <span className="text-xs font-medium text-muted-foreground">
                        {title}
                    </span>
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
}
