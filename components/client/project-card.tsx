"use client"

import { Project } from "@/types/projects";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface projectCardProps {
  project: Project
}

export function ProjectCard({ project }: projectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.project.name}</CardTitle>
        <CardDescription>{project.project.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
