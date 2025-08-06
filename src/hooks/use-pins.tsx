import useSWR from "swr"
import {Pin} from "@/types/pins";

export function usePins(): {pins: Pin[], isError: any, isLoading: boolean} {
    const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading } = useSWR("/nexuscore-api/v0.2/pins", fetcher);

    return {
        pins: data,
        isLoading,
        isError: error
    }
}