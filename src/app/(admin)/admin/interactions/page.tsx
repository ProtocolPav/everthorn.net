'use client';

import React, { useEffect, useCallback } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { usePageTitle } from "@/hooks/use-context";
import { useInteractions } from '@/hooks/use-interactions';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { InteractionRow } from '@/components/features/interactions/interaction-row';
import { interactionTypes, dimensions } from '@/lib/interactions';

export default function InteractionsPage() {
    const { setTitle } = usePageTitle();
    const {
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
    } = useInteractions();

    // Set page title
    useEffect(() => {
        setTitle("Interactions Searching (BETA)");
    }, [setTitle]);

    // Infinite scroll callback
    const loadMore = useCallback(() => {
        if (!isLoadingMore && !isReachingEnd && filteredInteractions.length > 0) {
            setSize(size + 1);
        }
    }, [size, setSize, isLoadingMore, isReachingEnd, filteredInteractions.length]);

    const loadingRef = useInfiniteScroll(loadMore, !!isLoadingMore, !isReachingEnd);

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
        <div className="grid gap-3">
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
            <Card className="p-0">
                <CardContent className="p-0">
                    <ScrollArea className="h-130 rounded-lg overflox-x-auto">
                        <Table>
                            <TableHeader className="rounded-md">
                                <TableRow>
                                    <TableHead className="w-[140px]">User</TableHead>
                                    <TableHead className="w-[120px]">Action</TableHead>
                                    <TableHead>Reference</TableHead>
                                    <TableHead>Mainhand</TableHead>
                                    <TableHead className="w-[160px]">Location</TableHead>
                                    <TableHead className="w-[150px]">Time</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="pr-5">
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

                                        {/* Infinite scroll trigger */}
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

                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
