import { Button } from "@/components/ui/button";
import {LoadingCarousel, Tip} from "@/components/ui/loading-carousel";
import hero from '../../../public/screenshots/Hero.png'

const carousel_tips: Tip[] = [
    {'text': 'Padova', 'image': hero},
    {'text': 'Spawn Village', 'image': hero},
    {'text': 'Solaris', 'image': hero},
    {'text': 'Proving Grounds', 'image': hero},
    {'text': 'Shroomland', 'image': hero}
]

export default function Hero() {
    return (
        <div className="py-4 md:py-16">
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
                        <Button variant={'default'}>View our World Map</Button>
                        <Button variant={'secondary'}>Apply to Join</Button>
                    </div>
                </div>
                <div className="mt-10 lg:col-span-4 lg:mt-0">
                    <LoadingCarousel showIndicators={false} shuffleTips={true} backgroundGradient={true} backgroundTips={true} showNavigation={true} showProgress={false} tips={carousel_tips} />
                </div>
            </div>
        </div>
    );
}
