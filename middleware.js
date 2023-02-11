import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // 'secret' should be the same 'process.env.SECRET' use in NextAuth function
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("session in middleware: ", session);
  // console.log(req);
  // console.log(req.url);
  // console.log(session.isAdmin);

  if (session?.isAdmin !== true) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/admin/:path*",
};
