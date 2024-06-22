"use client"

import {User} from "next-auth";
import {EverthornMemberInfo} from "@/types/discord";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

interface DiscordProfileProps {
  profile: User & { everthornMemberInfo: EverthornMemberInfo } | undefined
}

export function DiscordProfileCard({ profile }: DiscordProfileProps) {
  if (typeof profile === "undefined") return <></>

  return (
    <div className="mb-4">
      {/* Top banner and profile picture */}
      <div
        className={ cn("relative h-24 w-full rounded-sm", { "h-14": !profile.banner })}
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
        <div className="absolute -bottom-11 left-0 size-[5.5rem]">
          <img
            src={profile.image as string}
            alt="User profile picture."

            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-16 outline outline-4 outline-background"
          />
          {
            (profile.decoration)
              ? (
                <img
                  src={profile.decoration as string}
                  alt=""

                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[5.5rem]"
                />
              )
              : undefined
          }
        </div>

      </div>
      {/* Badges */}
      <div className="flex justify-end my-2 mx-1 h-6 gap-1">
        {
          (profile.everthornMemberInfo.isMember)
            ? (
              <Badge variant={null} className="bg-gradient-to-r from-green-400 to-green-800 text-black">Member</Badge>
            )
            : undefined
        }
        {
          (profile.everthornMemberInfo.isCM)
            ? (
              <Badge variant={null} className="bg-gradient-to-r from-blue-400 to-blue-800 text-black" >CM</Badge>
            )
            : undefined
        }
      </div>

      {/* Nickname and username */}
      <div className="mx-3">
        <p className="text-lg m-0"><b>{ profile.nick }</b></p>
        <p className="text-sm m-0 -mt-1">{ profile.name }</p>
      </div>
    </div>
  )
}
