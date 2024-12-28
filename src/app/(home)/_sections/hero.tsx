import { Button } from "@/components/ui/button";
import {LoadingCarousel, Tip} from "@/components/ui/loading-carousel";
import spawn from 'public/screenshots/spawn_village.png'
import padova from 'public/screenshots/padova.png'
import solaris from 'public/screenshots/solaris.png'
import proving_grounds from 'public/screenshots/provingground.png'
import shroomland from 'public/screenshots/shroomland.png'

import {cn} from "@/lib/utils";
import Link from "next/link";

const carousel_tips: Tip[] = [
    {'text': 'Padova', 'image': padova},
    {'text': 'Spawn Village', 'image': spawn},
    {'text': 'Solaris', 'image': solaris},
    {'text': 'Proving Grounds', 'image': proving_grounds},
    {'text': 'Shroomland', 'image': shroomland}
]

export default function Hero({className}: {className?: string | undefined}) {
    return (
        <div className={cn(className, "pt-4 md:pt-16")}>
            <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12">
                <div className="lg:col-span-3">
                    <h1 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Everthorn
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground">
                        Explore Everthorn, a Minecraft Bedrock Community that's been going on for 5+ years. <br/>
                        We are Everthorn, and Together We Stand.
                    </p>
                    <div className="mt-5 flex flex-row gap-2 sm:items-center sm:gap-3 lg:mt-8">
                        <Link href={'/map'}>
                            <Button variant={'default'}>View our World Map</Button>
                        </Link>
                        <Link href={'/apply'}>
                            <Button variant={'secondary'}>Apply to Join</Button>
                        </Link>
                    </div>
                </div>
                <div className="mt-10 lg:col-span-4 lg:mt-0">
                    <LoadingCarousel showIndicators={false} shuffleTips={true} backgroundGradient={true} backgroundTips={true} showNavigation={true} showProgress={false} tips={carousel_tips} />
                </div>
            </div>
        </div>
    );
}
