export interface Project {
  project_id: string,
  name: string,
  description: string,
  coordinates: number[],
  thread_id: number,
  started_on: number,
  completed_on: number,
  dimension: string,
  pin_id?: number,
  owner: {gamertag: string, username: string, [key: string]: any},
  status: "pending" | "ongoing" | "abandoned" | "completed",
  status_since: string
}
