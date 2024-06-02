"use client"

import Link from "next/link"
import { GetServerSideProps } from "next"

import { siteConfig } from "@/config/site"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import Tiptap from "@/components/editor";

import { ParsedProjectObject, ResponseProjectObject } from "@/types/projects"
import { UserProfile } from "@/types/user"
import { useEffect, useState } from "react"


async function fetchProjectData(projectID: string): Promise<ParsedProjectObject> {
  const res = await fetch(`/api/v0.1/projects/${projectID}`)

  if (!res.ok) {
    throw new Error("Failed to fetch data. Wrong project ID maybe?")
  }

  const rawData = await res.json()
  console.log(rawData)

  let parsedData = rawData;

  for (let i = 0; i < rawData!.members.members.length; i++) {
    const userRes = await fetch(`/api/v0.1/users/thorny-id/${rawData!.members.members[i]}`)

    console.log(userRes)

    if (!userRes.ok) {
      return rawData
    }

    const userProfile: UserProfile = await userRes.json()

    console.log(userProfile)

    parsedData.members.members[i] = userProfile
  }

  return parsedData
}

export default function ProjectPage({ params, }: { params: { projectID: string } }) {
  const { projectID } = params
  const [data, setData] = useState<ResponseProjectObject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchProjectData(projectID)
      .then((data) => {
        if (isMounted) {
          setData(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    }
  }, [projectID])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
            Status: {data!.status.status}
          </Badge>
          <h1 className={"text-5xl font-extrabold mt-3"}>
            {data!.project.name}
          </h1>
          <p className={"mt-3"}>{data!.project.description}</p>
          <Separator className={"w-9/10 mt-12 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Lead:</p> <p>{data!.project.owner_id}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Project Members:</p> <p>{data!.members.members}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Started On:</p> <p>{data!.project.started_on}</p>
          </div>
          <Separator className={"w-9/10 mt-3 mb-3 mx-auto"} />
          <div className={"flex grid-cols-2 justify-between"}>
            <p>Status:</p> <p>{data!.status.status}</p>
          </div>

          <Button variant={'secondary'} className={'mt-7'}>
            <Icons.discord weight={'fill'} className={'mr-1 size-6'}/>
            <p>Log In to Edit</p>
          </Button>
        </div>

        <div className="col-span-5 lg:border-l overflow-auto pt-8 pb-12 pl-8 lg:pl-12 pr-6">
          <Tiptap content={data!.content.content} editable={true}/>
        </div>
      </div>
    </div>
  )
}


// Resolve all project data and assign it to all needed variables
// async function getProjectData(id: string): Promise<GetProjectResponseJSON> {
//   // Comment this out meanwhile so we can get some dummy data going
//   let data: Promise<string> = (await fetch(`http://everthorn.net:8000/api/v0.1/projects/${id}&users-as-object=true`)).json()

//   let json: GetProjectResponseJSON = {
//     project_id: "some_project",
//     name: "Some Project",
//     coordinates: [20, 76, 100],
//     description: "Description",
//     status: 2,
//     content: "<p>Hello there</p>",
//     lead_id: 50,
//     member_ids: [44, 34, 212],
//     thread_id: 1122286933134032937,
//     accepted_on: "2024-05-02 16:20:06",
//     completed_on: "2024-07-23 10:42:34",
//     public: true
//   }

//   console.log(JSON.parse(data))

//   return json
// }

// function parseUser(ids: number[]): UserProfile[] {
//   let users: UserProfile[] = []
//   for (let i = 0; i < ids.length; i++) {
//     let json: JSON
//     fetch(`https://everthorn.net:8000/api/v1/users/thorny-id/${ids[i]}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Couldn't fetch User Data")
//         }

//         json = response.json()
//         users.push(json)
//       })
//       .catch (error => {
//         console.error(error)
//         users.push(
//           {
//             thorny_id: -1,
//             user_id: -1,
//             guild_id: -1,
//             username: "",
//             join_date: "",
//             birthday: "",
//             balance: -1,
//             active: false,
//             role: "",
//             patron: false,
//             level: -1,
//             xp: -1,
//             required_xp: -1,
//             last_message: "",
//             gamertag: "",
//             whitelist: ""
//           }
//         )
//       })
//   }

//   console.log(users)

//   return users
// }

// function parseStatus(status: number): string {
//   switch (status){
//     case 0:
//       return "Pending"
//     case 1:
//       return "Ongoing"
//     case 2:
//       return "Open"
//     case 3:
//       return "Completed"
//     default:
//       return "Unknown"
//   }
// }
