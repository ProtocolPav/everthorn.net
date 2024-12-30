export interface Project {
  project_id: string,
  name: string,
  description: string,
  coordinates: number[],
  thread_id: number,
  started_on: number,
  completed_on: number,
  owner: object,
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
