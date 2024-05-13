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
      <div>
        It is planned that you will be able to submit your project applications
        via the website, however this hasn't been implemented yet!
        
        If you want to submit a project application, run <Badge variant={'command'}>/project apply</Badge> on the discord!
      </div>
      <Link href={"/wiki/projects"}>
        <Button className={"justify-between"}>
          <div>Go Back</div>
        </Button>
      </Link>
    </section>
  )
}