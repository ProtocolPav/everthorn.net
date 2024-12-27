import { signInWithDiscord } from "@/lib/authActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {SignOut, PencilSimple, DiscordLogo} from "@phosphor-icons/react";
import {DiscordProfile} from "@/components/client/discord-profile";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function DiscordAvatar({className}: {className?: string}) {
  const {data: session, status} = useSession()

  if (status === "unauthenticated") {
    return (
      <form action={signInWithDiscord}>
        <Button type="submit" className={cn(className, "flex gap-2")}>
          <DiscordLogo className="size-6" weight="fill"/>
          Login
        </Button>
      </form>
    );
  }

  if (status === "loading") {
    return (
      <Button variant="outline" className="gap-2 px-2" disabled>
        Fetching info...
      </Button>
    )
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 px-2">
          <img src={session?.user?.image || ""} className="aspect-square h-[120%] rounded-full" alt="Avatar"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align={"end"} alignOffset={-88}>

        <DiscordProfile profile={session?.user}/>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile/me?edit=true" className="flex items-center">
              <PencilSimple size={24} className="mr-2" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator/>

        <DropdownMenuItem onClick={() => {
          signOut({ redirect: true })
        }}>
          <SignOut size={24} className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );

}

