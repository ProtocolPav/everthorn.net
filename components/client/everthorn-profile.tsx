"use client"

import {User} from "next-auth";
import {EverthornMemberInfo} from "@/types/discord";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

interface DiscordProfileProps {
  profile: User & { everthornMemberInfo: EverthornMemberInfo } | undefined
}

export function EverthornProfile({ profile }: DiscordProfileProps) {
  if (typeof profile === "undefined") return <></>

  profile.banner = (profile.banner !== null) ? profile.banner : "https://cdn.discordapp.com/guilds/611008530077712395/users/480476100368138250/banners/260152af435a7cc425eab6e6bc59f221.png?size=1024"

  return (
    <div>
      {/* Top banner and profile picture */}
      <div
        className={ cn("relative w-full aspect-[340/120] max-h-64 rounded-sm", { "h-28": !profile.banner })}
        style={{ backgroundColor: profile.banner_color as string }}
      >
        {
          (profile.banner)
            ? (
              <img
                src={profile.banner}
                alt="Profile banner"

                className="h-full w-full rounded-sm object-cover"
              />
            )
            : undefined
        }

        {/* Profile picture with decoration */}
        <div className="absolute -bottom-[4rem] md:-bottom-[5.5rem] left-0 size-[8rem] md:size-[11rem]">
          <img
            src={profile.image as string}
            alt="User profile picture."

            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-[5.5rem] md:size-32 outline outline-[6px] md:outline-8 outline-background"
          />
          {
            (profile.decoration)
              ? (
                <img
                  src={profile.decoration as string}
                  alt=""

                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[8rem] md:size-[11rem]"
                />
              )
              : undefined
          }
        </div>

      </div>
      {/* Badges and nickname */}
      <div className="flex relative justify-end my-2 mx-1 h-10 gap-1 py-1 md:py-2 md:h-12">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl hidden md:block">{ profile.nick }</h1>
        {
          (profile.everthornMemberInfo.isMember)
            ? (
              <Badge variant={null} className="bg-gradient-to-r from-green-400 to-green-800 text-black md:text-md">Member</Badge>
            )
            : undefined
        }
        {
          (profile.everthornMemberInfo.isCM)
            ? (
              <Badge variant={null} className="bg-gradient-to-r from-blue-400 to-blue-800 text-black md:text-md" >CM</Badge>
            )
            : undefined
        }
      </div>
    </div>
  )
}
