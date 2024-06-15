import NextAuth, {Session} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";

interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: string[];
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read',
      token: 'https://discord.com/api/oauth2/token',
      userinfo: 'https://discord.com/api/users/@me',
      profile(profile) {
        return {
          id: profile.id,
          nick: profile.global_name ?? profile.username, // Fallback to username if global_name is null
          name: profile.username,
          email: profile.email,
          image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          discriminator: profile.discriminator,
          verified: profile.verified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.id = profile.id as string;
        token.nick = (profile.global_name ?? profile.username) as string;
        token.name = profile.username as string;
        token.email = profile.email as string;
        token.image = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null;
        token.discriminator = profile.discriminator as string;
        token.verified = profile.verified as boolean;
      }

      if (token.accessToken) {
        try {
          const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });

          if (!guildsResponse.ok) {
            throw new Error(`${guildsResponse.status}: ${guildsResponse.statusText}`)
          }

          const guilds: Guild[] = await guildsResponse.json();

          const everthornGuild = guilds.find((guild) => guild.id === "611008530077712395");

          let everthornMemberInfo = {
            isMember: !!everthornGuild,
            everthorn: everthornGuild?.id,
            isCM: (process.env.DEV?.toLowerCase() === "true") ?? false,
          };

          if (everthornGuild) {
            const everthornUserResponse = await fetch(`http://everthorn.net:8282/api/v0.1/users/guild/${everthornGuild.id}/${token.id}`);
            if (everthornUserResponse.ok) {
              const userData = (await everthornUserResponse.json()).user;
              everthornMemberInfo.isCM = userData?.role === "Community Manager";
            }
          }

          token.everthornMemberInfo = everthornMemberInfo;
        } catch (err: Error | any) {
          console.log(err);
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.user.nick = token.nick as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.discriminator = token.discriminator as string;
      session.user.verified = token.verified as boolean;
      session.user.everthornMemberInfo = token.everthornMemberInfo;
      return session;
    },
  },
});
