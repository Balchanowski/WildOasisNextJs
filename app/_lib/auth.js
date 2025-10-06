import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};
// Create the NextAuth handler and export it in a form the Next.js app router expects.
// NextAuth(...) returns a handler function — not an object with `handlers` to destructure.
const handler = NextAuth(authConfig);

// Export for app router route handlers
export { handler as GET, handler as POST };

// Also export `auth` in case other modules expect a named `auth` export.
export const auth = handler;
export const signIn = handler;
export const signOut = handler;
