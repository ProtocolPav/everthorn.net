"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
    CalendarIcon,
    TrashIcon,
    PencilIcon,
    CaretRightIcon,
    CheckCircleIcon,
    MapPinIcon
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { InlineEditText } from "@/components/forms/inline-text-edit";
import {patchPin} from "@/hooks/use-pins";
import {InlineTypeSelect} from "@/components/forms/inline-type-select";
import {Pin} from "@/types/pins";

// ----- Pin types; adjust per your API -----
const pinFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    pin_type: z.string(),
});

const getTypeConfig = (type: string) => {
    const configs = {
        farm: {
            icon: MapPinIcon,
            color: "text-green-700",
            bgColor: "bg-green-200",
            dotColor: "bg-green-600"
        },
        shop: {
            icon: CheckCircleIcon,
            color: "text-purple-700",
            bgColor: "bg-purple-200",
            dotColor: "bg-purple-700"
        },
        landmark: {
            icon: CalendarIcon,
            color: "text-blue-700",
            bgColor: "bg-blue-200",
            dotColor: "bg-blue-700"
        },
        default: {
            icon: MapPinIcon,
            color: "text-gray-600",
            bgColor: "bg-gray-200",
            dotColor: "bg-gray-600"
        }
    }
    return configs[type as keyof typeof configs] || configs.default;
};

export function PinCard({ pin, mutate }: { pin: Pin, mutate: Function }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof pinFormSchema>>({
        resolver: zodResolver(pinFormSchema),
        defaultValues: {
            name: pin?.name || "",
            description: pin?.description || "",
            pin_type: pin?.pin_type || "farm",
        },
    });

    const typeConfig = getTypeConfig(pin.pin_type);

    // PATCH field
    async function updatePinField(updates: Partial<Pin>) {
        try {
            await patchPin(pin.id, updates);
            mutate()
            toast.success(`Updated pin "${pin.name}"`);
        } catch (err) {
            toast.error("Update failed");
            console.error("Pin update failed:", err);
        }
    }

    const handleCardClick = () => setDialogOpen(true);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDialogOpen(true);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this pin?")) {
            // Implement your deletePin logic as needed!
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
                        <div className="p-4 bg-muted/30 rounded-lg space-y-4">
                            {/* Pin Name & Type Row */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <Form {...form}>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <InlineEditText
                                                            value={field.value || ""}
                                                            onChange={async (newValue) => {
                                                                field.onChange(newValue);
                                                                await updatePinField({ name: newValue });
                                                            }}
                                                            placeholder="Pin name"
                                                            className="text-lg font-semibold"
                                                            variant="input"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Form>
                                </div>

                                {/* PinType Badge as Select */}
                                <Form {...form}>
                                    <FormField
                                        control={form.control}
                                        name="pin_type"
                                        render={({ field }) => (
                                            <InlineTypeSelect
                                                value={field.value}
                                                onChange={async (newValue) => {
                                                    field.onChange(newValue);
                                                    await updatePinField({pin_type: newValue});
                                                }}
                                                getTypeConfig={getTypeConfig}
                                            />
                                        )}
                                    />
                                </Form>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Description</label>
                                <Form {...form}>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <InlineEditText
                                                        value={field.value || ""}
                                                        onChange={async (newValue) => {
                                                            field.onChange(newValue);
                                                            await updatePinField({ description: newValue });
                                                        }}
                                                        placeholder="Enter pin description"
                                                        variant="textarea"
                                                        rows={3}
                                                        maxLength={300}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Form>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDelete}
                                className="gap-2"
                            >
                                <TrashIcon size={16} />
                                Delete Pin
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                className="ml-auto"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
