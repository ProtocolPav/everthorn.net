import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

interface Guild {
  id: string,
  name: string,
  icon: string,
  owner: boolean,
  permissions: number,
  permissions_new: string,
  features: string[]
}

let everthornMemberInfo: { isMember: boolean, everthorn: string | undefined };

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read',
      token: 'https://discord.com/api/oauth2/token',
      userinfo: 'https://discord.com/api/users/@me',
      async profile(profile, tokens) {
        try {
          const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`
            }
          })

          const guilds: Guild[] = await guildsResponse.json()

          const everthornGuild = guilds.find((guild) => guild.id === "611008530077712395")

          everthornMemberInfo = {
            isMember: !!everthornGuild,
            everthorn: everthornGuild?.id,
            isCM: false
          }
        } catch (err) {
          console.log(err)
        }

        return {
          id: profile.id,
          nick: profile.global_name ?? profile.username, // Fallback to username if global_name is null
          name: profile.username,
          email: profile.email,
          image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          discriminator: profile.discriminator,
          verified: profile.verified,
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.id = profile.id;
        token.nick = profile.global_name ?? profile.username;
        token.name = profile.username;
        token.email = profile.email;
        token.image = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null;
        token.discriminator = profile.discriminator;
        token.verified = profile.verified;
        token.everthornMemberInfo = everthornMemberInfo
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.nick = token.nick as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.discriminator = token.discriminator as string;
      session.user.verified = token.verified as boolean;
      session.user.everthornMemberInfo = token.everthornMemberInfo
      return session;
    }
  }
});
