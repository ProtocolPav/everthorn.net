import {Tooltip as LTooltip, Popup, useMap, Marker} from "react-leaflet";
import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Project} from "@/types/projects";
import L, {latLng} from "leaflet";
import relicPin from "public/map/pins/relic.png";
import {Toggle} from "@/app/(no-layout)/map/_types/toggle";
import Image from "next/image";

const relic_icon = new L.Icon({
    iconUrl: relicPin.src,
    iconSize: [25.6, 41.6],
    iconAnchor: [0, 41.6],
});

interface Relic {
    id: string
    name: string
    coordinates: number[]
}

export const RelicLayer = React.memo(({all_relics, toggle}: {all_relics: Relic[], toggle: Toggle}) => {
    if (!toggle.visible) return null

    return (
        <>
        {all_relics.map(relic => (
            <Marker
                icon={relic_icon}
                position={[-relic.coordinates[2], relic.coordinates[0]]}
                key={`${relic.id}-${toggle.label_visible}`}
            >
                <LTooltip offset={[4, -12]} direction={'left'} permanent={toggle.label_visible}>{relic.name}</LTooltip>
                <Popup
                    offset={[4, -20]}
                    closeButton={false}
                    autoPan={true}
                >
                    <TooltipProvider>
                        <h3 className={'flex items-center gap-1 text-[19px] text-foreground'}>
                            <Image src={relicPin} alt={'project pin'} width={20}/>
                            {relic.name}
                        </h3>
                        <p className={'text-sm text-foreground'}>
                            Coordinates: {relic.coordinates.join(', ')} <br/>
                        </p>

                        <div className={'flex gap-1'}>
                            <Button
                                variant={'outline'}
                                size={'sm'}
                                className={'mx-auto text-center text-accent-foreground'}
                                onClick={async () => {
                                    await navigator.clipboard.writeText(`${relic.name} ${relic.coordinates[0]}, ${relic.coordinates[1]}, ${relic.coordinates[2]}`)
                                }}
                            >
                                Copy Coords
                            </Button>
                        </div>
                    </TooltipProvider>
                </Popup>
            </Marker>
        ))}
        </>
    )
})

RelicLayer.displayName = "RelicLayer";