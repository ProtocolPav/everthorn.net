"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ArrowLeft, ArrowRight, HardDrives} from "@phosphor-icons/react";
import * as React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselApi} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import placeholder from '/public/screenshots/beyond.png'
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useProjects} from "@/hooks/use-projects";
import {Project} from "@/types/projects";

export default function Quests() {
    const [api, setApi] = React.useState<CarouselApi>()
    const { projects, isLoading, isError } = useProjects();
    if (isError) {throw Error()}
    const all_projects: Project[] = isLoading ? [] : projects.projects

    return (
        <section className="mx-5 grid items-center gap-6 pb-8 pt-6 max-w-full overflow-x-hidden">
            <h2>Everthorn Quests</h2>
            <Link href={'/quests/creator'}>
                <Button>
                    Create New Quest
                </Button>
            </Link>

            <Carousel opts={{align: 'start'}} setApi={setApi} className={'max-w-fit rounded-xl p-2'}>
                <div className={'flex justify-between'}>
                    <h3>Current Quests</h3>
                    <div className={'flex gap-1.5'}>
                        <Button variant={'outline'} size={'icon'} className={'size-8 rounded-xl rounded-r-none'} onClick={() => api?.scrollPrev()}>
                            <ArrowLeft/>
                        </Button>
                        <Button variant={'outline'} size={'icon'} className={'size-8 rounded-xl rounded-l-none'} onClick={() => api?.scrollNext()}>
                            <ArrowRight/>
                        </Button>
                    </div>

                </div>

                <CarouselContent className={'mt-2'}>
                    {all_projects.map((project) => (
                        <CarouselItem className={'basis-1/2 lg:basis-1/6'}>
                            <Card className={cn(
                                'p-0 hover:cursor-pointer',
                                'hover:bg-slate-900',
                                'transition-bg duration-300',
                            )}>
                                <CardContent className="p-2.5">
                                    <div className="flex gap-1">
                                        <Badge variant="secondary" className={'opacity-80'}>Lore</Badge>
                                        <Badge variant="secondary" className={'opacity-80'}>World 4</Badge>
                                        <Badge variant="secondary" className={'opacity-80'}>+3</Badge>
                                    </div>

                                    <h3 className="mt-1 text-xl">{project.name}</h3>

                                    <p className={'my-2 text-sm'}>
                                        This is a description for the blah blah blah blah
                                    </p>

                                    <div className="pt-0.5 text-xs text-muted-foreground">
                                        Created at: {new Date().toLocaleDateString()}
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}

                </CarouselContent>
            </Carousel>

        </section>
    )
}