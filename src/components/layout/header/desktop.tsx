import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle
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
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/40 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={'/'}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Guidelines */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={'/guidelines'}>Guidelines</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Wiki */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Wiki</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={'grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'}>
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

                  <ListItem href={'/wiki'} title={'Project Pages'}>
                    View a list of every project page, and nothing else
                  </ListItem>

                  <ListItem href={'/map'} title={'World Map'}>
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
              <div className={'grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'}>
                <Card className={'bg-gradient-to-br from-background to-purple-400/20'}>
                  <CardHeader>
                    <h3>Admin Dashboard</h3>
                  </CardHeader>
                  <CardContent>
                    <p className={'text-sm'}>
                      The one place you need to manage everything server-related
                    </p>
                  </CardContent>
                </Card>

                <ul className={'grid'}>
                  <ListItem href={'/admin'} title={'Dashboard'}>
                    View server statistics, manage players, and more
                  </ListItem>

                  <ListItem href={'/admin/quests/editor/new'} title={'Quest Editor'} className={'bg-gradient-to-tl from-transparent to-yellow-300/10'}>
                    Create new Quests
                  </ListItem>

                  <ListItem href={'/admin/guidelines'} title={'CM Guidelines'}>
                    All you need to know to be a great Community Manager
                  </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
  )
}
