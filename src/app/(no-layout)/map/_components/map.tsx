"use client";

import React from "react";
import {MapContainer, Tooltip as LTooltip, Popup, useMap, ZoomControl, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {useProjects} from '@/hooks/use-projects'
import {Project} from "@/types/projects";

import 'react-leaflet-markercluster/styles'
import {usePlayers, Player} from "@/hooks/use-players";
import {PlayerLayer} from "@/app/(no-layout)/map/_components/player_layer";
import {ProjectLayer} from "@/app/(no-layout)/map/_components/project_layer";
import {ControlBar} from "@/app/(no-layout)/map/_components/control-bar";
import {Toggle} from "../_types/toggle";

import projectPin from "/public/project-pin.png";
import playerPin from "/public/steve.webp";
import {Tag} from '@phosphor-icons/react'

// Extend L.TileLayer for Custom Tile URL Generation
class CustomTileLayer extends L.TileLayer {
    getTileUrl(coords: L.Coords): string {
        const { x, y, z } = coords;
        return `/map/tiles/zoom.${z}/${Math.floor(x / 10)}/${Math.floor(y / 10)}/tile.${x}.${y}.png`
    }
}

// React Component to Add Custom Tile Layer
const CustomTileLayerComponent = () => {
    const map = useMap();

    React.useEffect(() => {
        // Add the custom Tile Layer to the map
        const customTileLayer = new CustomTileLayer("", {
            maxZoom: 2,
            minZoom:-6,
            updateInterval:0,
            keepBuffer:50
        });
        customTileLayer.addTo(map);

        return () => {
            map.removeLayer(customTileLayer);
        };
    }, [map]);

    return null;
};

export default function WorldMap()  {
    const position: [number, number] = [0, 0]; // Default map center

    const pintoggles: Toggle[] = [
        {id: 'projects', name: 'Projects', image: projectPin, visible: true},
        {id: 'project_label', name: 'Project Labels', icon: Tag, visible: true},
        {id: 'players', name: 'Players', image: playerPin, visible: false},
    ]

    const { projects, isLoading, isError } = useProjects();
    if (isError) {throw Error()}
    const all_projects: Project[] = isLoading ? [] : projects.projects

    const { players, isLoading: isLoading2, isError: isError2 } = usePlayers();
    const all_players: Player[] = isLoading2 ? [{gamertag: 'Test1', location: [2000, 60, 0]}] : players

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
            <ControlBar pins={pintoggles} layers={[]} />

            {/*<PlayerLayer players={all_players} />*/}
            <ProjectLayer all_projects={all_projects}/>

        </MapContainer>
    );
};
