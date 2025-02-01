'use client' // Error boundaries must be Client Components

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LinkBreak} from "@phosphor-icons/react";
import {Separator} from "@/components/ui/separator";

export default function NotFound() {
    return (
        <div className={'container m-auto items-center justify-center text-center'}>
            <h2 className={'space-y-6 font-semibold'}>
                <div className={'flex items-center justify-center gap-4 text-center font-mono text-7xl'}>
                    <LinkBreak weight={'duotone'} size={140}/>
                    404
                </div>
                This page does not exist
            </h2>
            <Link href='/home'>
                <Button className={'my-5'}>Go Home</Button>
            </Link>
        </div>
    )
}