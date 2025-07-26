import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // On first sign in, set id and default journeyComplete
        // user.id may be undefined but user.sub usually exists for OIDC providers
        token.id = user.id ?? user.sub ?? null;
        token.journeyComplete = false;
      }
      if (trigger === "update" && session?.journeyComplete !== undefined) {
        token.journeyComplete = session.journeyComplete;
      }
      return token;
    },

    async session({ session, token }) {
      // Pass id and journeyComplete to session.user
      session.user.id = token.id ?? null;
      session.user.journeyComplete = token.journeyComplete ?? false;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
