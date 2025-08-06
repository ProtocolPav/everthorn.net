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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import {
    CheckCircleIcon,
    ExclamationMarkIcon,
    XCircleIcon,
    PauseCircleIcon,
    CalendarIcon,
    TrashIcon,
    PencilIcon,
    CaretRightIcon,
    DiscordLogoIcon,
    CheckIcon
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {Project} from "@/types/projects";
import {patchProject, postStatus} from "@/hooks/use-projects";
import {toast} from "sonner";
import { InlineEditText } from "@/components/forms/inline-text-edit";
import { InlineStatusSelect } from "@/components/forms/inline-status-edit";

const projectFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    status: z.enum(["pending", "ongoing", "abandoned", "completed"]),
});

interface ProjectCardProps {
    project: Project;
    mutate: Function
}

export function ProjectCard({ project, mutate }: ProjectCardProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof projectFormSchema>>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
            status: project?.status || "pending",
        },
    });

    const getStatusConfig = (status: string) => {
        const configs = {
            ongoing: {
                icon: ExclamationMarkIcon,
                color: "text-pink-600",
                bgColor: "bg-pink-500/10",
                dotColor: "bg-pink-500"
            },
            completed: {
                icon: CheckCircleIcon,
                color: "text-orange-600",
                bgColor: "bg-orange-500/10",
                dotColor: "bg-orange-500"
            },
            abandoned: {
                icon: XCircleIcon,
                color: "text-gray-500",
                bgColor: "bg-gray-500/10",
                dotColor: "bg-gray-500"
            },
            pending: {
                icon: PauseCircleIcon,
                color: "text-blue-600",
                bgColor: "bg-blue-500/10",
                dotColor: "bg-blue-400"
            },
        };
        return configs[status as keyof typeof configs] || configs.pending;
    };

    const statusConfig = getStatusConfig(project.status);

    const handleCardClick = () => {
        setDialogOpen(true);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDialogOpen(true);
    };

    async function updateProjectField(updates: Partial<Project>) {
        try {
            await patchProject(project.project_id, updates);
            mutate()
            toast.success(`Updated Project "${project.name}"`)
        } catch (err) {
            console.error("Update failed:", err);
        }
    }

    async function updateStatus(status: string) {
        try {
            await postStatus(project.project_id, {status: status});
            mutate()
            toast.success(`Updated Project "${project.name}"`)
        } catch (err) {
            console.error("Update failed:", err);
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            console.log("Deleting project:", project.project_id);
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
                                <div className={cn("w-2 h-2 rounded-full", statusConfig.dotColor)} />

                                <h3 className="font-medium text-sm truncate group-hover:text-primary">
                                    {project.name}
                                </h3>
                                <Badge variant="secondary" className={cn(
                                    "text-xs",
                                    statusConfig.bgColor,
                                    statusConfig.color
                                )}>
                                    {project.status}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {project.description || "No description"}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <DiscordLogoIcon size={15} />
                                    <span>
                                        {project.owner.username}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CalendarIcon size={15} />
                                    <span>{formatDistanceToNow(new Date(project.started_on), { addSuffix: true })}</span>
                                </div>
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
                        <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="p-4 bg-muted/30 rounded-lg space-y-4">
                            {/* Project Name & Status Row */}
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
                                                                await updateProjectField({ name: newValue });
                                                            }}
                                                            placeholder="Project name"
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

                                {/* Status Badge (keep your existing InlineStatusSelect) */}
                                <Form {...form}>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <InlineStatusSelect
                                                value={field.value}
                                                onChange={async (newValue) => {
                                                    field.onChange(newValue);
                                                    await updateStatus(newValue);
                                                }}
                                                getStatusConfig={getStatusConfig}
                                            />
                                        )}
                                    />
                                </Form>
                            </div>

                            {/* Project Metadata */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <DiscordLogoIcon size={16} />
                                    <span>{project.owner.username}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon size={16} />
                                    <span>
                            Created {formatDistanceToNow(new Date(project.started_on), { addSuffix: true })}
                        </span>
                                </div>
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
                                                            await updateProjectField({ description: newValue });
                                                        }}
                                                        placeholder="Enter project description"
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
                                Delete Project
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
