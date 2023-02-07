import NextAuth from "next-auth/next";
import User from "../../../models/User";
import db from "../../../utils/db";
import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.demo) token.demo = user.demo;
      console.log("user=>", user);
      console.log("token=>", token);
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      session.userInfo = token._id;
      session.user.demo = token.demo;
      console.log("session=>", session);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        // console.log(res);
        await db.disconnect();

        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            ...user,
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "f",
            demo: user._id,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
