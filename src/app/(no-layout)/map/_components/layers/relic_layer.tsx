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

export const ProjectLayer = React.memo(({all_relics, toggle}: {all_relics: Project[], toggle: Toggle}) => {
    if (!toggle.visible) return null

    return (
        <>
        {all_relics.map(relic => (
            <Marker
                icon={relic_icon}
                position={[-relic.coordinates[2], relic.coordinates[0]]}
                key={`${relic.project_id}-${toggle.label_visible}`}
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
                            Project by:
                            <Tooltip delayDuration={0}>
                                {/*@ts-ignore*/}
                                <TooltipTrigger className={'ml-1 font-semibold hover:underline'}>{project.owner.gamertag}</TooltipTrigger>
                                {/*@ts-ignore*/}
                                <TooltipContent side={'right'} className={'bg-background/90'}>Discord: @{project.owner.username}</TooltipContent>
                            </Tooltip>
                            <br/>
                            Coordinates: {relic.coordinates.join(', ')} <br/>
                        </p>

                        <div className={'flex gap-1'}>
                            <Link href={`/wiki/${relic.project_id}`}>
                                <Button variant={'secondary'} size={'sm'} className={'mx-auto text-center'}>
                                    Wiki Page
                                </Button>
                            </Link>

                            <Link href={`/wiki/${relic.project_id}`}>
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
                            </Link>
                        </div>
                    </TooltipProvider>
                </Popup>
            </Marker>
        ))}
        </>
    )
})

ProjectLayer.displayName = "ProjectLayer";