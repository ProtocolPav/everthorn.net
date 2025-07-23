import {Tooltip as LTooltip, Marker} from "react-leaflet";
import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles"
import {Project} from "@/types/projects";
import L from "leaflet";
import projectPin from "public/map/pins/project.png";
import abandonedPin from "public/map/pins/abandoned.png";
import completedPin from "public/map/pins/completed.png";
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

export const ProjectLayer = React.memo(({all_projects, editMode}: {all_projects: Project[], editMode: boolean}) => {
    return (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} chunkedLoading={true} maxClusterRadius={50}>
            {all_projects.map(project => {
                const markerRef = React.useRef<L.Marker>(null) // Move this up

                const eventHandlers = React.useMemo(
                    () => ({
                        async dragend() { // Make it async for cleaner code
                            const marker = markerRef.current
                            try {
                                const response = await fetch(`/nexuscore-api/v0.2/projects/${project.project_id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        coordinates: [
                                            Math.round(marker?.getLatLng().lng || -project.coordinates[0]),
                                            project.coordinates[1],
                                            Math.round(marker?.getLatLng().lat || project.coordinates[2]) * -1
                                        ],
                                    }),
                                })

                                if (response.ok) {
                                    project.coordinates = [
                                        Math.round(marker?.getLatLng().lng || -project.coordinates[0]),
                                        project.coordinates[1],
                                        Math.round(marker?.getLatLng().lat || project.coordinates[2]) * -1
                                    ]
                                    toast.success(`Moved ${project.name} to ${project.coordinates[0]}, ${project.coordinates[2]}`)
                                } else {
                                    toast.error("Something went wrong", {
                                        description: `${response.status}: ${response.statusText}`
                                    })
                                }
                            } catch (error) {
                                toast.error("Network error", {
                                    description: error instanceof Error ? error.message : 'Unknown error'
                                })
                            }
                        },
                    }),
                    [project.project_id, project.coordinates, project.name], // Add proper dependencies
                )

                return (
                    <Marker
                        eventHandlers={eventHandlers}
                        ref={markerRef}
                        draggable={editMode}
                        icon={get_icon(project)}
                        position={[-project.coordinates[2], project.coordinates[0]]}
                        key={`${project.project_id}-edit-${editMode}`}
                    >
                        <LTooltip offset={[4, -12]} direction={'left'} permanent={true}>{project.name}</LTooltip>
                    </Marker>
                )
            })}
        </MarkerClusterGroup>
    )
})

ProjectLayer.displayName = "ProjectLayer";