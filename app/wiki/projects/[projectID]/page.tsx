"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import Tiptap from "@/components/editor";

import GetProjectResponseJSON from "@/types/projects.ts"

export default function ProjectPage({
  params,
}: {
  params: { projectID: string }
}) {
  const data: GetProjectResponseJSON = getProjectData(params.projectID)
  return (
    <div className="max-w-8xl mx-auto px-4 lg:px-8 xl:px-12 w-full flex flex-col flex-grow">
      <div className="lg:grid grid-cols-8">
        <div className="lg:sticky lg:top-0 self-start col-span-3 pr-8 lg:pr-12 py-6 pl-6 min-h-fit">
          <Button variant={"link"}>
            <Icons.arrow_left size={18} />
            <div className={"ms-2"}>Back to Projects</div>
          </Button>
          <br />
          <Badge variant={"outline"} className={"mx-1 mt-5"}>
            New Project!
          </Badge>
          <Badge variant={"outline"} className={"mx-1"}>
            Status: {data.status}
          </Badge>
          <h1 className={"text-5xl font-extrabold mt-3"}>
            {data.name}
          </h1>
          <p className={"mt-3"}>{data.description}</p>
          <Separator className={"w-9/10 mt-12 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Lead:</p> <p>{data.lead_id}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Members:</p> <p>{data.member_ids}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Started On:</p> <p>{data.accepted_on}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Status:</p> <p>{data.status}</p>
          </div>

          <Button variant={'secondary'} className={'mt-7'}>
            <Icons.discord weight={'fill'} className={'mr-1 size-6'}/>
            <p>Log In to Edit</p>
          </Button>
        </div>

        <div className="col-span-5 lg:border-l overflow-auto pt-8 pb-12 pl-8 lg:pl-12 pr-6">
          <Tiptap content={data.content} editable={true}/>
        </div>
      </div>
    </div>
  )
}

// Resolve all project data and assign it to all needed variables
const getProjectData = (id: string): GetProjectResponseJSON => {
  // Comment this out meanwhile so we can get some dummy data going
  // let json = (await fetch(`http://nexuscore:8000/v1/api/projects/${id}`)).json()

  let json: GetProjectResponseJSON = {
    project_id: "some_project",
    name: "Some Project",
    coordinates: [20, 76, 100],
    description: "Description",
    status: 2,
    content: "<p>Hello there</p>",
    lead_id: 50,
    member_ids: [44, 34, 212],
    thread_id: 1122286933134032937,
    accepted_on: "2024-05-02 16:20:06",
    completed_on: "2024-07-23 10:42:34"
  }

  return json

  // Temp data that will be updated later by the JSON as we said

  // parse json data
  // Ideally, we'd assign all the variables here
  // projectName = json.projectName
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
