import {CoordinatesControl} from "./coords-control";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import logo from 'public/everthorn.png';
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PinsControl} from "./pins-control";
import {Toggle} from "../../_types/toggle";
import {LayersControl} from "./layers-control";

export default function ControlBar (
    {pins, update_pins, layers, update_layers, online_players}:
    {pins: Toggle[], update_pins: Function, layers: Toggle[], update_layers: Function, online_players: number}) {
    return (
        <div className={'leaflet-top leaflet-left'}>
            <div className={'leaflet-control flex items-center gap-2'}>
                <Card className={'bg-background/60 backdrop-blur-sm p-0 gap-0 overflow-hidden'}>
                    <CardContent className={'flex gap-1 p-1'}>
                        <Button asChild key={'home'} variant={'ghost'} size={'icon'}>
                            <Link href="/home">
                                <Image src={logo} alt={'logo'} className={'size-7'}/>
                            </Link>
                        </Button>

                        <CoordinatesControl key={'coords'}/>

                        <LayersControl key={'layers'} layers={layers} update_layers={update_layers}/>

                        <PinsControl key={'pins'} pins={pins} update_pins={update_pins}/>
                    </CardContent>
                    <CardFooter className={'flex justify-start gap-2 bg-white/10 px-0 py-0 text-[10px]'}>
                        <b className={'rounded-bl-lg bg-blue-300/20 pl-3 pr-2'}>BETA</b>

                        <div className={'flex gap-1 items-center'}>
                            <div className={'rounded-full size-1 bg-green-500 animate-pulse'}/>
                            {online_players || 0} online
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>

    );
};