import useSWR from "swr"

export interface Player {
    gamertag: string
    location: number[]
}

export function usePlayers(): {players: Player[], isError: any, isLoading: boolean} {
    const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading } = useSWR("/localapi/api/v0.1/server/players", fetcher, {refreshInterval: 1000});

    return {
        players: data,
        isLoading,
        isError: error
    }
}