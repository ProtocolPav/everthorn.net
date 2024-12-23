"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Desktop } from "@/components/header/desktop"
import { ThemeToggle } from "@/components/theme-toggle"
import {Button} from "@/components/ui/button";
import {Mobile} from "@/components/header/mobile";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {DiscordAvatar} from "@/components/discord-avatar";
import * as React from "react";


export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-6 sm:justify-between">
        <Link href="/" className="flex items-center">
          {/*<Icons.logo className="h-6 w-6" />*/}
          <span className="inline-block from-emerald-400 to-cyan-400 font-bold hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent">{siteConfig.name}</span>
        </Link>

        <Desktop/>
        <Mobile/>

        {/* Desktop Rightside Buttons*/}
        <div className="hidden flex-1 items-center justify-end md:flex">
          <nav className="flex items-center space-x-1">

            <DiscordAvatar/>

            <TooltipProvider delayDuration={300}>
              {/* Patreon Tooltip */}
              <Tooltip>
                <TooltipTrigger>
                  <Link href={siteConfig.links.patreon} target="_blank" rel="noreferrer">
                    <Button size={'icon'} variant={'outline'}>
                      <Icons.patreon className="size-5" weight={'fill'} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent align={'end'} alignOffset={-40}>
                  <p className={'mx-auto my-0 text-center text-sm'}>Feed Thorny on Patreon</p>
                </TooltipContent>
              </Tooltip>

              {/* YouTube Tooltip */}
              <Tooltip>
                <TooltipTrigger>
                  <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer">
                    <Button size={'icon'} variant={'outline'}>
                      <Icons.youtube className="size-5" weight={'fill'} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent align={'end'} alignOffset={4}>
                  <p className={'mx-auto my-0 text-center text-sm'}>Everthorn Youtube Channel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </nav>
        </div>
      </div>
    </header>
  )
}
