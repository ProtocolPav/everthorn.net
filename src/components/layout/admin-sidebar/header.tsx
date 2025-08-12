"use client"

import * as React from "react"
import logo from '../../../../public/everthorn.png'

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import {SignOut} from "@phosphor-icons/react";
import Link from "next/link";

export function PanelLogo(){

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/admin/">
                    <SidebarMenuButton size="lg" variant={'outline'} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                            <Image src={logo} alt={'logo'} className="size-5" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Everthorn
                        </span>
                            <span className="truncate text-xs">
                            Admin Dashboard
                        </span>
                        </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
