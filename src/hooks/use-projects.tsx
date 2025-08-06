import useSWR from "swr"
import {Project} from "@/types/projects";


export async function patchProject(projId: string, payload: Partial<Project>) {
    const res = await fetch(`/nexuscore-api/v0.2/projects/${projId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error('Failed to update project');
    }
    return res
}

export async function postStatus(projId: string, payload: {status: string}) {
    const res = await fetch(`/nexuscore-api/v0.2/projects/${projId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error('Failed to update project');
    }
    return res
}

export function useProjects(): {projects: Project[], isError: any, isLoading: boolean, mutate: Function} {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR("/nexuscore-api/v0.2/projects", fetcher)

    return {
        projects: data,
        isLoading,
        isError: error,
        mutate
    }
}