"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {AdminSidebar} from "@/app/(admin)/admin/_components/admin-sidebar"
import {Separator} from "@/components/ui/separator";
import React from "react";
import {useSession} from "next-auth/react";
import {NoPermission} from "@/components/no-permission";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p className={'m-auto justify-center'}>Loading...</p>
    }

    if (
        status === "unauthenticated" ||
        !session?.user?.everthornMemberInfo.isCM
    ) {
        return <NoPermission status={status} />
    }

    return (
        <SidebarProvider>
            <AdminSidebar />
            <main>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <h3 className={'text-sm'}>Everthorn Admin Dashboard</h3>
                    </div>
                </header>
                {children}
            </main>
        </SidebarProvider>
    )
}