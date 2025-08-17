import {Tooltip as LTooltip, Popup, Marker, useMap} from "react-leaflet";
import React, {useRef} from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Project} from "@/types/projects";
import L from "leaflet";
import projectPin from "../../../../../public/map/pins/project.png";
import abandonedPin from "../../../../../public/map/pins/abandoned.png";
import completedPin from "../../../../../public/map/pins/completed.png";
import {Toggle} from "@/types/map-toggle";
import {toast} from "sonner";

const project_icon = new L.Icon({
    iconUrl: projectPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
});

const abandoned_icon = new L.Icon({
    iconUrl: abandonedPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
});

const completed_icon = new L.Icon({
    iconUrl: completedPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
});

function get_icon(project: Project) {
    switch (project.status) {
        case "abandoned":
            return abandoned_icon
        case "completed":
            return completed_icon

        default:
            return project_icon

    }
}

function createClusterCustomIcon (cluster: any ) {
    return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: cluster.getChildCount() > 5 ? 'marker-cluster-many' : 'marker-cluster',
        iconSize: L.point(40, 40),
    });
}

export const ProjectLayer = React.memo(({all_projects, toggle, currentlayer, layer}: {all_projects: Project[], toggle: Toggle, currentlayer: string, layer: string}) => {
    if (!toggle.visible || currentlayer !== layer) return null

    const filtered_projects = all_projects.filter(project => project.dimension === `minecraft:${layer}`)

    return (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} chunkedLoading={true} maxClusterRadius={50}>
            {filtered_projects.map(project => (
                <Marker
                    icon={get_icon(project)}
                    position={[-project.coordinates[2], project.coordinates[0]]}
                    key={`${project.project_id}-${toggle.label_visible}`}
                >
                    <LTooltip offset={[4, -11]} direction={'left'} permanent={toggle.label_visible}>{project.name}</LTooltip>
                    <Popup
                        offset={[4, -15]}
                        closeButton={false}
                        autoPan={true}
                    >
                        <TooltipProvider>
                            <h3 className={'flex justify-center text-[19px] text-foreground'}>
                                {project.name}
                            </h3>
                            <p className={'text-sm text-foreground'}>
                                Project by:
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger className={'ml-1 font-semibold hover:underline'}>{project.owner.gamertag}</TooltipTrigger>
                                    <TooltipContent side={'right'} className={'bg-background/90'}>Discord: @{project.owner.username}</TooltipContent>
                                </Tooltip>
                                <br/>
                                Status: {project.status}
                            </p>

                            <div className={'flex gap-1'}>
                                <Link href={`/wiki/${project.project_id}`}>
                                    <Button variant={'secondary'} size={'sm'} className={'mx-auto text-center'}>
                                        Wiki Page
                                    </Button>
                                </Link>

                                <Button
                                    variant={'outline'}
                                    size={'sm'}
                                    className={'mx-auto text-center font-mono text-accent-foreground'}
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(`${project.coordinates[0]} ${project.coordinates[1]} ${project.coordinates[2]}`)
                                        toast.info('Copied to clipboard!', {description: `${project.coordinates[0]} ${project.coordinates[1]} ${project.coordinates[2]}`})
                                    }}
                                >
                                    {project.coordinates.join(', ')}
                                </Button>
                            </div>
                        </TooltipProvider>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    )
})

ProjectLayer.displayName = "ProjectLayer";