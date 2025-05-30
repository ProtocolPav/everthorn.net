"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {CalendarDots, HardDrives, CastleTurret, Mountains, ShieldCheck} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {ArrowRight} from "lucide-react";
import Link from "next/link";


export default function Feature({className}: {className?: string | undefined}) {
    return (
        <div className={cn(className, 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5')}>
            <Card className={'bg-background/20 bg-gradient-to-bl from-background to-cyan-400/20 gap-0'}>
                <CardHeader className={'flex'}>
                    <h3 className={'flex items-center justify-start gap-2 text-xl'}>
                        <HardDrives weight={'duotone'} size={40}/>
                        Custom Server
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className={'text-sm'}>
                        Everthorn is hosted on a Custom Server rather than a Realm, this means
                        we have high performance and control over what goes on.
                    </p>
                </CardContent>
            </Card>

            <Card className={'bg-background/20 bg-gradient-to-tr from-background/80 to-rose-400/20 gap-0'}>
                <CardHeader className={'flex pb-0'}>
                    <h3 className={'flex items-center justify-start gap-2 text-xl'}>
                        <Mountains weight={'duotone'} size={40}/>
                        Quests
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className={'text-sm'}>
                        Quests are released each week, something different each time.
                        You might be tasked to help an NPC, mine some coal, or kill some zombies!
                    </p>
                </CardContent>
            </Card>

            <Card className={'bg-background/20 bg-gradient-to-tl from-background/80 to-blue-400/20 gap-0'}>
                <CardHeader className={'flex pb-0'}>
                    <h3 className={'flex items-center justify-start gap-2 text-xl'}>
                        <CalendarDots weight={'duotone'} size={40}/>
                        Events
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className={'text-sm'}>
                        Every few months, Everthorn hosts a massive event.
                        Fight in epic PVP battles, build in spectactular Build Battles, bid in our Storage Wars, and more!
                    </p>
                </CardContent>
            </Card>

            <Card className={'bg-background/20 bg-gradient-to-br from-background/80 to-orange-400/20 gap-0'}>
                <CardHeader className={'flex pb-0'}>
                    <h3 className={'flex items-center justify-start gap-2 text-xl'}>
                        <CastleTurret weight={'duotone'} size={40}/>
                        Projects
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className={'text-sm'}>
                        How we organize ourselves on Everthorn.
                        Each build is a project, and receives its own Wiki page and a place on the map.
                    </p>
                </CardContent>
            </Card>

            <Card className={'bg-background/20 bg-gradient-to-bl from-background/80 to-violet-400/20 gap-0'}>
                <CardHeader className={'flex pb-0'}>
                    <h3 className={'flex items-center justify-start gap-2 text-xl'}>
                        <ShieldCheck weight={'duotone'} size={40}/>
                        Fully Secure
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className={'text-sm'}>
                        With whitelists, as well as interaction logging,
                        you can be rest assured that griefers are deterred.
                        If anyone causes trouble, we will find out immediately.
                    </p>
                </CardContent>
            </Card>

            <span className={'hidden lg:col-span-4 lg:flex'}/>

            <Link href={'/features'} className={'my-auto'}>
                <Button size={'sm'} variant={'link'} className={'flex w-full gap-2 text-white'}>
                    See All Our Features
                    <ArrowRight width={15}/>
                </Button>
            </Link>

        </div>

    )
}