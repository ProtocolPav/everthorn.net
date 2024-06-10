import { signIn } from "@/auth"
import { Icons } from "@/components/icons";

export async function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("discord")
      }}
    >
      <button type="submit">
        <Icons.discord className="size-6" weight="fill" />
        Signin with Discord
      </button>
    </form>
  )
}
