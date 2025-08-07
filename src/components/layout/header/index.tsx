"use client"

import Link from "next/link"
import Image from "next/image"
import { Desktop } from "@/components/layout/header/desktop"
import { Mobile } from "@/components/layout/header/mobile"
import { SocialButtons } from "@/components/layout/header/social-buttons"
import logo from 'public/everthorn.png'

export default function SiteHeader() {
  return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/50 backdrop-blur-sm">
        <div className="mx-5 flex h-16 items-center gap-6 sm:justify-between md:mx-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Everthorn Logo" className="size-11" />
          </Link>

          {/* Navigation */}
          <Desktop />
          <Mobile />

          {/* Desktop Social Buttons */}
          <div className="hidden flex-1 items-center justify-end md:flex">
            <SocialButtons />
          </div>
        </div>
      </header>
  )
}
