import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {MapPinIcon, TextTIcon, TextTSlashIcon} from "@phosphor-icons/react";
import {ChevronDown} from "lucide-react";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Toggle} from "../../_types/toggle";
import {cn} from "@/lib/utils";


export const PinsControl = ({pins, update_pins}: {pins: Toggle[], update_pins: Function}) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger onClick={() => setOpen(true)} onMouseEnter={() => setOpen(true)} asChild>
                <Button variant={'outline'} className={'flex gap-1 bg-background/30 p-2'}>
                    <MapPinIcon weight={'duotone'} size={20}/> <ChevronDown size={15}/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                onMouseLeave={() => setOpen(false)}
                onInteractOutside={() => setOpen(false)}
                align={'end'} 
                sideOffset={8} 
                className={'grid gap-1 bg-background/80 p-1.5 backdrop-blur-sm'}
            >
                <h3 className={'flex px-0.5 text-center text-sm'}>Map Pins</h3>
                {pins.map(pin => (
                    <div className={'flex gap-1'} key={pin.id}>
                        <Button
                            variant={'invisible'}
                            size={'sm'}
                            className={cn('flex w-full items-center justify-start gap-2 border bg-background/30', (pin.visible ? 'bg-gray-500/20 dark:bg-gray-200/20' : ''))}
                            onClick={() => {update_pins(pin.id)}}
                        >
                            {pin.image ? <Image src={pin.image} alt={'pin icon'} width={24}/> : null}
                            {pin.icon ? <pin.icon weight={'duotone'} size={24}/> : null}
                            {pin.name}
                        </Button>
                        <Button
                            variant={'invisible'}
                            size={'sm'}
                            className={cn('flex w-9 items-center gap-2 border bg-background/30 px-1.5', (pin.label_visible ? 'bg-gray-500/20 dark:bg-gray-200/20' : ''))}
                            onClick={() => {update_pins(pin.id, true)}}
                        >
                            {
                                pin.label_visible
                                ? <TextTIcon weight={'duotone'} className={'h-10 w-20'}/>
                                : <TextTSlashIcon weight={'duotone'} className={'h-10 w-20'}/>
                            }
                        </Button>
                    </div>

                ))}
            </DropdownMenuContent>
        </DropdownMenu>

    );
};