"use client";

import React from "react";
import {MapContainer, Tooltip as LTooltip, Popup, useMap, ZoomControl, Marker} from "react-leaflet";
import L, {TileLayerOptions} from "leaflet";
import {useProjects} from '@/hooks/use-projects'
import {Project} from "@/types/projects";

import {usePlayers, Player} from "@/hooks/use-players";
import {PlayerLayer} from "@/app/(no-layout)/map/_components/layers/player_layer";
import {ProjectLayer} from "./project_layer";

import project from "public/map/ui/project.png";
import player from "public/map/ui/steve.png";
import farm from "public/map/ui/farm.png"
import relic from "public/map/ui/relic.png"
import shop from "public/map/ui/shop.png"
import grass_block from 'public/map/ui/grass_block.png'
import netherrack from 'public/map/ui/netherrack.png'
import deepslate from 'public/map/ui/deepslate.png'

import {LeafletRightClickProvider} from "react-leaflet-rightclick";
import LeafletContextMenu from "@/app/(no-layout)/map/_components/contextmenu";
import {PinLayer} from "@/app/(no-layout)/map/_components/layers/pin_layer";
import {usePins} from "@/hooks/use-pins";

import 'leaflet/dist/leaflet.css'
import {Toggle} from "@/app/(no-layout)/map/_types/toggle";

// Extend L.TileLayer for Custom Tile URL Generation
class CustomTileLayer extends L.TileLayer {
    layer: string

    constructor(layer: string, options: TileLayerOptions) {
        super("", options);
        this.layer = layer;
    }

    getTileUrl(coords: L.Coords): string {
        const { x, y: z, z: zoom } = coords;
        return `/amethyst/map/${this.layer}/${zoom}/${Math.floor(x / 10)}/${Math.floor(z / 10)}/${x}/${z}`
        //return `/map/tiles/zoom.${zoom}/${Math.floor(x / 10)}/${Math.floor(z / 10)}/tile.${x}.${z}.png`
    }
}

// React Component to Add Custom Tile Layer
function CustomTileLayerComponent ({layer}: {layer: string}) {
    const map = useMap();

    React.useEffect(() => {
        // Add the custom Tile Layer to the map
        const customTileLayer = new CustomTileLayer(layer, {
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
    }, [map, layer]);

    return null;
}

export default function WorldMap()  {
    const position: [number, number] = [0, 0]; // Default map center

    const { projects, isLoading, isError } = useProjects();
    if (isError) {throw Error()}
    const all_projects: Project[] = isLoading ? [] : projects

    const { pins, isLoading: isLoading3, isError: isError3 } = usePins();
    const farm_pins = (isLoading3 || isError3) ? [] : pins?.filter(pin => pin.pin_type === 'farm');
    const relic_pins = (isLoading3 || isError3) ? [] : pins?.filter(pin => pin.pin_type === 'relic');
    const shop_pins = (isLoading3 || isError3) ? [] : pins?.filter(pin => pin.pin_type === 'shop');

    const [pintoggles, setpintoggles]: [Toggle[], Function] = React.useState([
        {id: 'projects', name: 'Projects', image: project, visible: true, label_visible: true},
        {id: 'players', name: 'Players', image: player, visible: true, label_visible: true},
        {id: 'relics', name: 'Relics', image: relic, visible: true, label_visible: false},
        {id: 'farms', name: 'Farms', image: farm, visible: false, label_visible: true},
        {id: 'shops', name: 'Shops', image: shop, visible: false, label_visible: true},
    ])

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
                <CustomTileLayerComponent layer={'overworld'}/>
                <LeafletContextMenu/>

                <ProjectLayer all_projects={all_projects}/>
                <PinLayer pins={relic_pins} toggle={pintoggles[2]}/>
                <PinLayer pins={farm_pins} toggle={pintoggles[3]}/>
                <PinLayer pins={shop_pins} toggle={pintoggles[4]}/>

            </MapContainer>
        </LeafletRightClickProvider>

    );
};
