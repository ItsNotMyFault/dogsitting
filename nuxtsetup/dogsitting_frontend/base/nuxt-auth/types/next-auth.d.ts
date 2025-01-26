import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User {
    id: string;
    email: string;
    image: string | null;
    name: string;
    loginName: string;
    organization: {
      name: string;
    };
  }

  interface JWT {
    user?: AdapterUser | User;
    accessToken?: string;
    error?: any;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string,
      email: string,
      image: string,
      name: string,
      loginName: string,
      orgName: string
    } & DefaultSession["user"]
    clientId: string,
    error: any
  }
}
