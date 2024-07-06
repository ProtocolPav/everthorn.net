"use server"

import {Project} from "@/types/projects";
import {ProjectCard} from "@/components/client/project-card";

export async function AllProjects() {
  try {
    const response = await fetch("http://everthorn.net:8000/api/v0.1/projects/")

    const projects: Project[] = (await response.json()).projects

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {
          projects.map((project) => (
            <ProjectCard project={project} />
          ))
        }
      </div>
    )
  } catch (err) {
    console.error(err)
    return <p>An error occurred... :(</p>
  }
}
