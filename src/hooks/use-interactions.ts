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
    });

    // Debounce the search term and filters
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedFilters = useDebounce(uiFilters, 800);

    // API filters
    const apiFilters = useMemo((): InteractionFilters => ({
        coordinates: [],
        coordinates_end: [],
        thorny_ids: [],
        interaction_types: debouncedFilters.interaction_types,
        references: debouncedSearchTerm ? [debouncedSearchTerm] : debouncedFilters.references,
        dimensions: debouncedFilters.dimensions,
        time_start: '',
        time_end: '',
    }), [debouncedSearchTerm, debouncedFilters]);

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
            revalidateFirstPage: false,
            persistSize: true,
            dedupingInterval: 2000,
            focusThrottleInterval: 5000,
        }
    );

    const interactions = data ? data.flat() : [];
    const isLoadingMore = isValidating && data && data[data.length - 1];
    const isEmpty = data?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    // Client-side filtering
    const filteredInteractions = useMemo(() => {
        if (!debouncedSearchTerm) return interactions;
        return interactions.filter(interaction =>
            interaction.reference.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            interaction.mainhand?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [interactions, debouncedSearchTerm]);

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
        });
        setSearchTerm('');
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
        handleFilterChange,
        clearFilters,
        size,
        setSize,
        isValidating,
        isLoadingMore,
        isReachingEnd,
        error,
        mutate,
    };
}
