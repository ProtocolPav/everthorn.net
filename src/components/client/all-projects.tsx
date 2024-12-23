"use client"

import { Project } from "@/types/projects";
import { ProjectCard } from "@/components/client/project-card";
import { useEffect, useState } from "react";
import SearchProjects from "./search-projects";
import { useProjects } from "@/lib/everthorn-api-hooks/projects";

export function AllProjects() {
  const { projects, isLoading, isError } = useProjects()

  const [filtered, setFiltered] = useState<Project[]>([])

  useEffect(() => {
    if (projects !== undefined) setFiltered(projects.projects)
  }, [projects, isLoading, isError])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(isError.error)
    return <p>An error occurred... :(</p>
  }

  return (
    <>
      <SearchProjects projects={projects.projects} setProjects={setFiltered} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {
          filtered.map((project) => (
            <ProjectCard project={project} key={project.project.project_id} />
          ))
        }
      </div>
    </>
  )
}
