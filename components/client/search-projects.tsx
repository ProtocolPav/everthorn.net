"use client"

import { Project } from "@/types/projects"
import { SearchIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SearchProjectsProps {
  projects: Project[],
  setProjects: any
}

export default function SearchProjects({ projects, setProjects }: SearchProjectsProps) {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input type="text" placeholder="Search projects..." />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </div>
  )
}
