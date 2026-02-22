import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: {
          label: "Username",
          type: "text",
          placeholder: "enter Name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter Password",
        },
        secretCode: {
          label: "secret Code",
          type: "number",
          placeholder: "enter Code",
        },
      },
      async authorize(credentials, req) {
        // login logic here----------->
        const { username, password, secretCode } = credentials;

        const user = userList.find(u=> u.name == username)
        if(!user) return null;

        const isPasswordCorrect = user.password == password;
        if(!isPasswordCorrect) return null;

        const isSecretCorrect = user.secretCode == secretCode;
        if (isSecretCorrect) {
            return user
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
