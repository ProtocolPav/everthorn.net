import {CoordinatesControl} from "./coords-control";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import logo from '/public/everthorn.png';
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Control from 'react-leaflet-custom-control'
import {PinsControl} from "./pins-control";
import {Toggle} from "../../_types/toggle";
import {LayersControl} from "./layers-control";
import {Badge} from "@/components/ui/badge";
import {Circle} from "@phosphor-icons/react";

export default function ControlBar (
    {pins, update_pins, layers, update_layers}:
    {pins: Toggle[], update_pins: Function, layers: Toggle[], update_layers: Function}) {
    return (
        <Control position={'topleft'}>
            <div className={'flex items-center gap-2'}>
                <Card className={'bg-background/60 backdrop-blur-sm'}>
                    <CardContent className={'flex gap-1 p-1'}>
                        <Button variant={'outline'} size={'icon'} className={'bg-background/60'}>
                            <Link href="/home">
                                <Image src={logo} alt={'logo'} className={'size-7'}/>
                                {/*<House weight={'duotone'} className={'size-7 fill-white'}/>*/}
                            </Link>
                        </Button>

                        <CoordinatesControl/>

                        <LayersControl layers={layers} update_layers={update_layers}/>

                        <PinsControl pins={pins} update_pins={update_pins}/>
                    </CardContent>
                    <CardFooter className={'flex justify-center gap-1 rounded-b-md bg-white/20 px-0 py-0.5 text-[10px]'}>
                        <b className={'rounded-full bg-attention px-1'}>BETA</b>
                        May not work as expected
                    </CardFooter>
                </Card>

            </div>

        </Control>
    );
};