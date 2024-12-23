import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {useSession} from "next-auth/react";


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
      <li>
        <NavigationMenuLink asChild>
          <a
              ref={ref}
              className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  className
              )}
              {...props}
          >
            <div className="text-sm font-medium leading-none text-foreground">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
  )
})
ListItem.displayName = "ListItem"


export function Desktop() {
  const { data: session, status } = useSession()
  const CMcheck = status === 'authenticated' && session?.user?.everthornMemberInfo.isCM

  return (
      <NavigationMenu className={'hidden md:flex'} delayDuration={50}>
        <NavigationMenuList>
          {/* Home */}
          <NavigationMenuItem>
            <Link href={'/'}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Guidelines */}
          <NavigationMenuItem>
            <Link href={'/guidelines'}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Guidelines
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Wiki */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Wiki</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={'grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'}>
                <Card className={'bg-gradient-to-bl from-background to-cyan-400/20'}>
                  <CardHeader>
                    <h3>Everthorn Wiki</h3>
                  </CardHeader>
                  <CardContent>
                    <p className={'text-sm'}>
                      The one-stop-shop for everything Everthorn. <br/>
                      View, edit or create new pages. Write to your heart's content
                    </p>
                  </CardContent>
                </Card>

                <ul className={'grid'}>
                  <ListItem href={'/wiki'} title={'Wiki Homepage'}>
                    Enter the main Everthorn Wiki, the place to see everything
                  </ListItem>

                  <ListItem href={'/wiki/projects'} title={'Project Pages'}>
                    View a list of every project page, and nothing else
                  </ListItem>

                  <ListItem href={'/wiki/map'} title={'World Map'}>
                    View an interactive world map of our current world
                  </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Admin */}
          <NavigationMenuItem className={cn(CMcheck ? '': 'hidden')}>
            <NavigationMenuTrigger>Admin Dashboard</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={'grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'}>
                <Card className={'bg-gradient-to-br from-background to-purple-400/20'}>
                  <CardHeader>
                    <h3>Admin Dashboard</h3>
                  </CardHeader>
                  <CardContent>
                    <p className={'text-sm'}>
                      Community Managers only. <br/>
                      The one place you need to manage everything server-related
                    </p>
                  </CardContent>
                </Card>

                <ul className={'grid'}>
                  <ListItem href={'/admin'} title={'Dashboard'}>
                    The main dashboard. You can view server stats and more
                  </ListItem>

                  <ListItem href={'/admin/quests/new'} title={'Quest Creator'}>
                    Quick link to Quest Creator. Also accessible via dashboard
                  </ListItem>

                  <ListItem href={'/admin/guidelines'} title={'CM Guidelines'}>
                    Quick link to CM Guidelines. Also accessible via dashboard
                  </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
  )
}
