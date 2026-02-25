import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";


const userList = [
  { name: "hablu", password: "1234", secretCode: "1111" },
  { name: "dablu", password: "5678", secretCode: "2222" },
  { name: "bablu", password: "0000", secretCode: "3333" },
];



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
