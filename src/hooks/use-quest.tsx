import useSWR from "swr"
import {ApiSchema} from "@/app/(admin)/admin/quests/editor/_types/api_schema";
import {useEffect, useMemo, useState} from "react";

export function useQuest(id: string | undefined): {
    quest: { quest: ApiSchema } | null,
    isError: any,
    isLoading: boolean
} {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    // Don't fetch if id is "new" or undefined
    const shouldFetch = !!id && id !== "new";

    // Fetch basic quest data
    const { data: questData, error: questError, isLoading: questLoading } = useSWR(
        shouldFetch ? `/nexuscore-api/v0.1/quests/${id}` : null,
        fetcher
    );

    // Fetch objectives data
    const { data: objectivesData, error: objectivesError, isLoading: objectivesLoading } = useSWR(
        shouldFetch && questData ? `/nexuscore-api/v0.1/quests/${id}/objectives` : null,
        fetcher
    );

    // Create a custom SWR key for all rewards
    const rewardsKey = shouldFetch && objectivesData ?
        `rewards-for-quest-${id}` : null;

    // Fetch all rewards in a single SWR call
    const { data: rewardsData, error: rewardsError, isLoading: rewardsLoading } = useSWR(
        rewardsKey,
        async () => {
            if (!objectivesData) return {};

            // Get all objective IDs
            const objectiveIds = objectivesData.map((obj: any) => obj.objective_id);

            // Fetch rewards for all objectives in parallel
            const rewardsPromises = objectiveIds.map((objectiveId: number) =>
                fetch(`/nexuscore-api/v0.1/quests/${id}/objectives/${objectiveId}/rewards`)
                    .then(res => res.json())
                    .then(rewards => ({ objectiveId, rewards }))
            );

            // Wait for all rewards to be fetched
            const results = await Promise.all(rewardsPromises);

            // Create a map of objectiveId -> rewards
            const rewardsMap: Record<number, any[]> = {};
            results.forEach(({ objectiveId, rewards }) => {
                rewardsMap[objectiveId] = rewards;
            });

            return rewardsMap;
        },
        { shouldRetryOnError: false }
    );

    // Determine overall loading and error states
    const isLoading = shouldFetch && (questLoading || objectivesLoading || rewardsLoading);
    const isError = shouldFetch && (questError || objectivesError || rewardsError);

    // Build the complete ApiSchema
    const quest = useMemo(() => {
        if (!shouldFetch) return null;
        if (!questData || !objectivesData || !rewardsData) return null;

        // Map the objectives with their rewards
        const objectives = objectivesData.map((obj: any) => ({
            objective: obj.objective,
            display: obj.display,
            order: obj.order,
            description: obj.description,
            objective_count: obj.objective_count,
            objective_type: obj.objective_type,
            natural_block: obj.natural_block,
            objective_timer: obj.objective_timer,
            required_mainhand: obj.required_mainhand,
            location_radius: obj.location_radius,
            required_location: obj.required_location,
            rewards: rewardsData[obj.objective_id] || null
        }));

        // Build the complete ApiSchema
        const apiSchema: ApiSchema = {
            start_time: questData.start_time,
            end_time: questData.end_time,
            title: questData.title,
            description: questData.description,
            objectives: objectives
        };

        return { quest: apiSchema };
    }, [shouldFetch, questData, objectivesData, rewardsData]);

    return {
        quest,
        isLoading,
        isError
    };
}
