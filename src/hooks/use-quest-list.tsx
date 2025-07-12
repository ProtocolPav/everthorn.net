import useSWR from "swr"
import {APIQuestSchema} from "@/types/quest";


export function useQuestList(): {quests: APIQuestSchema[], isError: any, isLoading: boolean} {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `/nexuscore-api/v0.2/quests`,
        fetcher
    )

    return {
        quests: data,
        isLoading,
        isError: error
    }
}
