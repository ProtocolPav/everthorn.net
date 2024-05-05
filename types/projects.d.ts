export type ProjectJSON {
  project_id: string,
  coordinates: number[],
  description: string,
  status: string,
  content: object,
  lead_id: number,
  member_ids: number[],
  thread_id: number,
  accepted_on: string,
  completed_on: string
}