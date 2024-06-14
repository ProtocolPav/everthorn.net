import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email',
      token: 'https://discord.com/api/oauth2/token',
      userinfo: 'https://discord.com/api/users/@me',
      profile(profile) {
        const obj = {
          id: profile.id,
          nick: profile.global_name ?? profile.username, // Fallback to username if global_name is null
          name: profile.username,
          email: profile.email,
          image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          discriminator: profile.discriminator,
          verified: profile.verified,
        };

        console.log(obj);

        return obj;
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
      return session;
    }
  }
});
