import useSWR from "swr"
import {ApiSchema} from "@/app/(admin)/admin/quests/editor/_types/api_schema";


export function useQuestList(): {quests: ApiSchema[], isError: any, isLoading: boolean} {
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
