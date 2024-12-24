import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {Button} from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {DiscordAvatar} from "@/components/header/discord-avatar";
import {useSession} from "next-auth/react";
import {Separator} from "@/components/ui/separator";
import {House, IdentificationBadge, NewspaperClipping, PatreonLogo, ShieldCheck, YoutubeLogo, List} from "@phosphor-icons/react";


interface MainNavProps {
  items?: NavItem[]
}

export function Mobile({ items }: MainNavProps) {
  const { data: session, status } = useSession()
  const CMcheck = status === 'authenticated' && session?.user?.everthornMemberInfo.isCM

  const [buttonClick, setButtonClick] = React.useState(false);

  return (
    <div className="flex flex-1 items-center justify-end space-x-3 md:hidden">
      <DiscordAvatar />

      <Popover open={buttonClick} onOpenChange={setButtonClick}>
        <PopoverTrigger asChild>
          <Button variant={'outline'} size={'icon'} className={'flex'}>
            <List className={'size-6'}/>
          </Button>
        </PopoverTrigger>

        <PopoverContent align={'end'} className={'w-full bg-gradient-to-tr from-popover to-emerald-400/10'}>
          <div className={'mt-5 grid justify-start gap-y-2 text-start'}>
            {/* Home */}
            <Link href={'/'}>
              <Button className={'size-full justify-start'} variant={'outline'} onClick={() => setButtonClick(false)}>
                <House className={'size-6'} weight={'fill'}/>
                <div className='ms-2'>Home</div>
              </Button>
            </Link>

            {/* Guidelines */}
            <Link href={'/guidelines'}>
              <Button className={'size-full justify-start'} variant={'outline'} onClick={() => setButtonClick(false)}>
                <ShieldCheck className={'size-6'} weight={'fill'}/>
                <div className='ms-2'>Guidelines</div>
              </Button>
            </Link>

            {/* Wiki */}
            <Link href={'/wiki'}>
              <Button className={'h-auto w-full justify-start'} variant={'outline'} onClick={() => setButtonClick(false)}>
                <NewspaperClipping className={'size-6'} weight={'fill'}/>
                <div className='ms-2'>Wiki</div>
              </Button>
            </Link>

            {/* Admin */}
            <Link href={'/admin'} className={cn(CMcheck ? '': 'hidden')}>
              <Button className={'h-auto w-full justify-start bg-gradient-to-bl from-transparent to-purple-400/30'} variant={'outline'} onClick={() => setButtonClick(false)}>
                <IdentificationBadge className={'size-6'} weight={'fill'}/>
                <div className='ms-2'>Admin</div>
              </Button>
            </Link>

            <Separator className={'my-2'}/>

            <div className={'flex justify-center gap-4'}>
              <Link href={siteConfig.links.patreon} target="_blank" rel="noreferrer">
                <Button className={'bg-gradient-to-bl from-transparent to-lime-700/40'} size={'default'} variant={'outline'}>
                  <PatreonLogo className="mr-1 size-5" weight={'fill'} />
                  Feed Thorny
                </Button>
              </Link>

              <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer">
                <Button size={'icon'} variant={'outline'}>
                  <YoutubeLogo className="size-5" weight={'fill'} />
                </Button>
              </Link>
            </div>


          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
