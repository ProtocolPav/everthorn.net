import useSWR from "swr"
import {Project} from "@/types/projects";

export function useProjects(): {projects: {projects: Project[]}, isError: any, isLoading: boolean} {
    const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading } = useSWR("/nexuscore-api/v0.1/projects", fetcher)

    return {
        projects: data,
        isLoading,
        isError: error
    }
}