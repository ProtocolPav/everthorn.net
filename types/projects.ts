import type { UserProfile } from "./user.ts"

export interface ResponseProjectObject {
  project: {
    project_id: string,
    name: string,
    description: string,
    coordinate_x: number,
    coordinate_y: number,
    coordinate_z: number,
    thread_id: number,
    started_on: string,
    completed_on: string | null,
    owner_id: number
  },
  members: {
    members: number[]
  },
  status: {
    status: string,
    status_since: string,
  },
  content: {
    content: string,
    content_since: string,
    content_edited_by: number
  }
}

export interface ParsedProjectObject {
  project: {
    project_id: string,
    name: string,
    description: string,
    coordinate_x: number,
    coordinate_y: number,
    coordinate_z: number,
    thread_id: number,
    started_on: string,
    completed_on: string | null,
    owner_id: number
  },
  members: {
    members: UserProfile[]
  },
  status: {
    status: string,
    status_since: string,
  },
  content: {
    content: string,
    content_since: string,
    content_edited_by: number
  }
}