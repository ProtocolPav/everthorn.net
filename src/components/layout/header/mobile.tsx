// components/layout/header/mobile.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { DiscordButton } from "@/components/layout/discord/discord-button"
import {
  HouseIcon,
  IdentificationBadgeIcon,
  NewspaperClippingIcon,
  PatreonLogoIcon,
  ShieldCheckIcon,
  YoutubeLogoIcon,
  ListIcon,
  MapTrifoldIcon
} from "@phosphor-icons/react"

const navigationItems = [
  { href: '/', icon: HouseIcon, label: 'Home' },
  { href: '/guidelines', icon: ShieldCheckIcon, label: 'Guidelines' },
  { href: '/map', icon: MapTrifoldIcon, label: 'World Map' },
  { href: '/wiki', icon: NewspaperClippingIcon, label: 'Wiki' },
]

const socialButtons = [
  {
    href: '/support',
    icon: PatreonLogoIcon,
    label: 'Feed Thorny',
    className: 'bg-gradient-to-bl from-transparent to-lime-700/40',
    showLabel: true,
  },
  {
    href: '/youtube',
    icon: YoutubeLogoIcon,
    label: 'YouTube',
    size: 'icon' as const,
    showLabel: false,
  },
]

export function Mobile() {
  const { data: session, status } = useSession()
  const isCM = status === 'authenticated' && session?.user?.everthornMemberInfo.isCM
  const [isOpen, setIsOpen] = React.useState(false)

  const closePopover = () => setIsOpen(false)

  return (
      <div className="flex flex-1 items-center justify-end space-x-3 md:hidden">
        <div className={'flex'}>
          <DiscordButton />
        </div>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <ListIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-full bg-background">
            <div className="mt-5 grid justify-start gap-y-2 text-start">
              {/* Navigation Items */}
              {navigationItems.map(({ href, icon: Icon, label }) => (
                  <Link key={href} href={href}>
                    <Button
                        className="size-full justify-start"
                        variant="outline"
                        onClick={closePopover}
                    >
                      <Icon className="size-6" weight="fill" />
                      <div className="ms-2">{label}</div>
                    </Button>
                  </Link>
              ))}

              {/* Admin Link - Only for CMs */}
              {isCM && (
                  <Link href="/admin">
                    <Button
                        className="h-auto w-full justify-start bg-gradient-to-bl from-transparent to-purple-400/30"
                        variant="outline"
                        onClick={closePopover}
                    >
                      <IdentificationBadgeIcon className="size-6" weight="fill" />
                      <div className="ms-2">Admin</div>
                    </Button>
                  </Link>
              )}

              <Separator className="my-2" />

              {/* Social Buttons */}
              <div className="flex justify-center gap-4">
                {socialButtons.map(({ href, icon: Icon, label, className, size, showLabel }) => (
                    <Link key={href} href={href} target="_blank" rel="noreferrer">
                      <Button
                          className={className}
                          size={size || 'default'}
                          variant="outline"
                      >
                        <Icon className={cn("size-5", showLabel && "mr-1")} weight="fill" />
                        {showLabel && label}
                      </Button>
                    </Link>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
  )
}
