import {Tooltip as LTooltip, Popup, Marker} from "react-leaflet";
import React from "react";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import L from "leaflet";
import relicPin from "public/map/pins/relic.png";
import shopPin from "public/map/pins/shop.png";
import farmPin from "public/map/pins/farm.png";
import abaondonedPin from "public/map/pins/abandoned.png"
import {Toggle} from "@/app/(no-layout)/map/_types/toggle";
import {Pin} from "@/types/pins";

const relic_icon = new L.Icon({
    iconUrl: relicPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

const shop_icon = new L.Icon({
    iconUrl: shopPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

const farm_icon = new L.Icon({
    iconUrl: farmPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

const default_icon = new L.Icon({
    iconUrl: abaondonedPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

function get_icon(pin: Pin) {
    switch (pin.pin_type) {
        case "farm":
            return farm_icon
        case "shop":
            return shop_icon
        case "relic":
            return relic_icon

        default:
            return default_icon

    }
}

export const PinLayer = React.memo(({pins}: {pins: Pin[]}) => {
    return (
        <>
        {pins.map(pin => (
            <Marker
                draggable={true}
                icon={get_icon(pin)}
                position={[-pin.coordinates[2], pin.coordinates[0]]}
                key={`${pin.id}-editing`}
            >
                <LTooltip offset={[4, -12]} direction={'left'} permanent={true}>{pin.name}</LTooltip>
            </Marker>
        ))}
        </>
    )
})

PinLayer.displayName = "PinLayer";