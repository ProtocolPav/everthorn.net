"use client";

import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/use-projects";
import {postPin, usePins} from "@/hooks/use-pins";
import { usePageTitle } from "@/hooks/use-context";
import {
    CalendarIcon,
    DiscordLogoIcon,
    GlobeIcon,
    ListBulletsIcon,
    ListIcon,
    MapPinIcon,
    MapTrifoldIcon,
    PlusIcon, TrashIcon,
    XCircleIcon
} from "@phosphor-icons/react";
import { ProjectsSection } from "./_components/projects-section";
import { PinsSection } from "./_components/pins-section";
import { MapCard } from "./_components/map-card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { toast } from "sonner";

export default function ProjectsMapDashboard() {
    const { setTitle } = usePageTitle();
    const { projects, isLoading: projectsLoading, isError: projectsError, mutate: mutateProject } = useProjects();
    const { pins, isLoading: pinsLoading, isError: pinsError, mutate: mutatePin } = usePins();

    const [listTab, setListTab] = useState<"projects" | "pins">("projects");

    // Set page title
    useEffect(() => {
        setTitle("Projects & Pins (BETA)");
    }, [setTitle]);

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
                        <Tabs value={listTab} onValueChange={tab => setListTab(tab as "projects" | "pins")}>
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

                                        <Button
                                            size="sm"
                                            className={listTab === 'projects' ? 'hidden' : 'flex'}
                                            onClick={async () => {
                                                await postPin({
                                                    name: 'New Pin',
                                                    pin_type: 'relic',
                                                    description: 'A new pin created by the admin.',
                                                    coordinates: [0, 70, 0],
                                                    dimension: 'minecraft:overworld'
                                                })

                                                toast.success('A new default pin was created. You must edit it!')

                                                mutatePin()
                                            }}
                                        >
                                            <PlusIcon size={16} className="mr-2" />
                                            New
                                        </Button>
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <TabsContent value={'projects'}>
                                <ProjectsSection
                                    mutate={mutateProject}
                                    projects={projects}
                                    isLoading={projectsLoading}
                                />
                            </TabsContent>

                            <TabsContent value={'pins'}>
                                <PinsSection
                                    mutate={mutatePin}
                                    pins={pins}
                                    isLoading={pinsLoading}
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
