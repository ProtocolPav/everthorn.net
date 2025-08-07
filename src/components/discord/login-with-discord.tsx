import {signInWithDiscord} from "@/lib/authActions";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {DiscordLogoIcon} from "@phosphor-icons/react";

export function LoginWithDiscord({className}: { className?: string}) {
    return (
        <form action={signInWithDiscord} className={'flex-1'}>
            <Button type="submit" className={cn(className, "flex gap-2 w-full")}>
                <DiscordLogoIcon weight="fill"/>
                Login
            </Button>
        </form>
    )
}