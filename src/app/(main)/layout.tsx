import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";
import React from "react";

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <SiteHeader />
            <div className="relative flex-1 items-center justify-center">
                {children}
            </div>
            <SiteFooter />
        </>
    )
}