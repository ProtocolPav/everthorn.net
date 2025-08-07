import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import {SignOutIcon, PencilSimpleIcon, ChartBarIcon} from "@phosphor-icons/react";
import {DiscordProfile} from "@/components/discord/discord-profile";
import {LoginWithDiscord} from "@/components/discord/login-with-discord";
import Loader from "@/components/layout/loader";

export function DiscordButton({className}: {className?: string}) {
  const {data: session, status} = useSession()

  if (status === "unauthenticated") {
    return <LoginWithDiscord className={className}/>
  }

  if (status === "loading") {
    return (
        <Button variant="invisible" size={'icon'} className="gap-2 overflow-hidden rounded-full">
          <Loader/>
        </Button>
    )
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="invisible" size={'icon'} className="gap-2 overflow-hidden rounded-full">
          <img src={session?.user?.image || ""} className="aspect-square" alt="Avatar"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mr-2" align={"center"}>

        <DiscordProfile profile={session?.user}/>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={true} className={'gap-1'}>
          <ChartBarIcon className="mr-2" />
          <span>View My Stats</span>
        </DropdownMenuItem>

        <DropdownMenuItem disabled={true} className={'gap-1'}>
          <PencilSimpleIcon className="mr-2" />
          <span>Edit Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator/>

        <DropdownMenuItem onClick={async () => { await signOut({ redirect: true }) }} className={'gap-1'}>
          <SignOutIcon className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );

}

