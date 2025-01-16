import {ShieldSlash} from "@phosphor-icons/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DiscordAvatar} from "@/components/layout/header/discord-avatar";

export function NoPermission({ status }: { status: string }) {
    return (
        <div className={'container m-auto items-center justify-center text-center'}>
            <h2 className={'space-y-6 font-semibold'}>
                <div className={'flex items-center justify-center gap-4 text-center font-mono text-7xl'}>
                    <ShieldSlash weight={'duotone'} size={120}/>
                    401
                </div>
                Unauthorized Access!
            </h2>
            <p className={'md:w-1/2 mx-auto'}>
                Looks like you've stumbled upon a super-secret page! You probably shouldn't be here.
                If you think you should, then try signing in with Discord.
            </p>
            <div className={'flex items-center justify-center gap-4'}>
                <Link href='/home'>
                    <Button className={'my-5'} variant={'secondary'}>Go Home</Button>
                </Link>

                <DiscordAvatar/>
            </div>

        </div>
    )
}
