import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPayload } from 'payload'
import config from '@/payload.config'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const payload = await getPayload({ config })

          // Use payload.login to verify credentials
          const { user, token } = await payload.login({
            collection: 'users',
            data: {
              email: credentials.username,
              password: credentials.password,
            },
          })

          if (user) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.email,
              role: user.role
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
