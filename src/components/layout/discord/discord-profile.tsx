"use client"

import { User } from "next-auth"
import { EverthornMemberInfo } from "@/types/discord"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface DiscordProfileProps {
    profile: User & { everthornMemberInfo: EverthornMemberInfo } | undefined
}

export function DiscordProfile({ profile }: DiscordProfileProps) {
    if (typeof profile === "undefined") return <></>

    return (
        <div className="mb-4">
            {/* Top banner and profile picture */}
            <div
                className={cn(
                    "relative h-24 w-full rounded",
                    { "h-14": !profile.banner }
                )}
                style={{ backgroundColor: profile.banner_color as string }}
            >
                {profile.banner ? (
                    <img
                        src={profile.banner}
                        alt="Profile banner"
                        className="size-full rounded-xs object-cover"
                    />
                ) : undefined}

                {/* Profile picture with decoration */}
                <div className="absolute -bottom-11 left-0 size-[5.5rem]">
                    <img
                        src={profile.image as string}
                        alt="User profile picture."
                        className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full outline outline-4 outline-card"
                    />

                    {profile.decoration ? (
                        <img
                            src={profile.decoration as string}
                            alt=""
                            className="absolute left-1/2 top-1/2 size-[5.5rem] -translate-x-1/2 -translate-y-1/2"
                        />
                    ) : undefined}
                </div>
            </div>

            {/* Badges */}
            <div className="mx-1 my-2 flex h-6 justify-end gap-1">
                {profile.everthornMemberInfo.isMember && (
                    <Badge variant="cyan">Member</Badge>
                )}

                {profile.everthornMemberInfo.isCM && (
                    <Badge variant="purple">Manager</Badge>
                )}
            </div>

            {/* Nickname and username */}
            <div className="mx-3">
                <p className="m-0 text-white text-lg">
                    <b>{profile.nick}</b>
                </p>
                <p className="m-0 text-muted-foreground -mt-1 text-sm">
                    @{profile.name}
                </p>
            </div>
        </div>
    )
}
