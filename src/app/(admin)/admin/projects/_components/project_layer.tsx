import {Tooltip as LTooltip, Popup, Marker, useMap} from "react-leaflet";
import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Project} from "@/types/projects";
import L, {latLng} from "leaflet";
import projectPin from "public/map/pins/project.png";
import abandonedPin from "public/map/pins/abandoned.png";
import completedPin from "public/map/pins/completed.png";
import {Toggle} from "@/app/(no-layout)/map/_types/toggle";
import Image from "next/image";
import {ClipboardText} from "@phosphor-icons/react";
import {toast} from "sonner";

const project_icon = new L.Icon({
    iconUrl: projectPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

const abandoned_icon = new L.Icon({
    iconUrl: abandonedPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

const completed_icon = new L.Icon({
    iconUrl: completedPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
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

export const ProjectLayer = React.memo(({all_projects}: {all_projects: Project[]}) => {
    return (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} chunkedLoading={true} maxClusterRadius={50}>
            {all_projects.map(project => (
                <Marker
                    draggable={true}
                    icon={get_icon(project)}
                    position={[-project.coordinates[2], project.coordinates[0]]}
                    key={`${project.project_id}-editing`}
                >
                    <LTooltip offset={[4, -12]} direction={'left'} permanent={true}>{project.name}</LTooltip>
                </Marker>
            ))}
        </MarkerClusterGroup>
    )
})

ProjectLayer.displayName = "ProjectLayer";