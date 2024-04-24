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


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-lg bg-background/50">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">

        <MainNav items={siteConfig.mainNav} />
        <HamburgerNav items={siteConfig.mainNav} />

        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="flex items-center space-x-1">
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
                <TooltipContent>
                  <p className={'mx-auto text-center'}>Feed Thorny <br/> on Patreon</p>
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
                <TooltipContent>
                  <p className={'mx-auto text-center'}>Everthorn <br /> Youtube Channel</p>
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
