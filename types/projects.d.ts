export interface Project {
  project: {
    project_id: string,
    name: string,
    description: string,
    coordinates_x: number,
    coordinates_y: number,
    coordinates_z: number,
    thread_id: number,
    started_on: number,
    completed_on: number,
    owner_id: number
  },
  members: {
    members: number[]
  },
  status: {
    status: "pending" | "ongoing" | "abandoned" | "completed",
    status_since: string
  },
  content: {
    content: string,
    content_since: string,
    content_edited_by: number
  }
}
