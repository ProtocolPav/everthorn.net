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
import {BookIcon, CastleIcon, ChartLineIcon, EthernetPortIcon, HomeIcon, ScanTextIcon, ShieldQuestionIcon} from "lucide-react";
import React from "react";

export function AdminSidebar() {
    const server_items: NavItems[] = [
        {
            title: 'Dashboard',
            url: '/admin/',
            icon: HomeIcon,
        },
        {
            title: 'Quests',
            url: '/admin/quests',
            icon: ShieldQuestionIcon,
        },
        {
            title: 'Guidelines',
            url: '/admin/guidelines',
            icon: BookIcon,
        },
    ]

    const wiki_items: NavItems[] = [
        {
            title: 'Pages',
            url: '/admin/wiki/pages',
        }
    ]

    return (
        <Sidebar variant={'inset'} collapsible={'offcanvas'}>
            <SidebarHeader>
                <PanelLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavGroup title={'Server'} items={server_items}/>
                {/*<NavGroup title={'Wiki Administration'} items={wiki_items}/>*/}
            </SidebarContent>
            <SidebarFooter>
                <Exit/>
            </SidebarFooter>
        </Sidebar>
    )
}
