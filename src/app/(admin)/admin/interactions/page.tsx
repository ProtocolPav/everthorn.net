'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, User, MapPin, Clock, Sword, Pickaxe, Cuboid, Zap, Skull, FileText, Activity } from 'lucide-react';
import { usePageTitle } from "@/hooks/use-context";
import Image from 'next/image';

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
        variant: 'red' as const,
    },
    mine: {
        label: 'Mine',
        icon: Pickaxe,
        variant: 'cyan' as const,
    },
    place: {
        label: 'Place',
        icon: Cuboid,
        variant: 'green' as const,
    },
    use: {
        label: 'Use',
        icon: Zap,
        variant: 'purple' as const,
    },
    die: {
        label: 'Die',
        icon: Skull,
        variant: 'amber' as const,
    },
    scriptevent: {
        label: 'Script Event',
        icon: FileText,
        variant: 'pink' as const,
    },
};

const dimensions = {
    'minecraft:overworld': { label: 'Overworld', img: '/map/ui/grass_block.png' },
    'minecraft:the_nether': { label: 'Nether', img: '/map/ui/netherrack.png' },
    'minecraft:the_end': { label: 'End', img: '/map/ui/endstone.png' },
};

// Build query string from filters
function buildQuery(params: Record<string, any>) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
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
            if (stringValue && (typeof value === 'number' || stringValue !== '')) {
                query.append(key, stringValue);
            }
        }
    }
    return query.toString();
}

// Custom hook for intersection observer infinite scroll
function useInfiniteScroll(callback: () => void, isLoading: boolean, hasMore: boolean) {
    const observerRef = useRef<IntersectionObserver>();
    const loadingRef = useRef<HTMLDivElement>(null);
    const lastTriggered = useRef<number>(0);
    const THROTTLE_MS = 1000;

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

// Individual interaction row
function InteractionRow({ interaction }: { interaction: any }) {
    const username = useUsername(interaction.thorny_id);
    const typeConfig = interactionTypes[interaction.type as keyof typeof interactionTypes];
    const dimensionConfig = dimensions[interaction.dimension as keyof typeof dimensions];
    const Icon = typeConfig?.icon || FileText;

    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                        {username ? username[0].toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <span className="truncate">
                        {username || <Skeleton className="w-16 h-4 inline-block" />}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                <Badge variant={typeConfig?.variant || 'outline'} className="gap-1">
                    <Icon className="w-3 h-3" />
                    {typeConfig?.label || interaction.type}
                </Badge>
            </TableCell>

            <TableCell>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                    {interaction.reference}
                </code>
            </TableCell>

            <TableCell>
                {interaction.mainhand ? (
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                        {interaction.mainhand}
                    </code>
                ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                )}
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-1">
                    <Image
                        src={dimensionConfig.img}
                        alt={dimensionConfig.label}
                        width={24}
                        height={24}
                        className="object-cover rounded-sm"
                    />
                    <code className="text-xs">
                        [{interaction.coordinates.join(', ')}]
                    </code>
                </div>
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">
                        {new Date(interaction.time).toLocaleString()}
                    </span>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function InteractionsPage() {
    const PAGE_SIZE = 50;
    const [searchTerm, setSearchTerm] = useState('');
    const { setTitle } = usePageTitle();

    // Set page title
    useEffect(() => {
        setTitle("Interactions Searching (BETA)");
    }, [setTitle]);

    // Filters state
    const [uiFilters, setUiFilters] = useState({
        interaction_types: [] as string[],
        dimensions: [] as string[],
        references: [] as string[],
    });

    // Debounce the search term and filters
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedFilters = useDebounce(uiFilters, 800);

    // API filters
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

    const { data, size, setSize, isValidating, error, mutate } = useSWRInfinite(
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
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    // Client-side filtering
    const filteredInteractions = useMemo(() => {
        if (!debouncedSearchTerm) return interactions;
        return interactions.filter(interaction =>
            interaction.reference.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            interaction.mainhand?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [interactions, debouncedSearchTerm]);

    // Infinite scroll callback
    const loadMore = useCallback(() => {
        if (!isLoadingMore && !isReachingEnd && interactions.length > 0) {
            setSize(size + 1);
        }
    }, [size, setSize, isLoadingMore, isReachingEnd, interactions.length]);

    const loadingRef = useInfiniteScroll(loadMore, !!isLoadingMore, !isReachingEnd);

    // Handle filter change
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
        setSize(1);
    }, [setSize]);

    // Reset pagination when API filters change
    useEffect(() => {
        setSize(1);
    }, [apiFilters, setSize]);

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto p-6">
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="p-4 text-center">
                            <div className="text-destructive text-lg font-medium">
                                Failed to load interactions
                            </div>
                            <p className="text-muted-foreground mt-2">{error.message}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto space-y-4">
            {/* Filters Section */}
            <div className="space-y-4">
                {/* Header with stats */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold">Filters</h2>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                        <span>{filteredInteractions.length} interactions loaded</span>
                        {(debouncedSearchTerm !== searchTerm || JSON.stringify(debouncedFilters) !== JSON.stringify(uiFilters)) && (
                            <span className="text-orange-500">Applying filters...</span>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search by reference or mainhand item..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Interaction Type</label>
                        <Select
                            value={uiFilters.interaction_types[0] || 'all'}
                            onValueChange={(value) =>
                                handleFilterChange('interaction_types', value === 'all' ? [] : [value])
                            }
                        >
                            <SelectTrigger>
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
                        <label className="text-sm font-medium">Dimension</label>
                        <Select
                            value={uiFilters.dimensions[0] || 'all'}
                            onValueChange={(value) =>
                                handleFilterChange('dimensions', value === 'all' ? [] : [value])
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All dimensions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All dimensions</SelectItem>
                                {Object.entries(dimensions).map(([key, config]) => (
                                    <SelectItem key={key} value={key}>
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={config.img}
                                                alt={config.label}
                                                width={16}
                                                height={16}
                                                className="object-cover rounded-sm"
                                            />
                                            {config.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Reference</label>
                        <Input
                            type="text"
                            value={uiFilters.references[0] || ''}
                            onChange={(e) => handleFilterChange('references', e.target.value ? [e.target.value] : [])}
                            placeholder="minecraft:dirt"
                        />
                    </div>

                    <div className="flex items-end">
                        <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="w-full"
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Interactions Table */}
            <Card className={'p-0'}>
                <CardContent className="p-0">
                    {/* Scrollable Body */}
                    <ScrollArea className="h-130 rounded-lg">
                        <Table>
                            <TableHeader className={'rounded-md'}>
                                <TableRow>
                                    <TableHead className="w-[140px]">User</TableHead>
                                    <TableHead className="w-[120px]">Action</TableHead>
                                    <TableHead>Reference</TableHead>
                                    <TableHead>Mainhand</TableHead>
                                    <TableHead className="w-[160px]">Location</TableHead>
                                    <TableHead className="w-[150px]">Time (UTC)</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody className={'pr-5'}>
                                {filteredInteractions.length === 0 && !isValidating ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                            No interactions found
                                            <br />
                                            <span className="text-sm">Try adjusting your filters or search terms</span>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        {filteredInteractions.map((interaction, index) => (
                                            <InteractionRow
                                                key={`${interaction.interaction_id}-${index}`}
                                                interaction={interaction}
                                            />
                                        ))}

                                        {/* Loading rows */}
                                        {isValidating && (
                                            <>
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <TableRow key={`loading-${i}`}>
                                                        <TableCell className="w-[140px]"><Skeleton className="h-4 w-16" /></TableCell>
                                                        <TableCell className="w-[120px]"><Skeleton className="h-6 w-20" /></TableCell>
                                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                                        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                                                        <TableCell className="w-[160px]"><Skeleton className="h-4 w-24" /></TableCell>
                                                        <TableCell className="w-[150px]"><Skeleton className="h-4 w-32" /></TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        )}

                                        {/* Infinite scroll trigger with loading indicator */}
                                        <TableRow ref={loadingRef}>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                {isValidating ? (
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                            <span className="text-sm text-muted-foreground">Loading more interactions...</span>
                                                        </div>
                                                        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                                                            <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
                                                        </div>
                                                    </div>
                                                ) : isReachingEnd && filteredInteractions.length > 0 ? (
                                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-muted-foreground text-sm">
                                            No more interactions to load
                                        </span>
                                                        <span className="text-xs text-muted-foreground/70">
                                            {filteredInteractions.length} total interactions loaded
                                        </span>
                                                    </div>
                                                ) : filteredInteractions.length === 0 && isValidating ? (
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                            <span className="text-sm text-muted-foreground">Loading interactions...</span>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>

        </div>
    );
}
