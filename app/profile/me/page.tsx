"use client"

import {useSession} from "next-auth/react";
import {NoPermission} from "@/components/no-permission";
import {Separator} from "@/components/ui/separator";
import {EverthornProfile} from "@/components/client/everthorn-profile";
import ThornyUserProfile from "@/components/server/thorny-user-profile";

export default function MyProfile({ params }: { params: { edit: boolean } }) {
  const {data: session, status} = useSession();

  if (status === "loading") return <p>Loading...</p>

  if (status === "unauthenticated") return <NoPermission status={status} />

  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <EverthornProfile profile={session?.user} />
      <h1 className="md:hidden">{ session?.user.nick }</h1>
      <Separator className="mt-2 md:mt-4" />
      <ThornyUserProfile userID={session?.user?.id as string} />
    </section>
  )
}
