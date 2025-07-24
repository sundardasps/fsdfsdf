import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your own logic to verify credentials, e.g., query DB
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
  callbacks: {
    async session({ session, user }) {
      // Add user ID or custom data to session if needed
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page path
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
