import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@job-applicants/ui/components/sidebar';

type NavMainProps = {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
    }[];
};

export function NavMain({ items }: NavMainProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    render={<Link to={item.url} />}
                                    isActive={item.isActive}
                                    tooltip={item.title}
                                >
                                    <Icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
