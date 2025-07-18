import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import {EverthornMemberInfo} from "@/types/discord";

declare module "next-auth" {
  interface User {
    id: string;
    nick: string;
    name: string;
    email: string;
    image: string | null;
    banner: string | null;
    banner_color: string | null;
    decoration: string | null;
    discriminator: string;
    verified: boolean;
  }

  interface Session {
    user: User & { everthornMemberInfo: EverthornMemberInfo }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nick: string;
    name: string;
    email: string;
    image: string | null;
    banner: string | null;
    banner_color: string | null;
    decoration: string | null;
    discriminator: string;
    verified: boolean;
    guildCacheExpiry: number;
    everthornMemberInfo: EverthornMemberInfo;
  }
}
