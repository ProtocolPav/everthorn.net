"use client"

import { Project } from "@/types/projects";
import { ProjectCard } from "@/components/client/project-card";
import { useEffect, useState } from "react";
import SearchProjects from "./search-projects";

export function AllProjects() {
  try {
    const [loading, setLoading] = useState<boolean>(true)

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      fetch("/nexuscore-api/v0.1/projects")
        .then((res) => res.json())
        .then((data) => {
          setProjects(data.projects)
          setLoading(false)
        })
    })

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <>
        <SearchProjects projects={projects} setProjects={setProjects} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {
            projects.map((project) => (
              <ProjectCard project={project} key={project.project.project_id} />
            ))
          }
        </div>
      </>
    )
  } catch (err) {
    console.error(err)
    return <p>An error occurred... :(</p>
  }
}
