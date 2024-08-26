import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      // Add other properties you want in the session
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    username: string;
    name: string;
    // Add other properties you want for the user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    // Add other properties you want in the JWT
  }
}