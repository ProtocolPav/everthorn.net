import {Tooltip as LTooltip, Popup, useMap, Marker} from "react-leaflet";
import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Project} from "@/types/projects";
import L, {latLng} from "leaflet";
import projectPin from "/public/project-pin.png";
import {Toggle} from "@/app/(no-layout)/map/_types/toggle";
import Image from "next/image";

const markerIcon = new L.Icon({
    iconUrl: projectPin.src,
    iconSize: [26, 26],
    iconAnchor: [0, 26],
});

function createClusterCustomIcon (cluster: any ) {
    return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: cluster.getChildCount() > 5 ? 'marker-cluster-many' : 'marker-cluster',
        iconSize: L.point(40, 40),
    });
}

export const ProjectLayer = React.memo(({all_projects, toggle}: {all_projects: Project[], toggle: Toggle}) => {
    if (!toggle.visible) return null

    return (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} chunkedLoading={true} maxClusterRadius={30}>
            {all_projects.map(project => (
                <Marker
                    icon={markerIcon}
                    position={[-project.coordinates[2], project.coordinates[0]]}
                    key={`${project.project_id}-${toggle.label_visible}`}
                >
                    <LTooltip offset={[4, -12]} direction={'left'} permanent={toggle.label_visible}>{project.name}</LTooltip>
                    <Popup
                        offset={[4, -20]}
                        closeButton={false}
                        autoPan={true}
                    >
                        <TooltipProvider>
                            <h3 className={'flex items-center gap-1 text-[19px] text-foreground'}>
                                <Image src={projectPin} alt={'project pin'} width={20}/>
                                {project.name}
                            </h3>
                            <p className={'text-sm text-foreground'}>
                                Project by:
                                <Tooltip delayDuration={0}>
                                    {/*@ts-ignore*/}
                                    <TooltipTrigger className={'ml-1 font-semibold hover:underline'}>{project.owner.gamertag}</TooltipTrigger>
                                    {/*@ts-ignore*/}
                                    <TooltipContent side={'right'} className={'bg-background/90'}>Discord: @{project.owner.username}</TooltipContent>
                                </Tooltip>
                                <br/>
                                Coordinates: {project.coordinates.join(', ')} <br/>
                            </p>

                            <div className={'flex gap-1'}>
                                <Link href={`/wiki/${project.project_id}`}>
                                    <Button variant={'secondary'} size={'sm'} className={'mx-auto text-center'}>
                                        Wiki Page
                                    </Button>
                                </Link>

                                <Link href={`/wiki/${project.project_id}`}>
                                    <Button
                                        variant={'outline'}
                                        size={'sm'}
                                        className={'mx-auto text-center text-accent-foreground'}
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(`${project.name} ${project.coordinates[0]}, ${project.coordinates[1]}, ${project.coordinates[2]}`)
                                        }}
                                    >
                                        Copy Coords
                                    </Button>
                                </Link>
                            </div>
                        </TooltipProvider>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    )
})

ProjectLayer.displayName = "ProjectLayer";