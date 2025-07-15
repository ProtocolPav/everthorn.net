"use client";

import { useState, useMemo, useEffect } from "react";
import { useProjects } from "@/hooks/use-projects";
import { usePins } from "@/hooks/use-pins";
import { usePageTitle } from "@/hooks/use-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import dynamic from "next/dynamic";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    ClockIcon,
    UserIcon,
    CheckCircleIcon,
    ExclamationMarkIcon,
    XCircleIcon,
    PauseCircleIcon,
    MapPinIcon,
    GlobeIcon,
    CaretUpDownIcon,
    MapTrifoldIcon,
    FunnelIcon,
    TargetIcon,
    PencilIcon,
    EyeIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Dynamic import for map component
const MapComponent = dynamic(() => import("../../../(no-layout)/map/_components/map"), {
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

export default function ProjectsMapDashboard() {
    const { setTitle } = usePageTitle();
    const { projects, isLoading: projectsLoading, isError: projectsError } = useProjects();
    const { pins, isLoading: pinsLoading, isError: pinsError } = usePins();

    // Set page title
    useEffect(() => {
        setTitle("Projects & Map Dashboard");
    }, [setTitle]);

    // State management
    const [activeView, setActiveView] = useState("projects");
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedPin, setSelectedPin] = useState<any>(null);

    // Filtering and sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [ownerFilter, setOwnerFilter] = useState("all");
    const [pinTypeFilter, setPinTypeFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("date_desc");

    // Dialog state
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [pinDialogOpen, setPinDialogOpen] = useState(false);

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

    // Filtering logic
    const filteredProjects = useMemo(() => {
        if (!projects || projects.length === 0) return [];

        let filtered = projects.filter((project) => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = statusFilter === "all" || project.status === statusFilter;
            const matchesOwner = ownerFilter === "all" || project.owner.username === ownerFilter;

            return matchesSearch && matchesStatus && matchesOwner;
        });

        return [...filtered].sort((a, b) => {
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
                    return new Date(b.started_on) - new Date(a.started_on);
            }
        });
    }, [projects, searchTerm, statusFilter, ownerFilter, sortOrder]);

    const filteredPins = useMemo(() => {
        if (!pins || pins.length === 0) return [];

        let filtered = pins.filter((pin) => {
            const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (pin.description && pin.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = pinTypeFilter === "all" || pin.pin_type === pinTypeFilter;

            return matchesSearch && matchesType;
        });

        return [...filtered].sort((a, b) => {
            switch (sortOrder) {
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "name_desc":
                    return b.name.localeCompare(a.name);
                default:
                    return a.name.localeCompare(b.name);
            }
        });
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

    const handleItemSelect = (item: any, type: "project" | "pin") => {
        if (type === "project") {
            setSelectedProject(item);
            setSelectedPin(null);
        } else {
            setSelectedPin(item);
            setSelectedProject(null);
        }
    };

    if (projectsError || pinsError) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <XCircleIcon size={48} className="mx-auto text-red-500 mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Error Loading Data</h2>
                    <p className="text-muted-foreground">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            {/* Left Panel - Project Management */}
            <div className="w-2/5 flex flex-col space-y-4">
                {/* Header with Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">Projects & Pins</h2>
                        <Badge variant="outline" className="text-xs">
                            {activeView === "projects" ? filteredProjects.length : filteredPins.length} items
                        </Badge>
                    </div>
                    <Button size="sm">
                        <PlusIcon size={16} className="mr-2" />
                        Add {activeView === "projects" ? "Project" : "Pin"}
                    </Button>
                </div>

                {/* View Toggle */}
                <Tabs value={activeView} onValueChange={setActiveView}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="projects" className="flex items-center gap-2">
                            <GlobeIcon size={16} />
                            Projects
                        </TabsTrigger>
                        <TabsTrigger value="pins" className="flex items-center gap-2">
                            <MapPinIcon size={16} />
                            Pins
                        </TabsTrigger>
                    </TabsList>

                    {/* Search and Filters */}
                    <div className="space-y-3 pt-4">
                        <div className="relative">
                            <MagnifyingGlassIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder={`Search ${activeView}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger className="flex-1">
                                    <CaretUpDownIcon size={16} className="mr-2" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {activeView === "projects" ? (
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

                            <Select value={activeView === "projects" ? statusFilter : pinTypeFilter}
                                    onValueChange={activeView === "projects" ? setStatusFilter : setPinTypeFilter}>
                                <SelectTrigger className="flex-1">
                                    <FunnelIcon size={16} className="mr-2" />
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {activeView === "projects" ? (
                                        <>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="ongoing">Ongoing</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="abandoned">Abandoned</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="all">All Types</SelectItem>
                                            {uniquePinTypes.map((type) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Projects List */}
                    <TabsContent value="projects" className="mt-4">
                        <ScrollArea className="h-[calc(100vh-20rem)]">
                            <div className="space-y-3 pr-4">
                                {projectsLoading ? (
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="p-4 border rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Skeleton className="w-10 h-10 rounded-full" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-3 w-full" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : filteredProjects.length === 0 ? (
                                    <div className="text-center py-8">
                                        <GlobeIcon size={32} className="mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">No projects found</p>
                                    </div>
                                ) : (
                                    filteredProjects.map((project) => {
                                        const statusConfig = getStatusConfig(project.status);
                                        const StatusIcon = statusConfig.icon;
                                        const isSelected = selectedProject?.project_id === project.project_id;

                                        return (
                                            <div
                                                key={project.project_id}
                                                className={cn(
                                                    "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                                                    "hover:bg-accent hover:border-primary/20 hover:shadow-sm",
                                                    isSelected && "bg-accent border-primary/30",
                                                    statusConfig.borderColor
                                                )}
                                                onClick={() => handleItemSelect(project, "project")}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center",
                                                        statusConfig.bgColor
                                                    )}>
                                                        <StatusIcon size={20} className={statusConfig.color} />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-sm truncate">{project.name}</h3>
                                                            <Badge variant="secondary" className={cn("text-xs", statusConfig.bgColor, statusConfig.color)}>
                                                                {project.status}
                                                            </Badge>
                                                        </div>

                                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                                            {project.description || "No description"}
                                                        </p>

                                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <UserIcon size={10} />
                                                                <span>{project.owner.username}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <ClockIcon size={10} />
                                                                <span>{formatDistanceToNow(new Date(project.started_on), { addSuffix: true })}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleProjectEdit(project);
                                                            }}
                                                        >
                                                            <PencilIcon size={14} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleItemSelect(project, "project");
                                                            }}
                                                        >
                                                            <TargetIcon size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    {/* Pins List */}
                    <TabsContent value="pins" className="mt-4">
                        <ScrollArea className="h-[calc(100vh-20rem)]">
                            <div className="space-y-3 pr-4">
                                {pinsLoading ? (
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="p-4 border rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Skeleton className="w-10 h-10 rounded-full" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-3 w-full" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : filteredPins.length === 0 ? (
                                    <div className="text-center py-8">
                                        <MapPinIcon size={32} className="mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">No pins found</p>
                                    </div>
                                ) : (
                                    filteredPins.map((pin) => {
                                        const isSelected = selectedPin?.id === pin.id;

                                        return (
                                            <div
                                                key={pin.id}
                                                className={cn(
                                                    "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                                                    "hover:bg-accent hover:border-primary/20 hover:shadow-sm",
                                                    isSelected && "bg-accent border-primary/30 shadow-sm ring-2 ring-primary/10"
                                                )}
                                                onClick={() => handleItemSelect(pin, "pin")}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/10">
                                                        <MapPinIcon size={20} className="text-blue-500" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-sm truncate">{pin.name}</h3>
                                                            <Badge variant="outline" className="text-xs">
                                                                {pin.pin_type}
                                                            </Badge>
                                                        </div>

                                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                                            {pin.description || "No description"}
                                                        </p>

                                                        <div className="text-xs text-muted-foreground">
                                                            <span>Coordinates: {pin.coordinates.join(", ")}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handlePinEdit(pin);
                                                            }}
                                                        >
                                                            <PencilIcon size={14} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleItemSelect(pin, "pin");
                                                            }}
                                                        >
                                                            <TargetIcon size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Right Panel - Map */}
            <div className="flex-1 flex flex-col">
                <Card className="h-full p-1.5 gap-1.5">
                    {selectedProject && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Selected: {selectedProject.name}
                        </Badge>
                    )}
                    {selectedPin && (
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                            Selected: {selectedPin.name}
                        </Badge>
                    )}
                    {!selectedPin && !selectedProject && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Nothing Selected
                        </Badge>
                    )}

                    <CardContent className="h-full p-0">
                        <div className="h-full rounded-lg overflow-hidden">
                            <MapComponent
                                projects={filteredProjects}
                                pins={filteredPins}
                                selectedProject={selectedProject}
                                selectedPin={selectedPin}
                                onProjectSelect={(project) => handleItemSelect(project, "project")}
                                onPinSelect={(pin) => handleItemSelect(pin, "pin")}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Project Edit Dialog */}
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

            {/* Pin Edit Dialog */}
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
