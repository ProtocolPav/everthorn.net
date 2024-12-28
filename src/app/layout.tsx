import "@/styles/globals.css"
import { Metadata } from "next"
import { Viewport } from 'next'

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import SiteHeader from "src/components/layout/header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import {SessionProvider} from "next-auth/react";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import SiteFooter from "@/components/layout/footer";


export const metadata: Metadata = {
  title: {
    default: 'Everthorn',
    template: `%s - Everthorn`,
  },
  description: 'Together We Stand',
  icons: {
    icon: "/everthorn.png",
    shortcut: "/everthorn.png",
    apple: "/everthorn.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-gradient-to-br from-background to-emerald-800/10 font-sans antialiased",
            fontSans.variable
          )}

        >
          <SessionProvider>
              <div className="relative flex min-h-screen flex-col bg-dot-white/15">
                {children}
              </div>
              <TailwindIndicator />
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
