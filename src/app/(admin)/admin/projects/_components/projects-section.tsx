"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, PlusIcon, GlobeIcon, FunnelIcon } from "@phosphor-icons/react";
import { ProjectCard } from "./project-card";

interface ProjectsSectionProps {
    projects: any[];
    isLoading: boolean;
    onProjectClick: (project: any) => void;
    onNewProject: () => void;
}

export function ProjectsSection({ projects, isLoading, onProjectClick, onNewProject }: ProjectsSectionProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredProjects = useMemo(() => {
        if (!projects || projects.length === 0) return [];

        return projects.filter((project) => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = statusFilter === "all" || project.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [projects, searchTerm, statusFilter]);

    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-col gap-2'}>
                <p className="text-sm text-muted-foreground mt-0 pl-1">
                    {filteredProjects.length} of {projects?.length || 0} projects
                </p>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <FunnelIcon size={16} />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="ongoing">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="abandoned">Abandoned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="h-[calc(100vh-290px)]">
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-sm text-muted-foreground">Loading projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-8">
                        <GlobeIcon size={32} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                            {searchTerm ? "No projects found" : "No projects yet"}
                        </p>
                        <Button onClick={onNewProject} variant="outline" size="sm">
                            <PlusIcon size={16} className="mr-2" />
                            Create First Project
                        </Button>
                    </div>
                ) : (
                    <ScrollArea className="h-[calc(100vh-290px)]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-4">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.project_id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </div>
    );
}
