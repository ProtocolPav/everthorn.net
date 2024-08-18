"use server"

import { signIn } from "@/auth"

export async function signInWithDiscord() {
  await signIn("discord")
}
