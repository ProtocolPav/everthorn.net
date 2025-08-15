import { useState, useCallback, useMemo, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useDebounce } from './use-debounce';
import { PAGE_SIZE, buildQuery, fetcher } from '@/lib/interactions';
import type { Interaction, UIFilters, InteractionFilters } from '@/types/interactions';

export function useInteractions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [uiFilters, setUiFilters] = useState<UIFilters>({
        interaction_types: [],
        dimensions: [],
        references: [],
        thorny_ids: [],
        coordinates: [],
        coordinates_end: [],
        time_start: '',
        time_end: '',
    });
    const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);

    // Debounce the search term and filters
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedFilters = useDebounce(uiFilters, 800);

    // API filters - convert UI filters to API format
    const apiFilters = useMemo((): InteractionFilters => ({
        coordinates: uiFilters.coordinates.map(coord => {
            const parts = coord.split(',').map(p => parseFloat(p.trim()));
            return parts.length === 3 ? parts : [];
        }).filter(coord => coord.length === 3).flat(),
        coordinates_end: uiFilters.coordinates_end.map(coord => {
            const parts = coord.split(',').map(p => parseFloat(p.trim()));
            return parts.length === 3 ? parts : [];
        }).filter(coord => coord.length === 3).flat(),
        thorny_ids: uiFilters.thorny_ids,
        interaction_types: debouncedFilters.interaction_types,
        references: debouncedFilters.references,
        dimensions: debouncedFilters.dimensions,
        time_start: uiFilters.time_start,
        time_end: uiFilters.time_end,
    }), [debouncedFilters, uiFilters]);

    const getActiveFilterCount = useCallback(() => {
        let count = 0;
        if (uiFilters.interaction_types.length > 0) count++;
        if (uiFilters.dimensions.length > 0) count++;
        if (uiFilters.references.length > 0) count++;
        if (uiFilters.thorny_ids.length > 0) count++;
        if (uiFilters.coordinates.length > 0) count++;
        if (uiFilters.coordinates_end.length > 0) count++;
        if (uiFilters.time_start) count++;
        if (uiFilters.time_end) count++;
        return count;
    }, [uiFilters]);

    // SWR getKey
    const getKey = useCallback((pageIndex: number, previousPageData: any) => {
        if (previousPageData && previousPageData.length === 0) return null;
        const query = buildQuery({
            ...apiFilters,
            page: pageIndex + 1,
            page_size: PAGE_SIZE,
        });
        return `/nexuscore-api/v0.2/events/interactions?${query}`;
    }, [apiFilters]);

    const { data, size, setSize, isValidating, error, mutate } = useSWRInfinite<Interaction[]>(
        getKey,
        fetcher,
        {
            revalidateFirstPage: true,
            persistSize: true,
            dedupingInterval: 2000,
            focusThrottleInterval: 5000,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            revalidateOnFocus: isAutoRefreshEnabled, // Add this line
        }
    );

// Manual refresh all data function
    const refreshAllData = useCallback(() => {
        mutate(); // This refreshes ALL loaded pages
    }, [mutate]);

// Auto-refresh effect
    useEffect(() => {
        if (!isAutoRefreshEnabled) return;

        const interval = setInterval(() => {
            refreshAllData();
        }, 10000); // Every 10 seconds

        return () => clearInterval(interval);
    }, [refreshAllData, isAutoRefreshEnabled]);

    const interactions = data ? data.flat() : [];
    const isLoadingMore = isValidating && data && data[data.length - 1];
    const isEmpty = data?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    // Client-side filtering now includes mainhand
    const filteredInteractions = interactions

    // Handle filter change
    const handleFilterChange = useCallback((field: keyof UIFilters, value: any) => {
        setUiFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    // Clear filters
    const clearFilters = useCallback(() => {
        setUiFilters({
            interaction_types: [],
            dimensions: [],
            references: [],
            thorny_ids: [],
            coordinates: [],
            coordinates_end: [],
            time_start: '',
            time_end: '',
        });
        setSize(1);
    }, [setSize]);

    // Reset pagination when API filters change
    useEffect(() => {
        setSize(1);
    }, [apiFilters, setSize]);

    return {
        searchTerm,
        setSearchTerm,
        uiFilters,
        debouncedFilters,
        debouncedSearchTerm,
        filteredInteractions,
        getActiveFilterCount,
        handleFilterChange,
        clearFilters,
        size,
        setSize,
        isValidating,
        isLoadingMore,
        isReachingEnd,
        error,
        mutate,
        refreshAllData,
        isAutoRefreshEnabled,
        setIsAutoRefreshEnabled,
    };
}
