'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, User, MapPin, Clock, Sword, Pickaxe, Cuboid, Zap, Skull, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Hook to fetch username for a thorny_id
function useUsername(thornyId: number) {
    const { data, error } = useSWR(
        thornyId ? `/nexuscore-api/v0.2/users/${thornyId}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: Infinity,
            revalidateIfStale: false,
        }
    );

    if (error) return `User ${thornyId}`;
    if (!data) return null;
    return data.username || `User ${thornyId}`;
}

// Interaction type configurations
const interactionTypes = {
    kill: {
        label: 'Kill',
        icon: Sword,
        color: 'bg-red-100 text-red-800 border-red-200',
        darkColor: 'dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
    },
    mine: {
        label: 'Mine',
        icon: Pickaxe,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        darkColor: 'dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
    },
    place: {
        label: 'Place',
        icon: Cuboid,
        color: 'bg-green-100 text-green-800 border-green-200',
        darkColor: 'dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
    },
    use: {
        label: 'Use',
        icon: Zap,
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        darkColor: 'dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
    },
    die: {
        label: 'Die',
        icon: Skull,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        darkColor: 'dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
    },
    scriptevent: {
        label: 'Script Event',
        icon: FileText,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        darkColor: 'dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
    },
};

const dimensions = {
    'minecraft:overworld': { label: 'Overworld', emoji: '🌍' },
    'minecraft:the_nether': { label: 'Nether', emoji: '🔥' },
    'minecraft:the_end': { label: 'End', emoji: '🌌' },
};

// Build query string from filters
function buildQuery(params: Record<string, any>) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            // Only add arrays that have items
            if (value.length > 0) {
                value.forEach((v) => {
                    const stringValue = String(v).trim();
                    if (stringValue) {
                        query.append(key, stringValue);
                    }
                });
            }
        } else if (value !== undefined && value !== null) {
            const stringValue = String(value).trim();
            // Only add non-empty strings, or numbers (including 0)
            if (stringValue && (typeof value === 'number' || stringValue !== '')) {
                query.append(key, stringValue);
            }
        }
    }
    return query.toString();
}

// Custom hook for intersection observer infinite scroll with throttling
function useInfiniteScroll(callback: () => void, isLoading: boolean, hasMore: boolean) {
    const observerRef = useRef<IntersectionObserver>();
    const loadingRef = useRef<HTMLDivElement>(null);
    const lastTriggered = useRef<number>(0);
    const THROTTLE_MS = 1000; // Prevent rapid fire requests

    useEffect(() => {
        if (isLoading || !hasMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const now = Date.now();
                    if (now - lastTriggered.current > THROTTLE_MS) {
                        lastTriggered.current = now;
                        callback();
                    }
                }
            },
            { threshold: 0.1 }
        );

        const currentElement = loadingRef.current;
        if (currentElement) {
            observerRef.current.observe(currentElement);
        }

        return () => {
            if (observerRef.current && currentElement) {
                observerRef.current.unobserve(currentElement);
            }
        };
    }, [callback, isLoading, hasMore]);

    return loadingRef;
}

export default function InteractionsPage() {
    const PAGE_SIZE = 25;
    const [searchTerm, setSearchTerm] = useState('');

    // Filters state - separate from API filters to prevent immediate requests
    const [uiFilters, setUiFilters] = useState({
        interaction_types: [] as string[],
        dimensions: [] as string[],
        references: [] as string[],
    });

    // Debounce the search term and filters to prevent spam
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedFilters = useDebounce(uiFilters, 800);

    // API filters - only update when debounced values change
    const apiFilters = useMemo(() => ({
        coordinates: [],
        coordinates_end: [],
        thorny_ids: [],
        interaction_types: debouncedFilters.interaction_types,
        references: debouncedSearchTerm ? [debouncedSearchTerm] : debouncedFilters.references,
        dimensions: debouncedFilters.dimensions,
        time_start: '',
        time_end: '',
    }), [debouncedSearchTerm, debouncedFilters]);

    // SWR getKey with debounced filters
    const getKey = useCallback((pageIndex: number, previousPageData: any) => {
        if (previousPageData && previousPageData.length === 0) return null;
        const query = buildQuery({
            ...apiFilters,
            page: pageIndex + 1,
            page_size: PAGE_SIZE,
        });
        return `/nexuscore-api/v0.2/events/interactions?${query}`;
    }, [apiFilters]);

    const { data, size, setSize, isValidating, error, mutate } = useSWRInfinite(
        getKey,
        fetcher,
        {
            revalidateFirstPage: false,
            persistSize: true,
            dedupingInterval: 2000, // Prevent duplicate requests for 2 seconds
            focusThrottleInterval: 5000, // Throttle focus revalidation
        }
    );

    const interactions = data ? data.flat() : [];
    const isLoadingMore = isValidating && data && data[data.length - 1];
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    // Client-side filtering only for search when not using API search
    const filteredInteractions = useMemo(() => {
        if (!debouncedSearchTerm) return interactions;
        return interactions.filter(interaction =>
            interaction.reference.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            interaction.mainhand?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [interactions, debouncedSearchTerm]);

    // Infinite scroll callback with additional safety
    const loadMore = useCallback(() => {
        if (!isLoadingMore && !isReachingEnd && interactions.length > 0) {
            setSize(size + 1);
        }
    }, [size, setSize, isLoadingMore, isReachingEnd, interactions.length]);

    const loadingRef = useInfiniteScroll(loadMore, !!isLoadingMore, !isReachingEnd);

    // Handle filter change - only update UI state, don't trigger immediate API call
    const handleFilterChange = useCallback((field: string, value: any) => {
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
        // Reset pagination when filters change
        setSize(1);
    }, [setSize]);

    // Reset pagination when API filters change
    useEffect(() => {
        setSize(1);
    }, [apiFilters, setSize]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-7xl mx-auto p-6">
                    <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
                        <CardContent className="p-6 text-center">
                            <div className="text-red-600 dark:text-red-400 text-lg font-medium">
                                Failed to load interactions
                            </div>
                            <p className="text-red-500 dark:text-red-300 mt-2">{error.message}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Live Interactions
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Monitor all player interactions across dimensions in real-time
                    </p>
                    <div className="flex justify-center items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                        <div>{filteredInteractions.length} interactions loaded</div>
                        {(debouncedSearchTerm !== searchTerm || JSON.stringify(debouncedFilters) !== JSON.stringify(uiFilters)) && (
                            <div className="text-orange-500">Applying filters...</div>
                        )}
                    </div>
                </div>

                {/* Search and Filters */}
                <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Search by reference or mainhand item... (debounced)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 text-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                                />
                            </div>

                            {/* Filter Controls */}
                            <div className="flex flex-wrap gap-4 items-end">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Interaction Type
                                    </label>
                                    <Select
                                        value={uiFilters.interaction_types[0] || 'all'}
                                        onValueChange={(value) =>
                                            handleFilterChange('interaction_types', value === 'all' ? [] : [value])
                                        }
                                    >
                                        <SelectTrigger className="w-40 bg-white dark:bg-slate-900">
                                            <SelectValue placeholder="All types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All types</SelectItem>
                                            {Object.entries(interactionTypes).map(([key, config]) => (
                                                <SelectItem key={key} value={key}>
                                                    <div className="flex items-center gap-2">
                                                        <config.icon className="w-4 h-4" />
                                                        {config.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Dimension
                                    </label>
                                    <Select
                                        value={uiFilters.dimensions[0] || 'all'}
                                        onValueChange={(value) =>
                                            handleFilterChange('dimensions', value === 'all' ? [] : [value])
                                        }
                                    >
                                        <SelectTrigger className="w-40 bg-white dark:bg-slate-900">
                                            <SelectValue placeholder="All dimensions" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All dimensions</SelectItem>
                                            {Object.entries(dimensions).map(([key, config]) => (
                                                <SelectItem key={key} value={key}>
                                                    <div className="flex items-center gap-2">
                                                        <span>{config.emoji}</span>
                                                        {config.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Reference
                                    </label>
                                    <Input
                                        type="text"
                                        value={uiFilters.references[0] || ''}
                                        onChange={(e) => handleFilterChange('references', e.target.value ? [e.target.value] : [])}
                                        placeholder="minecraft:dirt"
                                        className="w-48 bg-white dark:bg-slate-900"
                                    />
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="h-10"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Interactions List */}
                <div className="space-y-4">
                    {filteredInteractions.length === 0 && !isValidating && (
                        <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                            <CardContent className="p-12 text-center">
                                <div className="text-slate-400 text-lg">No interactions found</div>
                                <p className="text-slate-500 mt-2">Try adjusting your filters or search terms</p>
                            </CardContent>
                        </Card>
                    )}

                    {filteredInteractions.map((interaction, index) => (
                        <InteractionCard
                            key={`${interaction.interaction_id}-${index}`}
                            interaction={interaction}
                        />
                    ))}

                    {/* Loading indicator for infinite scroll */}
                    <div ref={loadingRef} className="py-4">
                        {isValidating && (
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Card key={i} className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Skeleton className="h-10 w-10 rounded-full" />
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-24" />
                                                            <Skeleton className="h-3 w-16" />
                                                        </div>
                                                    </div>
                                                    <Skeleton className="h-6 w-20" />
                                                </div>
                                                <Skeleton className="h-4 w-full" />
                                                <div className="flex justify-between">
                                                    <Skeleton className="h-3 w-32" />
                                                    <Skeleton className="h-3 w-28" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {isReachingEnd && filteredInteractions.length > 0 && (
                        <div className="text-center py-8">
                            <div className="text-slate-400">No more interactions to load</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Individual interaction card
function InteractionCard({ interaction }: { interaction: any }) {
    const username = useUsername(interaction.thorny_id);
    const typeConfig = interactionTypes[interaction.type as keyof typeof interactionTypes];
    const dimensionConfig = dimensions[interaction.dimension as keyof typeof dimensions];
    const Icon = typeConfig?.icon || FileText;

    return (
        <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-6">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                        {/* Avatar & User Info */}
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {username ? username[0].toUpperCase() : <User className="w-6 h-6" />}
                            </div>
                        </div>

                        <div className="space-y-3 flex-1">
                            {/* Header */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="font-semibold text-slate-900 dark:text-slate-100">
                                    {username || <Skeleton className="w-20 h-5 inline-block" />}
                                </div>
                                <div className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border",
                                    typeConfig?.color,
                                    typeConfig?.darkColor
                                )}>
                                    <Icon className="w-3 h-3" />
                                    {typeConfig?.label || interaction.type}
                                </div>
                                {dimensionConfig && (
                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs">
                                        <span>{dimensionConfig.emoji}</span>
                                        <span className="text-slate-600 dark:text-slate-300">
                                            {dimensionConfig.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Cuboid className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                                        {interaction.reference}
                                    </span>
                                </div>
                                {interaction.mainhand && (
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <Zap className="w-4 h-4 flex-shrink-0" />
                                        <span>Mainhand: </span>
                                        <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                                            {interaction.mainhand}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location & Time */}
                    <div className="text-right space-y-2 flex-shrink-0">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                                [{interaction.coordinates.join(', ')}]
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs">
                                {new Date(interaction.time).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
