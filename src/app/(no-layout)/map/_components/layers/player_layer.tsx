import {Tooltip} from "react-leaflet";
import React from "react";
import {Player} from "@/hooks/use-players"
import L from "leaflet";
import mapPin from "public/map/pins/steve.png";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import {Toggle} from "@/app/(no-layout)/map/_types/toggle";

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

export function PlayerLayer ({players, toggle}: {players: Player[], toggle: Toggle}) {
    if (!toggle.visible) return null

    return (
        <div>
            {players?.map(player => (
            <LeafletTrackingMarker
                duration={100}
                rotationAngle={0}
                icon={player.hidden ? hiddenPlayerIcon : player.location[1] < 40 ? playerUndergroundIcon : playerIcon}
                position={[-player.location[2], player.location[0]]}
                bubblingMouseEvents={true}
                key={`${player.gamertag}-${toggle.label_visible}`}
            >
                <Tooltip offset={[0, 10]} direction={'bottom'} permanent={!player.hidden ? toggle.label_visible : false}>
                    {!player.hidden ? player.gamertag : null}
                </Tooltip>
            </LeafletTrackingMarker>
        ))}
        </div>
    )
}