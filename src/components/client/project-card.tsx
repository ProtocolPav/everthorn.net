import { Project } from "@/types/projects";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

interface projectCardProps {
    project: Project,
}

export function ProjectCard({ project }: projectCardProps) {
  return (
      <Card>
        <Link href={`/src/app/(main)/wiki/projects/${project.project.project_id}`}>
          <CardHeader>
            <CardTitle>{project.project.name}</CardTitle>
            <CardDescription>{project.project.description}</CardDescription>
          </CardHeader>
        </Link>
      </Card>
  )
}
