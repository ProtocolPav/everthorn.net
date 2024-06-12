"use server"

import { signIn } from "@/auth"

export async function signInWithDiscord() {
  await signIn("discord", { callbackUrl: "http://localhost:3000/api/auth/callback/discord" })
}
