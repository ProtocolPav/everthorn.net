import { signInWithDiscord } from "@/lib/authActions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Check, X, SignOut } from "@phosphor-icons/react";

export function DiscordAvatar() {
  const {data: session, status} = useSession()

  console.log(session)

  if (status === "unauthenticated") {
    return (
      <form action={signInWithDiscord}>
        <Button type="submit" className="flex gap-2">
          <Icons.discord className="size-6" weight="fill"/>
          Login with Discord
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

  if (status === "authenticated" && session.user !== undefined) {
    return (
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 px-2" onClick={() => console.log("clicked")}>
            <img src={session.user.image || ""} className="rounded-full h-[120%] aspect-square" alt="Avatar"/>
            {session.user?.nick}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>

          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Discriminator: {session.user.discriminator}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              ID: {session.user.id}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              Nickname: {session.user.nick}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              Username: {session.user.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              Email: {session.user.email}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="flex gap-2 items-center">
              Verified: {session.user.verified ? <Check size={16} color="green"/> : <X size={16} color="red" />}
            </DropdownMenuLabel>
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
}

