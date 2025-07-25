import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "User", email: credentials?.email };
        if (user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.journeyComplete = false; // default — update later after onboarding
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token?.id) {
  //       session.user.id = token.id as string;
  //     }
  //     session.user.journeyComplete = token.journeyComplete ?? false;
  //     return session;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.journeyComplete = user.journeyComplete ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.journeyComplete = token.journeyComplete;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page path
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
