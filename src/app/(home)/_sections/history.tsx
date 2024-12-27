import {cn} from "@/lib/utils";
import Image from "next/image";
import hero from '../../../../public/screenshots/Hero.png'
import {Separator} from "@/components/ui/separator";


export default function History({className}: {className?: string | undefined}) {
    return (
        <div className={cn(className, 'grid grid-cols-1 gap-7')}>
            <div className={'items-center justify-center gap-4 md:grid md:grid-cols-3'}>
                <h2 className={'text-center'}>Our History</h2>
            </div>

            <div className={'items-center justify-center gap-4 md:grid md:grid-cols-3'}>
                <div>
                    <h2 className={'text-center text-muted-foreground md:text-right'}>2019</h2>

                    <Separator className={'mx-auto w-1/2 md:w-full'}/>

                    <p className={'text-center md:text-right'}>
                        On June 14th 2019, Everthorn opened its doors to the first ever members.
                        Without knowing it, they would be the people to shape the future of this new community.
                    </p>
                </div>
                <Image src={hero} alt={'image'} className={'col-span-2 mx-auto mt-4 rounded-lg md:mt-0'}/>
            </div>

            <div className={'items-center justify-center gap-4 md:grid md:grid-cols-3'}>
                <Image src={hero} alt={'image'} className={'col-span-2 mx-auto mt-4 hidden rounded-lg md:mt-0 md:flex'}/>
                <div>
                    <h2 className={'text-center text-muted-foreground md:text-left'}>2020-2021</h2>

                    <Separator className={'mx-auto w-1/2 md:w-full'}/>

                    <p className={'text-center md:text-left'}>
                        During the lockdown, we started our Kingdoms world.
                        We had epic countries built and a major focus on lore.
                        During this time our Discord bot, Thorny, was also created!
                    </p>
                </div>
                <Image src={hero} alt={'image'} className={'col-span-2 mx-auto mt-4 rounded-lg md:mt-0 md:hidden'}/>
            </div>

            <div className={'items-center justify-center gap-4 md:grid md:grid-cols-3'}>
                <div>
                    <h2 className={'text-center text-muted-foreground md:text-right'}>2022-2024</h2>

                    <Separator className={'mx-auto w-1/2 md:w-full'}/>

                    <p className={'text-center md:text-right'}>
                        Our current world began mid-2022.
                        We decided to go back to our roots as an SMP.
                        We added many QOL tweaks like a world border, only one Nether Portal, and more
                        to ensure that this world stays around for as long as possible.
                    </p>
                </div>
                <Image src={hero} alt={'image'} className={'col-span-2 mx-auto mt-4 rounded-lg md:mt-0'}/>
            </div>

            <div className={'items-center justify-center gap-4 md:grid md:grid-cols-3'}>
                <Image src={hero} alt={'image'} className={'col-span-2 mx-auto mt-4 hidden rounded-lg md:mt-0 md:flex'}/>
                <div>
                    <h2 className={'text-center text-muted-foreground md:text-left'}>Present</h2>

                    <Separator className={'mx-auto w-1/2 md:w-full'}/>

                    <p className={'text-center md:text-left'}>
                        Today, Everthorn is thriving more than ever. We develop our own addons to add
                        features like Block stats and Playtime stats, and are improving our Quests and Events each day.
                    </p>
                </div>
                <Image src={hero} alt={'image'} className={'col-span-2 mx-auto mt-4 rounded-lg md:mt-0 md:hidden'}/>
            </div>

        </div>
    )
}