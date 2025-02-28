import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { loginAction, refreshTokenAction } from "./actions/auth";
import JWT from "jsonwebtoken";

export const {
  auth,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    CredentialProvider({
      credentials: {
        email: { label: "Email", type: "email", name: "email" },
        password: { label: "Password", type: "password", name: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await loginAction({
            email: credentials.email,
            password: credentials.password,
          });
          if (!user?.error) {
            return { ...user?.data, expired: Date.now() + 10000 };
          }
          throw new Error("");
        } catch {
          throw new Error("Invalid credentials.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, session }) {
      if (token && token?.expired && Date.now() > token?.expired) {
        token.expired = Date.now() + parseInt(process.env.CHECK_EXPIRED);
        try {
          JWT.verify(token, process.env.JWT_SECRET);
        } catch {
          const newToken = await refreshTokenAction({
            refreshToken: token.token.refreshToken,
          });
          if (newToken) {
            token.token = { ...newToken?.data };
          }
        }
      }

      return { ...user, ...token, ...session };
    },
    session({ token, newSession, user }) {
      return { ...token, ...newSession, ...user };
    },
  },
});
