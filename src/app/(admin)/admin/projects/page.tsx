"use client";

import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/use-projects";
import { usePins } from "@/hooks/use-pins";
import { usePageTitle } from "@/hooks/use-context";
import {GlobeIcon, ListBulletsIcon, ListIcon, MapPinIcon, MapTrifoldIcon, PlusIcon, XCircleIcon} from "@phosphor-icons/react";
import { ProjectsSection } from "./_components/projects-section";
import { PinsSection } from "./_components/pins-section";
import { MapCard } from "./_components/map-card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function ProjectsMapDashboard() {
    const { setTitle } = usePageTitle();
    const { projects, isLoading: projectsLoading, isError: projectsError } = useProjects();
    const { pins, isLoading: pinsLoading, isError: pinsError } = usePins();

    // Set page title
    useEffect(() => {
        setTitle("Projects & Map Dashboard");
    }, [setTitle]);

    // Modal state
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedPin, setSelectedPin] = useState<any>(null);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [pinModalOpen, setPinModalOpen] = useState(false);

    // Handlers
    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
        setProjectModalOpen(true);
    };

    const handlePinClick = (pin: any) => {
        setSelectedPin(pin);
        setPinModalOpen(true);
    };

    const handleNewProject = () => {
        setSelectedProject(null);
        setProjectModalOpen(true);
    };

    const handleNewPin = () => {
        setSelectedPin(null);
        setPinModalOpen(true);
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
        <div className={'grid gap-3 h-full'}>
            <Tabs defaultValue={'list'}>
                <div className={'flex justify-end'}>
                    <TabsList>
                        <TabsTrigger value={'list'}><ListBulletsIcon/></TabsTrigger>
                        <TabsTrigger value={'map'}><MapTrifoldIcon/></TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value={'list'}>
                    <Card className={'p-3'}>
                        <Tabs defaultValue={'projects'}>
                            <CardHeader className={'p-0'}>
                                <div className={'w-full'}>
                                    <CardTitle className="flex items-center justify-between gap-2">
                                        <TabsList>
                                            <TabsTrigger value={'projects'}>
                                                <GlobeIcon size={20} />
                                                Projects
                                            </TabsTrigger>
                                            <TabsTrigger value={'pins'}>
                                                <MapPinIcon size={20} />
                                                Pins
                                            </TabsTrigger>
                                        </TabsList>

                                        <Button size="sm">
                                            <PlusIcon size={16} className="mr-2" />
                                            New
                                        </Button>
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <TabsContent value={'projects'}>
                                <ProjectsSection
                                    projects={projects}
                                    isLoading={projectsLoading}
                                    onProjectClick={handleProjectClick}
                                    onNewProject={handleNewProject}
                                />
                            </TabsContent>

                            <TabsContent value={'pins'}>
                                <PinsSection
                                    pins={pins}
                                    isLoading={pinsLoading}
                                    onPinClick={handlePinClick}
                                    onNewPin={handleNewPin}
                                />
                            </TabsContent>
                        </Tabs>
                    </Card>
                </TabsContent>

                <TabsContent value={'map'}>
                    <MapCard/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
