"use client"

import {useSession} from "next-auth/react";
import {NoPermission} from "@/components/no-permission";
import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";
import {DiscordProfile} from "@/components/client/discord-profile";

export default function MyProfile({ params }: { params: { edit: boolean } }) {
  const {data: session, status} = useSession();

  if (status === "loading") return <p>Loading...</p>

  if (status === "unauthenticated") return <NoPermission status={status} />

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1>{ session?.user?.nick }</h1>
      <Separator />
      <Card className="p-1 w-60">
        <DiscordProfile profile={session?.user} />
      </Card>
    </section>
  )
}
