import {Tooltip} from "react-leaflet";
import React from "react";
import {Player} from "@/hooks/use-players"
import L from "leaflet";
import mapPin from "/public/steve.webp";
import mapPin2 from "/public/steve_underground.webp";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

const playerIcon = new L.Icon({
    iconUrl: mapPin.src,
    iconSize: [24, 24],
});

const playerUndergroundIcon = new L.Icon({
    iconUrl: mapPin2.src,
    iconSize: [24, 24],
});

export function PlayerLayer ({players, visible}: {players: Player[], visible: boolean}) {
    if (!visible) return null

    return (
        <div>
            {players?.filter(player => (!player.hidden)).map(player => (
            <LeafletTrackingMarker
                duration={100}
                rotationAngle={0}
                icon={player.location[1] < 40 ? playerUndergroundIcon : playerIcon}
                position={[-player.location[2], player.location[0]]}
                bubblingMouseEvents={true}>
                <Tooltip offset={[0, 10]} direction={'bottom'} permanent={true}>
                    {player.gamertag}
                </Tooltip>
            </LeafletTrackingMarker>
        ))}
        </div>
    )
}