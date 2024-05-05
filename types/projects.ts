import type UserProfile from "./user.ts"

export interface GetProjectResponseJSON {
  project_id: string,
  name: string,
  coordinates: number[],
  description: string,
  status: number,
  content: string,
  lead_id: number,
  member_ids: number[],
  thread_id: number,
  accepted_on: string,
  completed_on: string,
  public: boolean
}

export interface ParsedProjectObject {
	name: string,
	status: string,
	coordinates: number[],
	description: string,
	content: string,
	lead_user: UserProfile,
	members: UserProfile[],
	started_on: string,
}