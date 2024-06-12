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
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function DiscordAvatar() {
  const session = useSession().data

  if (!session?.user) {
    return (
      <form action={signInWithDiscord}>
        <Button type="submit" className="flex gap-2">
          <Icons.discord className="size-6" weight="fill"/>
          Login with Discord
        </Button>
      </form>
    );
  } else {
    return (
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 px-2" onClick={() => console.log("clicked")}>
            <img src={session.user.image || ""} className="rounded-full h-[120%] aspect-square" alt="Avatar"/>
            {session.user?.name}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>

          <DropdownMenuSeparator/>

          <DropdownMenuItem onClick={() => {
            signOut({ redirect: true })
          }}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
    );
  }
}

