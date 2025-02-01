import NextAuth, { Profile, Session, User } from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";
import { EverthornMemberInfo, Guild } from "@/types/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+guilds+guilds.members.read',
      token: 'https://discord.com/api/oauth2/token',
      userinfo: 'https://discord.com/api/users/@me',
      profile(profile: DiscordProfile) {
        return { // I'm gonna cry about this bc yes
          id: profile.id,
          nick: profile.global_name ?? profile.username, // Fallback to username if global_name is null
          name: profile.username,
          email: profile.email,
          image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          banner: profile.banner ? `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=600` : null,
          banner_color: profile.banner_color,
          decoration: profile.avatar_decoration_data ? `https://cdn.discordapp.com/avatar-decoration-presets/${profile.avatar_decoration_data.asset}` : null,
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
        token = profile as JWT
      }

      if (token.accessToken) {
        try {
          let guilds: Guild[];
          let everthornMemberInfo: EverthornMemberInfo;

          const now = Date.now() / 1000;

          // Check if cache exists and is still valid
          if (!token.guildCacheExpiry || now >= token.guildCacheExpiry) {
            const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            });

            if (guildsResponse.ok) {
              guilds = await guildsResponse.json();

              const everthornGuild = guilds?.find((guild) => guild.id === "611008530077712395");
              everthornMemberInfo = {
                isMember: !!everthornGuild,
                everthorn: everthornGuild?.id,
                isCM: false
              };

              if (everthornGuild) {
                const everthornUserResponse = await fetch(`https://api.everthorn.net/v0.1/users/guild/${everthornGuild.id}/${token.id}`);

                if (everthornUserResponse.ok) {
                  const userData = (await everthornUserResponse.json());
                  everthornMemberInfo.isCM = userData?.role === "Community Manager" || userData?.role === "Owner";
                }
              }

              if (process.env.DEV?.toLowerCase() === "true") {
                everthornMemberInfo.isCM = true
              }

              // Update token with cached data and expiry
              token.everthornMemberInfo = everthornMemberInfo;
            }

            token.guildCacheExpiry = now + 3600; // Cache expiry set to 1 hour
          }
        } catch (err: Error | any) {
          console.log(err?.stack);
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token
      session.user.everthornMemberInfo = token.everthornMemberInfo;
      return session;
    },
  },
});
