"use client"

import { Project } from "@/types/projects"
import { Input } from "../ui/input"

interface SearchProjectsProps {
  projects: Project[],
  setProjects: any
}

function search(val: string, projects: Project[], setProjects: (projects: Project[]) => any) {
  const matched = projects.filter((project) => {
    const searchWords: string[] = val.trim().toLowerCase().split(/\s+/)

    return searchWords.every((word) =>
      project.project.name.toLowerCase().includes(word) || project.project.project_id.includes(word)
    )
  })

  setProjects(matched)
}

export default function SearchProjects({ projects, setProjects }: SearchProjectsProps) {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input type="text" placeholder="Search projects..." onChange={(event) => search(event.target.value, projects, setProjects)} />
    </div>
  )
}
