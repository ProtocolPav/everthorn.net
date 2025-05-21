import useSWR from "swr"
import {ApiSchema} from "@/app/(admin)/admin/quests/editor/_types/api_schema";


export function useQuest(id: string | undefined): {quest: ApiSchema | null, isError: any, isLoading: boolean} {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    // Don't fetch if id is "new" or undefined
    const shouldFetch = !!id && id !== "new";

    const { data, error, isLoading } = useSWR(
        shouldFetch ? `/nexuscore-api/v0.1/quests/${id}` : null,
        fetcher
    )

    return {
        quest: data,
        isLoading,
        isError: error
    }
}
