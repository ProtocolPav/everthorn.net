"use client"

import Link from "next/link"
import Image from "next/image"

import { Desktop } from "@/components/layout/header/desktop"
import {Button} from "@/components/ui/button";
import {Mobile} from "@/components/layout/header/mobile";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {DiscordButton} from "@/components/discord/discord-button";
import * as React from "react";
import {PatreonLogo, YoutubeLogo} from "@phosphor-icons/react";
import logo from '../../../../public/everthorn.png';


export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/50 backdrop-blur-sm">
      <div className="mx-5 flex h-16 items-center gap-6 sm:justify-between md:mx-10">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt={'Everthorn Logo'} className={'size-11'} />
        </Link>

        <Desktop/>
        <Mobile/>

        {/* Desktop Rightside Buttons*/}
        <div className="hidden flex-1 items-center justify-end md:flex">
          <nav className="flex items-center space-x-1">

            <DiscordButton/>

            <TooltipProvider delayDuration={300}>
              {/* Patreon Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild size={'icon'} variant={'outline'}>
                    <Link href={'/support'} target="_blank" rel="noreferrer">
                      <PatreonLogo className="size-5" weight={'fill'} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent align={'end'} alignOffset={-40}>
                  <p className={'mx-auto my-0 text-center text-sm'}>Feed Thorny on Patreon</p>
                </TooltipContent>
              </Tooltip>

              {/* YouTube Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild size={'icon'} variant={'outline'}>
                    <Link href={'/youtube'} target="_blank" rel="noreferrer">
                      <YoutubeLogo className="size-5" weight={'fill'} />
                    </Link>
                  </Button>
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
