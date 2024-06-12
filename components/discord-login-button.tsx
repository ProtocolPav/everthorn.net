import { signInWithDiscord } from "@/lib/authActions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button"

export async function SignInButton() {
  return (
    <form
      action={signInWithDiscord}
    >
      <Button type="submit" className="flex gap-2">
        <Icons.discord className="size-6" weight="fill" />
        Login with Discord
      </Button>
    </form>
  )
}
