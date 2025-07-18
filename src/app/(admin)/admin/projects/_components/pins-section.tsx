"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {MagnifyingGlassIcon, PlusIcon, MapPinIcon, FunnelIcon, GlobeIcon} from "@phosphor-icons/react";
import { PinCard } from "./pin-card";
import {ProjectCard} from "@/app/(admin)/admin/projects/_components/project-card";

interface PinsSectionProps {
    pins: any[];
    isLoading: boolean;
    onPinClick: (pin: any) => void;
    onNewPin: () => void;
}

export function PinsSection({ pins, isLoading, onPinClick, onNewPin }: PinsSectionProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredPins = useMemo(() => {
        if (!pins || pins.length === 0) return [];

        return pins.filter((pin) => {
            const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (pin.description && pin.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = typeFilter === "all" || pin.pin_type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [pins, searchTerm, typeFilter]);

    const uniqueTypes = useMemo(() => {
        if (!pins) return [];
        return [...new Set(pins.map(p => p.pin_type))];
    }, [pins]);

    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-col gap-2'}>
                <p className="text-sm text-muted-foreground mt-0 pl-1">
                    {filteredPins.length} of {pins?.length || 0} pins
                </p>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search pins..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                            <FunnelIcon size={16} />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {uniqueTypes.map((type) => (
                                <SelectItem key={type} value={type} className="capitalize">
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="h-[calc(100vh-290px)]">
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-sm text-muted-foreground">Loading pins...</p>
                    </div>
                ) : filteredPins.length === 0 ? (
                    <div className="text-center py-8">
                        <MapPinIcon size={32} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                            {searchTerm ? "No pins found" : "No pins yet"}
                        </p>
                        <Button onClick={onNewPin} variant="outline" size="sm">
                            <PlusIcon size={16} className="mr-2" />
                            Create First Pin
                        </Button>
                    </div>
                ) : (
                    <ScrollArea className="h-[calc(100vh-290px)]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-4">
                            {filteredPins.map((pin) => (
                                <PinCard
                                    key={pin.id}
                                    pin={pin}
                                    onClick={() => onPinClick(pin)}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </div>
    );
}
