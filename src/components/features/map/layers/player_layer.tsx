import {Tooltip} from "react-leaflet";
import React from "react";
import {Player} from "@/hooks/use-players"
import L, {LatLngExpression} from "leaflet";
import mapPin from "../../../../../public/map/pins/steve.png";
import mapPinNether from "../../../../../public/map/pins/steve_nether.png";
import mapPinEnd from "../../../../../public/map/pins/steve_end.png";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import {Toggle} from "@/types/map-toggle";

const playerIcon = new L.Icon({
    iconUrl: mapPin.src,
    iconSize: [24, 24],
});

const hiddenPlayerIcon = new L.Icon({
    iconUrl: mapPin.src,
    iconSize: [24, 24],
    className: 'opacity-35'
});

const playerUndergroundIcon = new L.Icon({
    iconUrl: mapPin.src,
    iconSize: [24, 24],
    className: "grayscale contrast-125"
});

const playerNetherIcon = new L.Icon({
    iconUrl: mapPinNether.src,
    iconSize: [24, 24]
});

const playerEndIcon = new L.Icon({
    iconUrl: mapPinEnd.src,
    iconSize: [24, 24]
});

function get_icon(player: Player) {
    switch (player.dimension) {
        case 'minecraft:overworld':
            if (player.location[1] < 40) return playerUndergroundIcon
            return playerIcon
        case 'minecraft:nether':
            return playerNetherIcon
        case 'minecraft:the_end':
            return playerEndIcon
    }
}

function get_coordinates(player: Player, layer: string): LatLngExpression {
    if (layer !== 'nether' && player.dimension === 'minecraft:nether') {
        return [-player.location[2]*8, player.location[0]*8, ]
    }
    else if (layer === 'nether' && player.dimension !== 'minecraft:nether') {
        return [-player.location[2]/8, player.location[0]/8]
    }

    return [-player.location[2], player.location[0]]
}

export function PlayerLayer ({players, toggle, currentlayer}: {players: Player[], toggle: Toggle, currentlayer: string}) {
    if (!toggle.visible) return null

    return (
        <div>
            {players?.map(player => (
                <LeafletTrackingMarker
                    duration={100}
                    rotationAngle={0}
                    icon={get_icon(player)}
                    position={get_coordinates(player, currentlayer)}
                    bubblingMouseEvents={true}
                    key={`${player.whitelist}-${toggle.label_visible}`}
                >
                    <Tooltip offset={[0, 10]} direction={'bottom'} permanent={toggle.label_visible}>
                        {player.whitelist}
                    </Tooltip>
                </LeafletTrackingMarker>

                // <LeafletTrackingMarker
                //     duration={100}
                //     rotationAngle={0}
                //     icon={player.hidden ? hiddenPlayerIcon : player.location[1] < 40 ? playerUndergroundIcon : playerIcon}
                //     position={[-player.location[2], player.location[0]]}
                //     bubblingMouseEvents={true}
                //     key={`${player.gamertag}-${toggle.label_visible}`}
                // >
                //     <Tooltip offset={[0, 10]} direction={'bottom'} permanent={!player.hidden ? toggle.label_visible : false}>
                //         {!player.hidden ? player.gamertag : null}
                //     </Tooltip>
                // </LeafletTrackingMarker>
        ))}
        </div>
    )
}