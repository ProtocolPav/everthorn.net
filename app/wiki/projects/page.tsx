"use client"

import { Separator } from "@/components/ui/separator";
import {AllProjects} from "@/components/server/all-projects";

<<<<<<< HEAD
=======
import { Button } from "@/components/ui/button";
import { Separator} from "@/components/ui/separator";
import { Icons } from "@/components/icons"
>>>>>>> e823cae (remove unused imports)

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">

      <h1>
        Projects
      </h1>
      <Separator/>
<<<<<<< HEAD
      {/* @ts-expect-error Server Component */}
      <AllProjects />
=======
      The new Everthorn Wiki is under construction! Please be patient. <br/>
      Until then, you can use the old wiki.

      <Link href={'https://everthorn.fandom.com/wiki/Category:Projects'}>
        <Button className={'justify-between'}>
          <div className={'mr-3'}>View Projects on the Old Wiki </div>
          <Icons.external_link size={20}/>
        </Button>
      </Link>
>>>>>>> e823cae (remove unused imports)

    </section>
  )
}
