import { Project } from "@/types/projects";
import useSWR from "swr"

export function useProjects() {
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/nexuscore-api/v0.1/projects", fetcher)

  return {
    projects: data,
    isLoading,
    isError: error
  }
}
