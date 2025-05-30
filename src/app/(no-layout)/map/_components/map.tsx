"use client";

import React from "react";
import {MapContainer, Tooltip as LTooltip, Popup, useMap, ZoomControl, Marker} from "react-leaflet";
import L, {TileLayerOptions} from "leaflet";
import {useProjects} from '@/hooks/use-projects'
import {Project} from "@/types/projects";

import {usePlayers, Player} from "@/hooks/use-players";
import {PlayerLayer} from "@/app/(no-layout)/map/_components/layers/player_layer";
import {ProjectLayer} from "@/app/(no-layout)/map/_components/layers/project_layer";
import ControlBar from "@/app/(no-layout)/map/_components/controls";
import {Toggle} from "../_types/toggle";

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

// Extend L.TileLayer for Custom Tile URL Generation
class CustomTileLayer extends L.TileLayer {
    layer: string

    constructor(layer: string, options: TileLayerOptions) {
        super("", options);
        this.layer = layer;
    }

    getTileUrl(coords: L.Coords): string {
        const { x, y: z, z: zoom } = coords;
        //return `/amethyst/map/${this.layer}/${zoom}/${Math.floor(x / 10)}/${Math.floor(z / 10)}/${x}/${z}`
        return `/map/tiles/zoom.${zoom}/${Math.floor(x / 10)}/${Math.floor(z / 10)}/tile.${x}.${z}.png`
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

    const [pintoggles, setpintoggles]: [Toggle[], Function] = React.useState([
        {id: 'projects', name: 'Projects', image: project, visible: true, label_visible: true},
        {id: 'players', name: 'Players', image: player, visible: true, label_visible: true},
        {id: 'relics', name: 'Relics', image: relic, visible: true, label_visible: false},
        {id: 'farms', name: 'Farms', image: farm, visible: false, label_visible: true},
        {id: 'shops', name: 'Shops', image: shop, visible: false, label_visible: true},
    ])

    function update_pins(id: string, toggle_label?: boolean) {
        const new_pins = pintoggles.map((pin, index) => {
            if (pin.id === id) {
                return {
                    id: pin.id,
                    visible: toggle_label ? pin.visible : !pin.visible,
                    label_visible: toggle_label ? !pin.label_visible : pin.label_visible,
                    name: pin.name,
                    icon: pin.icon,
                    image: pin.image};
            } else {
                return pin
            }
        })

        setpintoggles(new_pins);
    }

    const [layertoggles, setlayertoggles]: [Toggle[], Function] = React.useState([
        {id: 'overworld', name: 'Overworld', image: grass_block, visible: true},
        {id: 'subway', name: 'Subway (y-48)', image: deepslate, visible: false},
        {id: 'nether', name: 'Nether (y40)', image: netherrack, visible: false},
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
    const all_projects: Project[] = isLoading ? [] : projects

    const { players, isLoading: isLoading2, isError: isError2 } = usePlayers();
    const all_players: Player[] = (isLoading2 || isError2) ? [] : players

    const { pins, isLoading: isLoading3, isError: isError3 } = usePins();
    const farm_pins = (isLoading3 || isError3) ? [] : pins?.filter(pin => pin.pin_type === 'farm');
    const relic_pins = (isLoading3 || isError3) ? [] : pins?.filter(pin => pin.pin_type === 'relic');
    const shop_pins = (isLoading3 || isError3) ? [] : pins?.filter(pin => pin.pin_type === 'shop');

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
                <CustomTileLayerComponent layer={layertoggles.filter((toggle) => toggle.visible)[0]['id']}/>
                <ControlBar pins={pintoggles} update_pins={update_pins} layers={layertoggles} update_layers={update_layers} />
                <LeafletContextMenu/>

                <ProjectLayer all_projects={all_projects} toggle={pintoggles[0]}/>
                <PinLayer pins={relic_pins} toggle={pintoggles[2]}/>
                <PinLayer pins={farm_pins} toggle={pintoggles[3]}/>
                <PinLayer pins={shop_pins} toggle={pintoggles[4]}/>
                <PlayerLayer players={all_players} toggle={pintoggles[1]} />

            </MapContainer>
        </LeafletRightClickProvider>

    );
};
