import {MapContainer, Tooltip as LTooltip, Popup, useMap, ZoomControl, Marker} from "react-leaflet";
import React from "react";
import {Player} from "@/hooks/use-players"
import MarkerClusterGroup from "react-leaflet-markercluster";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Lighthouse} from "@phosphor-icons/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Project} from "@/types/projects";
import L from "leaflet";
import projectPin from "/public/project-pin.png";

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

export const ProjectLayer = React.memo(({all_projects}: {all_projects: Project[]}) => {
    return (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
            {all_projects.map(project => (
                <Marker icon={markerIcon} position={[-project.coordinates[2], project.coordinates[0]]}>
                    <LTooltip offset={[4, -12]} direction={'left'} permanent={true}>{project.name}</LTooltip>
                    <Popup
                        offset={[0, -24]}
                        closeButton={false}
                        autoPan={true}
                    >
                        <TooltipProvider>
                            <h3 className={'text-md flex items-center gap-1 text-foreground'}>
                                <Lighthouse weight={'duotone'} size={25}/>
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
                                    <Button variant={'outline'} size={'sm'} className={'mx-auto text-center text-accent-foreground'}>
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