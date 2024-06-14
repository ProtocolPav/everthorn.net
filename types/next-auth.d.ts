import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    nick: string;
    name: string;
    email: string;
    image: string | null;
    discriminator: string;
    verified: boolean;
    everthornMemberInfo: {
      isMember: boolean;
      everthorn: string | undefined;
      isCM: boolean;
    };
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nick: string;
    name: string;
    email: string;
    image: string | null;
    discriminator: string;
    verified: boolean;
    everthornMemberInfo: {
      isMember: boolean;
      everthorn: string | undefined;
      isCM: boolean;
    };
  }
}
