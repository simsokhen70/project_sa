import NextAuth, { DefaultSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { registerUser, signInUserBody } from "@/services/authservice.service";

// Extend the built-in session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    token?: string;
    error?: string;
    user: {
      username: string;
      token: string;
      profile: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    token: string;
    profile: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    username?: string;
    profile: string;
    email: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}

export const jwt = async ({ token, user, account }: { token: JWT; user?: User; account?: any }) => {
  if (user) {
    token.username = user.username;
    token.token = user.token;
    token.profile = user.profile;
    token.email = user.email;
  }
  if (account && account.provider === "google") {
    token.token = account.access_token;
  }
  return token;
};

export const session = async ({ session, token }: { session: any; token: JWT }) => {
  if (session.user) {
    session.user = {
      ...session.user,
      username: (token as JWT & { username: string }).username || '',
      token: token.token,
      profile: token.profile,
      email: token.email
    };
  }
  session.token = token.token;
  return session;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await signInUserBody({
            username: credentials.username,
            password: credentials.password
          });

          if (response.status === 200 && response.data) {
            console.log("response data : ", response.data)
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // async profile(profile) {
      //     console.log("profile", profile);
      //   return profile.username;
      // }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: (2 * 60 - 2) * 60, // 2 hours
  },
  callbacks: {
    jwt,
    session,
    // async signIn({ user, account, profile }) {
    //   if (account?.provider === "google") {
    //     console.log("abc " , user)
    //     try {
    //       const dfProfile = "https://img.freepik.com/premium-vector/3d-character-businessman-working-laptop-computer_595064-185.jpg";
    //       const res = await registerUser(user.email.substring(0, user.email.indexOf('@')), 'MIz6tTEHE9JKOxq8tguRIxRB3H3Si9Sjr0UrWRo/FdzG1IfzoO', user.email!, user.profile || dfProfile);
    //       if (res.status === 200) {
    //         return true;
    //       } else {
    //         // Handle registration failure
    //         return true;
    //       }
    //     } catch (error) {
    //       console.error("Error registering user:", error);
    //       return true;
    //     }
    //   }
    //   return true;
    // },
  },
  pages: {
    signIn: '/signin',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };