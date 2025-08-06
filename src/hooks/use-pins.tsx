import useSWR from "swr"
import {Pin} from "@/types/pins";

export async function patchPin(pinId: number, payload: Partial<Pin>) {
    const res = await fetch(`/nexuscore-api/v0.2/pins/${pinId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error('Failed to update pin');
    }
    return res;
}

export async function postPin(payload: Partial<Pin>) {
    const res = await fetch(`/nexuscore-api/v0.2/pins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error('Failed to create pin');
    }
    return res;
}


export function usePins(): {pins: Pin[], isError: any, isLoading: boolean, mutate: Function} {
    const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR("/nexuscore-api/v0.2/pins", fetcher);

    return {
        pins: data,
        isLoading,
        isError: error,
        mutate
    }
}