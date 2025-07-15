"use client";

import { useState, useMemo, useEffect } from "react";
import { useProjects } from "@/hooks/use-projects";
import { usePins } from "@/hooks/use-pins";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    PlusIcon,
    ClockIcon,
    UserIcon,
    CalendarIcon,
    CheckCircleIcon,
    ExclamationMarkIcon,
    XCircleIcon,
    PauseCircleIcon,
    MapPinIcon,
    TagIcon,
    GlobeIcon,
    SortAscendingIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Form schemas
const projectFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    status: z.enum(["pending", "ongoing", "abandoned", "completed"]),
});

const pinFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    pin_type: z.string().min(1, "Pin type is required"),
});

export default function Dashboard() {
    const { projects, isLoading: projectsLoading, isError: projectsError } = useProjects();
    const { pins, isLoading: pinsLoading, isError: pinsError } = usePins();

    // State management
    const [activeTab, setActiveTab] = useState("projects");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [ownerFilter, setOwnerFilter] = useState("all");
    const [pinTypeFilter, setPinTypeFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("date_desc");
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [pinDialogOpen, setPinDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedPin, setSelectedPin] = useState<any>(null);

    // Reset sort order when switching tabs
    useEffect(() => {
        if (activeTab === "projects") {
            setSortOrder("date_desc");
        } else {
            setSortOrder("name_asc");
        }
    }, [activeTab]);

    // Forms
    const projectForm = useForm<z.infer<typeof projectFormSchema>>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: { name: "", description: "", status: "pending" },
    });

    const pinForm = useForm<z.infer<typeof pinFormSchema>>({
        resolver: zodResolver(pinFormSchema),
        defaultValues: { name: "", description: "", pin_type: "" },
    });

    // Status configurations
    const getStatusConfig = (status: string) => {
        const configs = {
            ongoing: {
                icon: ExclamationMarkIcon,
                color: "text-pink-500",
                bgColor: "bg-pink-500/10",
                borderColor: "border-pink-500/20"
            },
            completed: {
                icon: CheckCircleIcon,
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
                borderColor: "border-orange-500/20"
            },
            abandoned: {
                icon: XCircleIcon,
                color: "text-gray-500",
                bgColor: "bg-gray-500/10",
                borderColor: "border-gray-500/20"
            },
            pending: {
                icon: PauseCircleIcon,
                color: "text-gray-500",
                bgColor: "bg-gray-500/10",
                borderColor: "border-gray-500/20"
            },
        };
        return configs[status as keyof typeof configs] || configs.pending;
    };

    // Fixed filtering logic with proper sorting
    const filteredProjects = useMemo(() => {
        if (!projects || projects.length === 0) return [];

        let filtered = projects.filter((project) => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = statusFilter === "all" || project.status === statusFilter;
            const matchesOwner = ownerFilter === "all" || project.owner.username === ownerFilter;

            return matchesSearch && matchesStatus && matchesOwner;
        });

        // Apply sorting with proper data type handling
        const sorted = [...filtered].sort((a, b) => {
            switch (sortOrder) {
                case "date_asc":
                    return new Date(a.started_on) - new Date(b.started_on);
                case "date_desc":
                    return new Date(b.started_on) - new Date(a.started_on);
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "name_desc":
                    return b.name.localeCompare(a.name);
                default:
                    return Number(b.started_on) - Number(a.started_on);
            }
        });

        return sorted;
    }, [projects, searchTerm, statusFilter, ownerFilter, sortOrder]);

    const filteredPins = useMemo(() => {
        if (!pins || pins.length === 0) return [];

        let filtered = pins.filter((pin) => {
            const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (pin.description && pin.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = pinTypeFilter === "all" || pin.pin_type === pinTypeFilter;

            return matchesSearch && matchesType;
        });

        // Apply sorting for pins
        const sorted = [...filtered].sort((a, b) => {
            switch (sortOrder) {
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "name_desc":
                    return b.name.localeCompare(a.name);
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return sorted;
    }, [pins, searchTerm, pinTypeFilter, sortOrder]);

    // Get unique values for filters
    const uniqueOwners = useMemo(() => {
        if (!projects) return [];
        return [...new Set(projects.map(p => p.owner.username))];
    }, [projects]);

    const uniquePinTypes = useMemo(() => {
        if (!pins) return [];
        return [...new Set(pins.map(p => p.pin_type))];
    }, [pins]);

    // Handlers
    const handleProjectEdit = (project: any) => {
        setSelectedProject(project);
        projectForm.reset({
            name: project.name,
            description: project.description,
            status: project.status,
        });
        setProjectDialogOpen(true);
    };

    const handlePinEdit = (pin: any) => {
        setSelectedPin(pin);
        pinForm.reset({
            name: pin.name,
            description: pin.description,
            pin_type: pin.pin_type,
        });
        setPinDialogOpen(true);
    };

    const handleProjectSubmit = async (values: z.infer<typeof projectFormSchema>) => {
        if (!selectedProject) return;
        try {
            console.log("Updating project:", selectedProject.project_id, values);
            setProjectDialogOpen(false);
        } catch (error) {
            console.error("Project update failed:", error);
        }
    };

    const handlePinSubmit = async (values: z.infer<typeof pinFormSchema>) => {
        if (!selectedPin) return;
        try {
            console.log("Updating pin:", selectedPin.id, values);
            setPinDialogOpen(false);
        } catch (error) {
            console.error("Pin update failed:", error);
        }
    };

    if (projectsError || pinsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <XCircleIcon size={48} className="mx-auto text-red-500 mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Error Loading Data</h2>
                    <p className="text-muted-foreground">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Manage your projects and pins</p>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm">
                            <PlusIcon size={16} className="mr-2" />
                            New Project
                        </Button>
                        <Button variant="outline" size="sm">
                            <PlusIcon size={16} className="mr-2" />
                            New Pin
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search projects and pins..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {/* Fixed Sort Dropdown */}
                            <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger className="w-[160px]">
                                    <SortAscendingIcon size={16} className="mr-2" />
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    {activeTab === "projects" ? (
                                        <>
                                            <SelectItem value="date_desc">Newest First</SelectItem>
                                            <SelectItem value="date_asc">Oldest First</SelectItem>
                                            <SelectItem value="name_asc">Name A-Z</SelectItem>
                                            <SelectItem value="name_desc">Name Z-A</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="name_asc">Name A-Z</SelectItem>
                                            <SelectItem value="name_desc">Name Z-A</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="abandoned">Abandoned</SelectItem>
                                </SelectContent>
                            </Select>

                            {activeTab === "projects" ? (
                                <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Owner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Owners</SelectItem>
                                        {uniqueOwners.map((owner) => (
                                            <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Select value={pinTypeFilter} onValueChange={setPinTypeFilter}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        {uniquePinTypes.map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            <Button variant="outline" size="sm">
                                <FunnelIcon size={16} className="mr-2" />
                                More Filters
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Rest of your existing tabs and content remains the same... */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="projects" className="flex items-center gap-2">
                            <GlobeIcon size={16} />
                            Projects ({filteredProjects.length})
                        </TabsTrigger>
                        <TabsTrigger value="pins" className="flex items-center gap-2">
                            <MapPinIcon size={16} />
                            Pins ({filteredPins.length})
                        </TabsTrigger>
                    </TabsList>

                    {/* Projects Tab */}
                    <TabsContent value="projects" className="space-y-4">
                        {projectsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <Card key={i} className="p-4">
                                        <Skeleton className="h-4 w-3/4 mb-3" />
                                        <Skeleton className="h-3 w-full mb-2" />
                                        <Skeleton className="h-3 w-2/3 mb-4" />
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-6 w-16" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="text-center py-12">
                                <GlobeIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {searchTerm || statusFilter !== "all" || ownerFilter !== "all"
                                        ? "Try adjusting your filters"
                                        : "Create your first project to get started"}
                                </p>
                                <Button>
                                    <PlusIcon size={16} className="mr-2" />
                                    Create Project
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProjects.map((project) => {
                                    const statusConfig = getStatusConfig(project.status);
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <Card
                                            key={project.project_id}
                                            className={cn(
                                                "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                                                statusConfig.borderColor,
                                                "hover:border-primary/30"
                                            )}
                                            onClick={() => handleProjectEdit(project)}
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <StatusIcon size={20} className={statusConfig.color} />
                                                        <Badge variant="secondary" className={cn(statusConfig.bgColor, statusConfig.color)}>
                                                            {project.status}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{project.name}</h3>
                                                    <p className="text-xs text-muted-foreground line-clamp-2 h-8">
                                                        {project.description || "No description available"}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <UserIcon size={12} />
                                                        <span className="truncate max-w-[80px]">{project.owner.username}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon size={12} />
                                                        <span>{formatDistanceToNow(new Date(project.started_on), { addSuffix: true })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>

                    {/* Pins Tab */}
                    <TabsContent value="pins" className="space-y-4">
                        {pinsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <Card key={i} className="p-4">
                                        <Skeleton className="h-4 w-3/4 mb-3" />
                                        <Skeleton className="h-3 w-full mb-2" />
                                        <Skeleton className="h-3 w-2/3 mb-4" />
                                        <Skeleton className="h-6 w-16" />
                                    </Card>
                                ))}
                            </div>
                        ) : filteredPins.length === 0 ? (
                            <div className="text-center py-12">
                                <MapPinIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No pins found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {searchTerm || pinTypeFilter !== "all"
                                        ? "Try adjusting your filters"
                                        : "Create your first pin to get started"}
                                </p>
                                <Button>
                                    <PlusIcon size={16} className="mr-2" />
                                    Create Pin
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredPins.map((pin) => (
                                    <Card
                                        key={pin.id}
                                        className="p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 hover:border-primary/30"
                                        onClick={() => handlePinEdit(pin)}
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPinIcon size={20} className="text-blue-500" />
                                                    <Badge variant="outline" className="text-xs">
                                                        {pin.pin_type}
                                                    </Badge>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    #{pin.id}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{pin.name}</h3>
                                                <p className="text-xs text-muted-foreground line-clamp-2 h-8">
                                                    {pin.description || "No description available"}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <GlobeIcon size={12} />
                                                <span>Coordinates: {pin.coordinates.join(", ")}</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Dialogs remain the same... */}
            <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Project: {selectedProject?.name}</DialogTitle>
                    </DialogHeader>
                    <Form {...projectForm}>
                        <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-4">
                            <FormField
                                control={projectForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter project name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={projectForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter project description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={projectForm.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                                <SelectItem value="abandoned">Abandoned</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" className="flex-1">Save Changes</Button>
                                <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Pin: {selectedPin?.name}</DialogTitle>
                    </DialogHeader>
                    <Form {...pinForm}>
                        <form onSubmit={pinForm.handleSubmit(handlePinSubmit)} className="space-y-4">
                            <FormField
                                control={pinForm.control}
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
                            <FormField
                                control={pinForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter pin description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={pinForm.control}
                                name="pin_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pin Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter pin type" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" className="flex-1">Save Changes</Button>
                                <Button type="button" variant="outline" onClick={() => setPinDialogOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
