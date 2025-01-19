import {MapContainer, Tooltip, Popup, useMap, ZoomControl, Marker} from "react-leaflet";
import React from "react";
import {Player} from "@/hooks/use-players"
import L from "leaflet";
import mapPin from "../../../../../public/steve.webp";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

const playerIcon = new L.Icon({
    iconUrl: mapPin.src,
    iconSize: [24, 24],
});

export function PlayerLayer ({players}: {players: Player[]}) {
    return (
        <div className={'z-400'}>
            {players?.map(player => (
            <LeafletTrackingMarker duration={100} rotationAngle={0} icon={playerIcon} position={[-player.location[2], player.location[0]]} bubblingMouseEvents={true}>
                <Tooltip offset={[0, 10]} direction={'bottom'} permanent={true}>
                    {player.gamertag}
                </Tooltip>
            </LeafletTrackingMarker>
        ))}
        </div>
    )
}