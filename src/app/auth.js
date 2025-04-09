import JWT from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { loginAction, refreshTokenAction } from "./actions/auth";

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
            return {
              ...user?.data,
              expired:
                Date.now() + parseInt(process?.env?.CHECK_EXPIRED) || 10000,
            };
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
        token.expired =
          Date.now() + parseInt(process.env.CHECK_EXPIRED) || 10000;
        try {
          JWT.verify(token?.token?.accessToken, process.env.JWT_SECRET);
        } catch {
          const resp = await refreshTokenAction({
            refreshToken: token?.token?.refreshToken,
          });
          if (resp?.error) {
            return null;
          }
          const newToken = resp?.data;
          if (newToken) {
            token.token = { ...newToken };
          }
        }
      }
      return { ...user, ...token, ...session };
    },
    session({ token: Token, newSession, user }) {
      const {
        token,
        role,
        avatar,
        gender,
        phoneNumber,
        registrationNo,
        rollNo,
        email,
        name,
        id,
        department,
        semester,
        shift,
      } = Token || {};
      return {
        ...{
          token,
          role,
          avatar,
          gender,
          phoneNumber,
          registrationNo,
          rollNo,
          email,
          name,
          id,
          department,
          semester,
          shift,
        },
        ...newSession,
        ...user,
      };
    },
  },
});
