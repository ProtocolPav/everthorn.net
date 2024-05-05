"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import Tiptap from "@/components/editor";

export default function ProjectPage({
  params,
}: {
  params: { projectID: string }
}) {
  const data = getProjectData(params.projectID)
  return (
    <div className="max-w-8xl mx-auto px-4 lg:px-8 xl:px-12 w-full flex flex-col flex-grow">
      <div className="lg:grid grid-cols-8">
        <div className="lg:sticky lg:top-0 self-start col-span-3 pr-8 lg:pr-12 py-6 pl-6">
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
            {project_name}
          </h1>
          <Separator className={"w-9/10 mt-12 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Lead:</p> <p>{project_lead}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Members:</p> <p>{project_members}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Started On:</p> <p>{project_date}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Status:</p> <p>{project_status}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Type:</p> <p>{project_type}</p>
          </div>

          <Button variant={'secondary'} className={'mt-7'}>
            <Icons.discord weight={'fill'} className={'mr-1 size-6'}/>
            <p>Log In to Edit</p>
          </Button>
        </div>

        <div className="col-span-5 lg:border-l overflow-auto pt-8 pb-12 pl-8 lg:pl-12 pr-6">
          <Tiptap content={project_content} editable={true}/>
        </div>
      </div>
    </div>
  )
}

  let project_date = 'date'
  let project_members = ['members', 'people']
  let project_name = "Project Name"
  let project_lead = "Someone"
  let project_type = "Something"
  let project_status = "Some Status"

  let project_content = `<p>TipTapEditor class will go here, with content
  that is auto-got from the DB via a HTTP GET request to NexusCore.
  The edit button has been added. I will now add a lorem ipsum.
  Technically, both the side panel and main content are editable, but
  for projects the side panel will not be edited, and rather auto-generated
  from project info.
  <br/><br/>

  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor. Incididunt ut labore et dolore magna aliqua ut enim ad. Minim veniam quis nostrud exercitation ullamco laboris.

  Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut. Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.

  Dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut. Odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia.

  Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat. Voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut.

  Aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel. Illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero.
  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor. Incididunt ut labore et dolore magna aliqua ut enim ad. Minim veniam quis nostrud exercitation ullamco laboris.

  Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut. Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.

  Dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut. Odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia.

  Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat. Voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut.

  Aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel. Illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero.

  </p>`

// Resolve all project data and assign it to all needed variables
const getProjectData = async (id: string) => {
  try {
    let json = (await fetch(`https://path/to/api/${id}`)).json()

    // Temp data that will be updated later by the JSON as we said

    // parse json data
    // Ideally, we'd assign all the variables here
    // projectName = json.projectName
  } catch(error) {
    console.error(error)
  }
}

// Most of this resolve functions are all placeholders.
// The true one for all data resolver is getProjectData
const startedOn: () => Promise<string> = async () => {
  const dateObject: Date = new Date()
  const currentDate: string = `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`

  return currentDate
}

const projectMembersString = async () => {
  let string: string = ""

  for (let i = 0; i < project_members.length; i++) {
    string += project_members[i]

    if (i !== project_members.length - 1) {
      string += ", "
    }
  }

  return string
}
