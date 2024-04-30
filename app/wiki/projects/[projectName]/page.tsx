"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export default function ProjectPage({
  params,
}: {
  params: { projectName: string }
}) {
  return (
    <div className="max-w-8xl mx-auto px-4 lg:px-8 xl:px-12 w-full flex flex-col flex-grow">
      <div className="lg:grid grid-cols-8">
        <div className="lg:sticky lg:top-20 self-start col-span-3 pr-8 lg:pr-12 py-6 pl-6">
          <Button variant={"link"}>
            <Icons.arrow_left size={18} />
            <div className={"ms-2"}>Back to Projects</div>
          </Button>
          <br />
          <Badge variant={"outline"} className={"mx-1 mt-5"}>
            New Project!
          </Badge>
          <Badge variant={"outline"} className={"mx-1"}>
            Status: Ongoing
          </Badge>
          <h1 className={"text-5xl font-extrabold mt-3"}>
            {params.projectName}
          </h1>
          <Separator className={"w-9/10 mt-12 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Lead:</p> <p>ProtocolPav</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Members:</p> <p>ProtocolPav, cakePhone, Jake</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Started On:</p> <p>21/04/2022</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Status:</p> <p>Ongoing</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Type:</p> <p>Town</p>
          </div>

          <div className={'mt-7'}>
            <Button variant={'secondary'}>
              <Icons.discord weight={'fill'} size={26} className={'mr-2'}/>
              <p>Log In to Edit</p>
            </Button>
          </div>
        </div>

        <div className="col-span-5 lg:border-l overflow-auto pt-8 pb-12 pl-8 lg:pl-12 pr-6">
          TipTapEditor class will go here, with content
          that is auto-got from the DB via a HTTP GET request to NexusCore.
          The edit button has been added. I will now add a lorem ipsum.<br/><br/>

          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor. Incididunt ut labore et dolore magna aliqua ut enim ad. Minim veniam quis nostrud exercitation ullamco laboris.

          Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut. Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.

          Dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut. Odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia.

          Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat. Voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut.

          Aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel. Illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero.


        </div>
      </div>
    </div>
  )
}
