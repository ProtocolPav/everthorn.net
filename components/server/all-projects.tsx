import {Project} from "@/types/projects";
import {ProjectCard} from "@/components/client/project-card";

export async function AllProjects() {
  const response = await fetch("http://everthorn.net:8282/api/v0.1/projects/solaris")

  console.log(response)

  if (!response.ok) {
    return undefined
  }

  const project: Project = await response.json()

  const projects: Project[] = new Array(10).fill(project)

  console.log(project)

  return (
    <>
      {
        projects.map((project) => (
          <ProjectCard project={project} />
        ))
      }
    </>
  )
}
