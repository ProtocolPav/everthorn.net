"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import {
    MapPinIcon,
    NavigationArrowIcon,
    CaretRightIcon,
    PencilIcon,
    FloppyDiskIcon,
    TrashIcon,
    CalendarIcon,
    UserIcon,
    TagIcon
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const pinFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    pin_type: z.string().min(1, "Pin type is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    visibility: z.enum(["public", "private", "shared"]),
    category: z.string().optional(),
});

interface PinCardProps {
    pin: any;
}

export function PinCard({ pin }: PinCardProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lat, lng] = pin.coordinates;
    const formattedCoords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

    const form = useForm<z.infer<typeof pinFormSchema>>({
        resolver: zodResolver(pinFormSchema),
        defaultValues: {
            name: pin?.name || "",
            description: pin?.description || "",
            pin_type: pin?.pin_type || "",
            latitude: pin?.coordinates?.[0] || 0,
            longitude: pin?.coordinates?.[1] || 0,
            visibility: pin?.visibility || "public",
            category: pin?.category || "",
        },
    });

    // Reset form when pin changes or dialog opens
    useEffect(() => {
        if (dialogOpen) {
            form.reset({
                name: pin?.name || "",
                description: pin?.description || "",
                pin_type: pin?.pin_type || "",
                latitude: pin?.coordinates?.[0] || 0,
                longitude: pin?.coordinates?.[1] || 0,
                visibility: pin?.visibility || "public",
                category: pin?.category || "",
            });
        }
    }, [pin, form, dialogOpen]);

    const getTypeConfig = (type: string) => {
        const configs = {
            farm: {
                color: "text-green-600",
                bgColor: "bg-green-100",
                dotColor: "bg-green-600"
            },
            relic: {
                color: "text-yellow-600",
                bgColor: "bg-yellow-100",
                dotColor: "bg-yellow-600"
            },
            shop: {
                color: "text-purple-600",
                bgColor: "bg-purple-100",
                dotColor: "bg-purple-600"
            },
            landmark: {
                color: "text-blue-600",
                bgColor: "bg-blue-500/10",
                dotColor: "bg-blue-500"
            },
            restaurant: {
                color: "text-orange-600",
                bgColor: "bg-orange-500/10",
                dotColor: "bg-orange-500"
            },
            hotel: {
                color: "text-pink-600",
                bgColor: "bg-pink-500/10",
                dotColor: "bg-pink-500"
            },
            default: {
                color: "text-gray-600",
                bgColor: "bg-gray-500/10",
                dotColor: "bg-gray-500"
            }
        };
        return configs[type as keyof typeof configs] || configs.default;
    };

    const typeConfig = getTypeConfig(pin.pin_type);

    const handleCardClick = () => {
        setDialogOpen(true);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDialogOpen(true);
    };

    const handleSubmit = async (values: z.infer<typeof pinFormSchema>) => {
        try {
            console.log("Updating pin:", pin.id, values);
            setDialogOpen(false);
        } catch (error) {
            console.error("Pin operation failed:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this pin?")) {
            console.log("Deleting pin:", pin.id);
            setDialogOpen(false);
        }
    };

    return (
        <>
            <Card
                className="p-4 cursor-pointer hover:shadow-md hover:border-primary/20 group"
                onClick={handleCardClick}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={cn("w-2 h-2 rounded-full", typeConfig.dotColor)} />

                                <h3 className="font-medium text-sm truncate group-hover:text-primary">
                                    {pin.name}
                                </h3>
                                <Badge variant="secondary" className={cn(
                                    "text-xs capitalize",
                                    typeConfig.bgColor,
                                    typeConfig.color
                                )}>
                                    {pin.pin_type}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {pin.description || "No description"}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <NavigationArrowIcon size={15} />
                                <span className="font-mono ml-1">{formattedCoords}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="invisible"
                            size="icon"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                            onClick={handleEditClick}
                        >
                            <PencilIcon size={14} />
                        </Button>
                        <CaretRightIcon size={16} className="text-muted-foreground group-hover:text-primary" />
                    </div>
                </div>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Pin</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Pin Info Header */}
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-lg">{pin.name}</h3>
                                <Badge variant="secondary" className={cn(
                                    "capitalize",
                                    typeConfig.bgColor,
                                    typeConfig.color
                                )}>
                                    {pin.pin_type}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon size={16} />
                                    <span className="font-mono">
                                        {pin.coordinates[0].toFixed(4)}, {pin.coordinates[1].toFixed(4)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pin Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter pin name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="pin_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pin Type</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="farm">Farm</SelectItem>
                                                        <SelectItem value="relic">Relic</SelectItem>
                                                        <SelectItem value="shop">Shop</SelectItem>
                                                        <SelectItem value="landmark">Landmark</SelectItem>
                                                        <SelectItem value="restaurant">Restaurant</SelectItem>
                                                        <SelectItem value="hotel">Hotel</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="visibility"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Visibility</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select visibility" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="public">Public</SelectItem>
                                                        <SelectItem value="private">Private</SelectItem>
                                                        <SelectItem value="shared">Shared</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter pin description"
                                                    rows={3}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="latitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Latitude</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.0001"
                                                        placeholder="0.0000"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="longitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Longitude</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.0001"
                                                        placeholder="0.0000"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter category (optional)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1 gap-2">
                                        <FloppyDiskIcon size={16} />
                                        Save Changes
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={handleDelete}
                                        className="gap-2"
                                    >
                                        <TrashIcon size={16} />
                                        Delete
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
