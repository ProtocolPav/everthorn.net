import {Tooltip as LTooltip, Popup, Marker} from "react-leaflet";
import React from "react";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import L from "leaflet";
import relicPin from "../../../../../public/map/pins/relic.png";
import shopPin from "../../../../../public/map/pins/shop.png";
import farmPin from "../../../../../public/map/pins/farm.png";
import abaondonedPin from "../../../../../public/map/pins/abandoned.png"
import {Toggle} from "@/types/map-toggle";
import {Pin} from "@/types/pins";

const relic_icon = new L.Icon({
    iconUrl: relicPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
});

const shop_icon = new L.Icon({
    iconUrl: shopPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
});

const farm_icon = new L.Icon({
    iconUrl: farmPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
});

const default_icon = new L.Icon({
    iconUrl: abaondonedPin.src,
    iconSize: [20.46, 33.28],  // Originally [25.6, 41.6]
    iconAnchor: [0, 33.28],  // Originally [0, 41.6]
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

export const PinLayer = React.memo(({pins, toggle, currentlayer}: {pins: Pin[], toggle: Toggle, currentlayer: string}) => {
    if (!toggle.visible) return null

    const filtered_pins = pins.filter(pin => pin.dimension === `minecraft:${currentlayer}`)

    return (
        <>
        {filtered_pins.map(pin => (
            <Marker
                icon={get_icon(pin)}
                position={[-pin.coordinates[2], pin.coordinates[0]]}
                key={`${pin.id}-${toggle.label_visible}`}
            >
                <LTooltip offset={[4, -11]} direction={'left'} permanent={toggle.label_visible}>{pin.name}</LTooltip>
                <Popup
                    offset={[4, -15]}
                    closeButton={false}
                    autoPan={true}
                >
                    <TooltipProvider>
                        <h3 className={'flex justify-center text-[19px] text-foreground'}>
                            {pin.name}
                        </h3>
                        <p className={'w-52 text-center text-xs text-foreground'}>
                            {pin.description}
                        </p>

                        <Button
                            variant={'secondary'}
                            size={'sm'}
                            className={'mx-auto flex text-center font-mono text-accent-foreground'}
                            onClick={async () => {
                                await navigator.clipboard.writeText(`${pin.name} ${pin.coordinates[0]}, ${pin.coordinates[1]}, ${pin.coordinates[2]}`)
                            }}
                        >
                            {pin.coordinates.join(', ')}
                        </Button>

                    </TooltipProvider>
                </Popup>
            </Marker>
        ))}
        </>
    )
})

PinLayer.displayName = "PinLayer";