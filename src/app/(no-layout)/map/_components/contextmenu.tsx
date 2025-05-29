import ReactLeafletRightClick, {useLeafletRightClick} from "react-leaflet-rightclick";
import {LeafletMouseEvent} from "leaflet";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import React from "react";
import {ClipboardText} from "@phosphor-icons/react";

import {toast} from "sonner";


function ContextMenuComponent(event: LeafletMouseEvent | null) {
    const coordinates = event
        ? { z: -Math.floor(event.latlng.lat), x: Math.floor(event?.latlng.lng) }
        : {x:0, z:0}
    return (
        <Card className={'rounded-tl-none bg-background/60 backdrop-blur-sm p-0'}>
            <CardContent className={'flex gap-1 p-0'}>
                <div className={'m-auto flex px-3 font-mono text-[15px]'} >
                    {coordinates.x}, {coordinates.z}
                </div>

                <Button variant={'invisible'} size={'icon'} className={'rounded-l-none bg-background/50'}
                        onClick={async () => {
                            await navigator.clipboard.writeText(`${coordinates.x} 70 ${coordinates.z}`)
                            toast.info('Copied to clipboard!', {description: `${coordinates.x} 70 ${coordinates.z}`})
                        }}>
                    <ClipboardText size={20} weight={"duotone"}/>
                </Button>
            </CardContent>
        </Card>
    )
}


export default function LeafletContextMenu() {
    const event = useLeafletRightClick();

    return (
        <ReactLeafletRightClick customComponent={ContextMenuComponent(event)}/>
    )
}