"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className={"text-6xl font-extrabold"}>Under Construction!</h1>
      <Separator />
      The new Everthorn Wiki is under construction! Please be patient. <br />
      Until then, you can use the old wiki.
      <Link href={"https://everthorn.fandom.com/wiki/Everthorn_Wiki"}>
        <Button className={"justify-between"}>
          <div className={"mr-3"}>Go to the Old Wiki </div>
          <Icons.external_link size={20} />
        </Button>
      </Link>
    </section>
  )
}
