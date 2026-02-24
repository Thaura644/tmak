import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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
          const user = await prisma.user.findUnique({ where: { email: credentials.username } });
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return { id: user.id, email: user.email, name: user.email, role: user.role };
          }
        } catch (error) { console.error("Auth error:", error); }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) { token.role = user.role; token.id = user.id; }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) { (session.user as any).role = token.role; (session.user as any).id = token.id; }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" as const },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
