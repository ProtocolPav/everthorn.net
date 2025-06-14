"use client"
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AdminSidebar} from "@/app/(admin)/admin/_components/admin-sidebar"
import React from "react";
import {useSession} from "next-auth/react";
import {NoPermission} from "@/components/no-permission";
import {PageTitleProvider, usePageTitle} from "@/hooks/use-context";

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const { title } = usePageTitle()

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
            <SidebarInset>
                <header className="sticky top-2 z-50 flex m-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 rounded-lg bg-background/5 backdrop-blur-sm">
                        <SidebarTrigger className="size-10 m-0"/>
                        <h3 className={'text-sm pr-3'}>{title}</h3>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PageTitleProvider>
            <LayoutContent>{children}</LayoutContent>
        </PageTitleProvider>
    )
}