"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import * as React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselApi} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useEffect} from "react";
import {usePageTitle} from "@/hooks/use-context";
import {useQuestList} from "@/hooks/use-quest-list";
import {Clock, Plus, Target, Trophy, ArrowLeft, ArrowRight} from "@phosphor-icons/react";
import {ApiSchema} from "@/app/(admin)/admin/quests/editor/_types/api_schema";

export default function Quests() {
    const [api, setApi] = React.useState<CarouselApi>()

    const { quests, isLoading, isError } = useQuestList();

    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle('Quests Dashboard');
    }, [setTitle]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getTotalRewards = (objectives: ApiSchema['objectives']) => {
        return objectives.reduce((total, obj) => {
            return total + (obj.rewards?.length || 0)
        }, 0)
    }

    return (
        <section className="grid items-center gap-6">
            <div className="w-full">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-xl md:text-2xl font-bold">Current Quests</h3>
                    <div className="flex gap-1 flex-shrink-0 items-center">
                        <Button asChild>
                            <Link href="/admin/quests/editor/new">
                                <Plus/> Create
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => api?.scrollPrev()}
                        >
                            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => api?.scrollNext()}
                        >
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                    </div>
                </div>

                {/* Carousel with controlled overflow */}
                <div className="overflow-hidden">
                    <Carousel setApi={setApi} className="rounded-xl w-full">
                        <CarouselContent className="-ml-1 md:-ml-4">
                            {quests && quests.map((quest, index) => {
                                const totalRewards = getTotalRewards(quest.objectives)

                                return (
                                    <CarouselItem
                                        key={index}
                                        className={cn(
                                            "pl-1 md:pl-4",
                                            "basis-[calc(100vw-3rem)] sm:basis-[280px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4",
                                            "max-w-[calc(100vw-3rem)] sm:max-w-[280px]"
                                        )}
                                    >
                                        <Card className={cn('hover:cursor-pointer p-0 hover:border-foreground/30 transition-all')}>
                                            <Link href={`/admin/quests/editor/${quest.quest_id}`}>
                                                <CardContent className="p-3 md:p-4 h-full flex flex-col">
                                                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                                                        <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                                        <span className="truncate">
                                                            {`Ends ${formatDate(quest.end_time)} UTC`}
                                                        </span>
                                                    </div>

                                                    <h4 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 flex-shrink-0">
                                                        {quest.title}
                                                    </h4>

                                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 md:line-clamp-3 flex-grow">
                                                        {quest.description}
                                                    </p>

                                                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 xs:gap-0 pt-2 border-t border-border/50">
                                                        <div className="flex items-center gap-2 md:gap-3 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <Target className="h-3 w-3 flex-shrink-0" />
                                                                <span>{quest.objectives.length} objectives</span>
                                                            </div>
                                                            {totalRewards > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <Trophy className="h-3 w-3 flex-shrink-0" />
                                                                    <span>{totalRewards} rewards</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Link>
                                        </Card>
                                    </CarouselItem>
                                )
                            })}

                            {isLoading || isError || !quests || quests.length === 0 && (
                                <CarouselItem
                                    key={'no-quests'}
                                    className={cn(
                                        "pl-1 md:pl-4",
                                        "basis-[calc(100vw-3rem)] sm:basis-[280px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4",
                                        "max-w-[calc(100vw-3rem)] sm:max-w-[280px]"
                                    )}
                                >
                                    <Card className={cn(
                                        'hover:cursor-pointer hover:border-foreground/30 transition-all duration-300 border-dashed'
                                    )}>
                                        <Link href={`/admin/quests/editor/new`}>
                                            <CardContent className="flex gap-2 flex-col items-center justify-center text-center">
                                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                                    <Trophy className="size-8" />
                                                </div>

                                                <h4 className="font-semibold text-lg text-foreground">
                                                    No Active Quests
                                                </h4>

                                                <p className="text-sm text-muted-foreground">
                                                    Create a quest now, the people are growing restless...
                                                </p>

                                                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                                    <span>Create Quest</span>
                                                    <ArrowRight className="size-4" />
                                                </div>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </CarouselItem>

                            )}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
