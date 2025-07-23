"use client";

import { useState } from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {FloppyDiskIcon, PencilIcon, XIcon, MapTrifoldIcon, GlobeIcon, MapPinIcon, PlusIcon} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import {TabsList, TabsTrigger} from "@/components/ui/tabs";

const MapComponent = dynamic(() => import("./project_map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
                <MapTrifoldIcon size={48} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
        </div>
    ),
});

export function MapCard() {
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {
        console.log("Saving map changes...");
        setIsEditMode(false);
    };

    const handleCancel = () => {
        setIsEditMode(false);
    };

    return (
        <Card className={'p-3 h-full gap-2'}>
            <CardHeader className={'p-0'}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-base font-semibold">Interactive Map</h2>
                            {isEditMode && (
                                <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                                    Edit Mode
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center text-center gap-2">
                        {!isEditMode ? (
                            <Button onClick={handleEdit} size="sm">
                                <PencilIcon size={16} className="mr-2" />
                                Edit
                            </Button>
                        ) : (
                            <>
                                <p className={'text-xs mt-0'}>
                                    Changes will be saved automatically.
                                </p>

                                <Button onClick={handleCancel} size="sm">
                                    <XIcon size={16} className="mr-2" />
                                    Exit Edit Mode
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </CardHeader>

            {/* Map Content */}
            <CardContent className="p-0 h-[calc(100%)]">
                <div className={cn(
                    "h-full rounded-lg overflow-hidden transition-all duration-300",
                    isEditMode && "ring-3 ring-orange-500/40"
                )}>
                    <MapComponent editMode={isEditMode} />
                </div>
            </CardContent>
        </Card>
    );
}