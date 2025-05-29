import "@/styles/globals.css"
import { Metadata } from "next"
import { Viewport } from 'next'

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import {SessionProvider} from "next-auth/react";
import React from "react";
import {Toaster} from "@/components/ui/sonner";


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
    { media: "(prefers-color-scheme: light)", color: "white" },
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
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col bg-dot-black/20 dark:bg-dot-white/15">
                {children}
              </div>
              <Toaster/>
              <TailwindIndicator />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
