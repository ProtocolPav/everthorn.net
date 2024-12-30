"use client";

import React from "react";
import {MapContainer, Tooltip as LTooltip, Popup, useMap, ZoomControl, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {useProjects} from '@/hooks/use-projects'
import {Project} from "@/types/projects";
import Link from "next/link";
import mapPin from '../../../../../public/map-pin.svg'
import {Lighthouse} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import {MouseCoordinatesControl} from "./coordinate_control";

// Extend L.TileLayer for Custom Tile URL Generation
class CustomTileLayer extends L.TileLayer {
    getTileUrl(coords: L.Coords): string {
        const { x: tileX, y: tileY, z: zoom } = coords;

        return `https://everthorn.net/map/tiles/zoom.${zoom}/${Math.floor(tileX / 10)}/${Math.floor(tileY / 10)}/tile.${tileX}.${tileY}.png`
    }
}

// React Component to Add Custom Tile Layer
const CustomTileLayerComponent = () => {
    const map = useMap();

    React.useEffect(() => {
        // Add the custom Tile Layer to the map
        const customTileLayer = new CustomTileLayer("", {
            maxZoom: 2,
            minZoom:-6
        });
        customTileLayer.addTo(map);

        return () => {
            map.removeLayer(customTileLayer);
        };
    }, [map]);

    return null;
};

const markerIcon = new L.Icon({
    iconUrl: mapPin.src,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
});

export default function WorldMap()  {
    const position: [number, number] = [0, 0]; // Default map center

    const { projects, isLoading, isError } = useProjects();
    if (isError) {return (<div>Error!</div>)}
    const all_projects: Project[] = isLoading ? [] : projects.projects

    return (
        <MapContainer
            center={position}
            zoom={0}
            style={{width: "100%", height: "100%"}}
            className={'z-0 flex'}
            zoomControl={false}
            crs={L.CRS.Simple}
            maxBounds={[[2200, 2200], [-2200, -2200]]}
            maxBoundsViscosity={0.03}
            attributionControl={false}
        >
            <CustomTileLayerComponent/>
            <ZoomControl/>
            <MouseCoordinatesControl/>

            {all_projects.map(project => (
                <Marker icon={markerIcon} position={[-project.coordinates[2], project.coordinates[0]]}>
                    <LTooltip offset={[8, -8]}>{project.name}</LTooltip>
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

        </MapContainer>
    );
};
