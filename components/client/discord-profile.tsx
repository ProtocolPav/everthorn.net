"use client"

import {User} from "next-auth";
import {EverthornMemberInfo} from "@/types/discord";
import {cn} from "@/lib/utils";

interface DiscordProfileProps {
  profile: User & { everthornMemberInfo: EverthornMemberInfo } | undefined
}

export function DiscordProfile({ profile }: DiscordProfileProps) {
  if (typeof profile === "undefined") return <></>


  profile.banner = (profile.banner !== null) ? profile.banner : "https://cdn.discordapp.com/guilds/611008530077712395/users/480476100368138250/banners/260152af435a7cc425eab6e6bc59f221.png?size=1024"
  console.log(profile)

  return (
    <div className="mb-16">
      {/* Top banner and profile picture */}
      <div
        className={ cn("relative h-22 w-full rounded-sm", { "h-11": !profile.banner })}
        style={
        {
          backgroundImage: profile.banner,
          backgroundColor: profile.banner_color as string,
        }
      }>
        <img
          src={(profile.banner) ? profile.banner : undefined}
          alt="Profile banner"

          className="h-full w-full rounded-sm object-cover"
        />
        {/* Profile picture with decoration */}
        <div className="absolute -bottom-8 left-4 size-16">
          <img src={profile.image as string} alt="User profile picture." className="rounded-full outline outline-4 outline-background"/>
        </div>
      </div>
    </div>
  )
}
