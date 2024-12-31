import {useMap} from "react-leaflet";
import React, {useEffect, useState} from "react";
import L from "leaflet";
import {Button} from "@/components/ui/button";
import {MapPinArea} from "@phosphor-icons/react";
import {ChevronDown} from "lucide-react";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Checkbox} from "@/components/ui/checkbox";

import {Toggle} from "../_types/toggle";
import {cn} from "@/lib/utils";


export const PinsControl = ({pins}: {pins: Toggle[]}) => {
    const [visible_pins, set_visible_pins] = useState(pins);

    function update_visible_pins(id: string) {
        const new_pins = visible_pins.map((pin, index) => {
            if (pin.id === id) {
                return {id: pin.id, visible: !pin.visible, name: pin.name, icon: pin.icon, image: pin.image};
            } else {
                return pin
            }
        })

        set_visible_pins(new_pins);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={'outline'} className={'flex gap-1 bg-background/30 p-2'}>
                    <MapPinArea weight={'duotone'} size={20}/> <ChevronDown size={15}/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align={'end'} sideOffset={8} className={'grid gap-1 bg-background/80 p-1.5 backdrop-blur-sm'}>
                {visible_pins.map(pin => (
                    <Button
                        variant={'invisible'}
                        size={'sm'}
                        className={cn('flex w-full items-center justify-start gap-2 bg-background/30 border', (pin.visible ? 'bg-cyan-200/10' : ''))}
                        onClick={() => {update_visible_pins(pin.id)}}
                    >
                        {pin.image ? <Image src={pin.image} alt={'pin icon'} width={20}/> : null}
                        {pin.icon ? <pin.icon weight={'duotone'} size={20}/> : null}
                        {pin.name}
                    </Button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

    );
};