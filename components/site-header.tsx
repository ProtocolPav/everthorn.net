"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import {Button} from "@/components/ui/button";
import {HamburgerNav} from "@/components/hamburger";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {DiscordAvatar} from "@/components/discord-avatar";


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/50 backdrop-blur-lg">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">

        <MainNav items={siteConfig.mainNav} />
        <HamburgerNav items={siteConfig.mainNav} />

        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="flex items-center space-x-1">

            <DiscordAvatar/>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={siteConfig.links.patreon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={buttonVariants({
                        size: "icon",
                        variant: "outline",
                      })}
                    >
                      <Icons.patreon className="size-5" weight={'fill'} />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent align={'end'} alignOffset={-40}>
                  <p className={'mx-auto text-center text-sm my-0'}>Feed Thorny on Patreon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={siteConfig.links.youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={buttonVariants({
                        size: "icon",
                        variant: "outline",
                      })}
                    >
                      <Icons.youtube className="size-5" weight={'fill'} />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent align={'end'} alignOffset={4}>
                  <p className={'mx-auto text-center text-sm my-0'}>Everthorn Youtube Channel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/*<ThemeToggle />*/}
          </nav>
        </div>
      </div>
    </header>
  )
}
