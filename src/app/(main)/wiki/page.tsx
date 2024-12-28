"use client"
import Link from "next/link"

import { buttonVariants, Button } from "@/components/ui/button";
import { Separator} from "@/components/ui/separator";
import {LinkIcon} from "lucide-react";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      
      <h1>
        Under Construction!
      </h1>
      <Separator/>
      The new Everthorn Wiki is under construction! Please be patient. <br/>
      Until then, you can use the old wiki.
      
      <Link href={'https://everthorn.fandom.com/wiki/Everthorn_Wiki'}>
        <Button className={'justify-between'}>
          <div className={'mr-3'}>Go to the Old Wiki </div>
          <LinkIcon size={20} />
        </Button>
      </Link>

    </section>
  )
}