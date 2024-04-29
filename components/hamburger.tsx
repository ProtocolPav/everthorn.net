import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function HamburgerNav({ items }: MainNavProps) {
  return (
    <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
      <nav className="flex items-center space-x-5">
        <Link href={siteConfig.links.patreon} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              variant: "default",
            })}
          >
            <Icons.discord className="size-6" weight={"fill"} />
            <div className="mx-1">Log In</div>
          </div>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className={"flex md:hidden"}
            >
              <Icons.hamburgermenu className={"size-5"} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className={"mt-10"}>
              {items?.length ? (
                <nav className="grid gap-y-2">
                  {items?.map(
                    (item, index) =>
                      item.href && (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          <SheetClose asChild>
                            <Button
                              variant={"ghost"}
                              className={
                                "w-full justify-start text-xl font-medium text-muted-foreground"
                              }
                            >
                              {item.title}
                            </Button>
                          </SheetClose>
                        </Link>
                      )
                  )}
                </nav>
              ) : null}
            </SheetHeader>

            <div className={"items-left mt-5 grid gap-y-2"}>
              <Link href={siteConfig.links.patreon} target={"_blank"}>
                <Button
                  className={"h-auto justify-between"}
                  variant={"outline"}
                >
                  <Icons.patreon className={"size-6"} weight={"fill"} />{" "}
                  <div className="ms-2">Feed Thorny </div>
                </Button>
              </Link>

              <Link href={siteConfig.links.youtube} target={"_blank"}>
                <Button
                  className={"h-auto justify-between"}
                  variant={"outline"}
                >
                  <Icons.youtube className={"size-6"} weight={"fill"} />{" "}
                  <div className="ms-2">Everthorn Youtube </div>
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}
