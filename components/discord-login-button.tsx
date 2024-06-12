import { signInWithDiscord } from "@/lib/authActions";
import { Icons } from "@/components/icons";

export async function SignInButton() {
  return (
    <form
      action={signInWithDiscord}
    >
      <button type="submit">
        <Icons.discord className="size-6" weight="fill" />
        Signin with Discord
      </button>
    </form>
  )
}
