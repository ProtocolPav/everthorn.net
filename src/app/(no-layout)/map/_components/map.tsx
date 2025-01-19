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
import ControlBar from "@/app/(no-layout)/map/_components/controls";
import {Toggle} from "../_types/toggle";

import projectPin from "/public/project-pin.png";
import playerPin from "/public/steve.webp";
import grass_block from '/public/grass_block.png'
import stone from 'public/stone.png'
import netherrack from 'public/netherrack.png'
import deepslate from 'public/deepslate.png'
import {Tag} from '@phosphor-icons/react'

import {LeafletRightClickProvider} from "react-leaflet-rightclick";
import LeafletContextMenu from "@/app/(no-layout)/map/_components/contextmenu";

// Extend L.TileLayer for Custom Tile URL Generation
class CustomTileLayer extends L.TileLayer {
    getTileUrl(coords: L.Coords): string {
        const { x, y: z, z: zoom } = coords;
        return `/amethyst/map/${zoom}/${Math.floor(x / 10)}/${Math.floor(z / 10)}/${x}/${z}`
        // return `/map/tiles/zoom.${zoom}/${Math.floor(x / 10)}/${Math.floor(z / 10)}/tile.${x}.${z}.png`
    }
}

// React Component to Add Custom Tile Layer
const CustomTileLayerComponent = () => {
    const map = useMap();

    React.useEffect(() => {
        // Add the custom Tile Layer to the map
        const customTileLayer = new CustomTileLayer("", {
            maxNativeZoom: 2,
            maxZoom: 6,
            minZoom:-5,
            updateInterval:10,
            keepBuffer:50,
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

    const [pintoggles, setpintoggles]: [Toggle[], Function] = React.useState([
        {id: 'projects', name: 'Projects', image: projectPin, visible: true},
        {id: 'project_label', name: 'Project Labels', icon: Tag, visible: true},
        {id: 'players', name: 'Players', image: playerPin, visible: true},
    ])

    function update_pins(id: string) {
        const new_pins = pintoggles.map((pin, index) => {
            if (pin.id === id) {
                return {id: pin.id, visible: !pin.visible, name: pin.name, icon: pin.icon, image: pin.image};
            } else {
                return pin
            }
        })

        setpintoggles(new_pins);
    }

    const [layertoggles, setlayertoggles]: [Toggle[], Function] = React.useState([
        {id: 'overworld', name: 'Overworld', image: grass_block, visible: true},
        {id: 'underground', name: 'Underground', image: stone, visible: false},
        {id: 'subway', name: 'Subway', image: deepslate, visible: false},
        {id: 'nether', name: 'Nether', image: netherrack, visible: false},
    ])

    function update_layers(id: string) {
        const new_layers = layertoggles.map((layer, index) => {
            if (layer.id === id) {
                return {id: layer.id, visible: true, name: layer.name, icon: layer.icon, image: layer.image};
            } else {
                return {id: layer.id, visible: false, name: layer.name, icon: layer.icon, image: layer.image};
            }
        })

        setlayertoggles(new_layers);
    }

    const { projects, isLoading, isError } = useProjects();
    if (isError) {throw Error()}
    const all_projects: Project[] = isLoading ? [] : projects.projects

    const { players, isLoading: isLoading2, isError: isError2 } = usePlayers();
    const all_players: Player[] = (isLoading2 || isError2) ? [] : players

    return (
        <LeafletRightClickProvider>
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
                <ControlBar pins={pintoggles} update_pins={update_pins} layers={layertoggles} update_layers={update_layers} />
                <LeafletContextMenu/>

                <PlayerLayer players={all_players} visible={pintoggles[2].visible} />
                <ProjectLayer all_projects={all_projects} visible={pintoggles[0].visible} labels={pintoggles[1].visible}/>


            </MapContainer>
        </LeafletRightClickProvider>

    );
};
