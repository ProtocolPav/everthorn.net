import useSWR from "swr"
import {Project} from "@/types/projects";

export function useProjects(): {projects: {projects: Project[]}, isError: any, isLoading: boolean} {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR("/nexuscore-api/v0.2/projects", fetcher)

    return {
        projects: data,
        isLoading,
        isError: error
    }
}