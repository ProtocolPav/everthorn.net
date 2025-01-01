"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenuSkeleton,
    SidebarSeparator
} from "@/components/ui/sidebar"
import {PanelLogo} from "@/app/(admin)/admin/_components/sidebar/header";
import {Exit} from "@/app/(admin)/admin/_components/sidebar/footer";
import {NavGroup, NavItems} from "@/app/(admin)/admin/_components/sidebar/nav-group";
import {BookIcon, CastleIcon, ChartLineIcon, EthernetPortIcon, ScanTextIcon, ShieldQuestionIcon} from "lucide-react";
import React from "react";

export function AdminSidebar() {
    const server_items: NavItems[] = [
        {
            title: 'Guidelines',
            url: '/admin/guidelines',
            icon: BookIcon,
        },
        {
            title: 'Statistics',
            url: '/admin/server/',
            icon: ChartLineIcon,
            items: [
                {title: 'Today View', url: '/admin/server/statistics/today'},
                {title: 'Weekly View', url: '/admin/server/statistics/weekly'},
                {title: 'Monthly View', url: '/admin/server/statistics/monthly'},
                {title: 'Full View', url: '/admin/server/statistics/'},
            ]
        },
        {
            title: 'Console',
            url: '/admin/server/console',
            icon: EthernetPortIcon,
            items: [
                {title: 'Schedule Messages', url: '/admin/server/console/message'},
                {title: 'Whitelist', url: '/admin/server/console/whitelist'},
            ]
        },
        {
            title: 'Interaction Logs',
            url: '/admin/server/interactions',
            icon: ScanTextIcon,
        },
        {
            title: 'Quests',
            url: '/admin/quests',
            icon: ShieldQuestionIcon,
            items: [
                {title: 'Creator', url: '/admin/quests/creator'},
                {title: 'Manager', url: '/admin/quests/manager'},
            ]
        },
        {
            title: 'Project Applications',
            url: '/admin/server/projects',
            icon: CastleIcon,
        },
    ]

    const wiki_items: NavItems[] = [
        {
            title: 'Pages',
            url: '/admin/wiki/pages',
        }
    ]

    return (
        <Sidebar variant={'floating'} collapsible={'icon'}>
            <SidebarHeader>
                <PanelLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavGroup title={'Server'} items={server_items}/>
                <NavGroup title={'Wiki Administration'} items={wiki_items}/>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <Exit/>
            </SidebarFooter>
        </Sidebar>
    )
}
