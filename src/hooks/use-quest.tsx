import useSWR from "swr"
import {QuestSchema} from "@/types/quest";


export function useQuest(id: string | undefined): {quest: QuestSchema | null, isError: any, isLoading: boolean} {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    // Don't fetch if id is "new" or undefined
    const shouldFetch = !!id && id !== "new";

    const { data, error, isLoading } = useSWR(
        shouldFetch ? `/nexuscore-api/v0.2/quests/${id}` : null,
        fetcher
    )

    return {
        quest: data,
        isLoading,
        isError: error
    }
}
