import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const userList = [
  { name: "hablu", password: "1234", secretCode: "1111" },
  { name: "dablu", password: "5678", secretCode: "2222" },
  { name: "bablu", password: "0000", secretCode: "3333" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Email and Password",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter Password",
        },
      },
      async authorize(credentials, req) {
        // login logic here----------->
        const { email, password } = credentials;

        // const user = userList.find(u=> u.name == username)

        const user = await dbConnect("users").findOne({ email });
        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    //   async redirect({ url, baseUrl }) {
    //     return baseUrl
    //   },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        ((token.email = user.email), (token.role = user.role));
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
