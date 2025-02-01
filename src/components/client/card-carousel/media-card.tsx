import {Card, CardContent} from "@/components/ui/card";
import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import placeholder from "../../../../public/screenshots/beyond.png";
import {Badge} from "@/components/ui/badge";

export function MediaCard(title: string,  ) {
    return (
        <Card className={cn(
            'p-0 hover:cursor-pointer',
            'hover:bg-slate-900',
            'transition-bg duration-300'
        )}>
            <CardContent className="p-1.5">
                <div className="relative">
                    <div className="relative">
                        <Image
                            src={placeholder}
                            alt="image"
                            width={1920}
                            height={900}
                            className="rounded-md"
                        />
                    </div>

                    <div className="absolute bottom-1 right-1 z-10 flex gap-1">
                        <Badge variant="secondary" className={'opacity-80'}>Lore</Badge>
                        <Badge variant="secondary" className={'opacity-80'}>World 4</Badge>
                        <Badge variant="secondary" className={'opacity-80'}>+3</Badge>
                    </div>
                </div>

                <h3 className="mt-1 px-1 text-xl">{title}</h3>

                <div className="px-1 pt-0.5 text-xs text-muted-foreground">
                    Created at: {new Date().toLocaleDateString()}
                </div>
            </CardContent>
        </Card>
    )
}

export function TextCard() {
    return (
        <Card className={cn(
            'p-0 hover:cursor-pointer',
            'hover:bg-slate-900',
            'transition-bg duration-300',
            'min-w-[200px]'
        )}>
            <CardContent className="p-2.5">
                <div className="flex gap-1">
                    <Badge variant="secondary" className={'opacity-80'}>Lore</Badge>
                    <Badge variant="secondary" className={'opacity-80'}>World 4</Badge>
                    <Badge variant="secondary" className={'opacity-80'}>+3</Badge>
                </div>

                <h3 className="mt-1 text-xl">Card Title</h3>

                <p className={'my-2 text-sm'}>
                    This is a description for the blah blah blah blah
                </p>

                <div className="pt-0.5 text-xs text-muted-foreground">
                    Created at: {new Date().toLocaleDateString()}
                </div>
            </CardContent>
        </Card>
    )
}