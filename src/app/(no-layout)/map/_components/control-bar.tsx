import {CoordinatesControl} from "./coords-control";
import {Card, CardContent} from "@/components/ui/card";
import logo from '/public/everthorn.png';
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Control from 'react-leaflet-custom-control'
import {CardsThree} from "@phosphor-icons/react";
import { ChevronDown } from "lucide-react";
import {PinsControl} from "@/app/(no-layout)/map/_components/pins-control";
import {Toggle} from "../_types/toggle";

export const ControlBar = ({pins, layers}: {pins: Toggle[], layers: Toggle[]}) => {
    return (
        <Control position={'topleft'}>
            <Card className={'bg-background/60 backdrop-blur-sm'}>
                <CardContent className={'flex gap-1 p-1'}>
                    <Button variant={'outline'} size={'icon'} className={'bg-background/60'}>
                        <Link href="/home">
                            <Image src={logo} alt={'logo'} className={'size-10 p-1.5'}/>
                        </Link>
                    </Button>

                    <CoordinatesControl/>

                    <Button variant={'outline'} className={'flex gap-1 bg-background/30 p-2'}>
                        <CardsThree weight={'duotone'} size={20}/> <ChevronDown size={15}/>
                    </Button>

                    <PinsControl pins={pins}/>
                </CardContent>
            </Card>
        </Control>
    );
};