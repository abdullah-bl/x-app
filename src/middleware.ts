import { NextResponse, type NextRequest } from "next/server"
import { getUserFromCookies } from "./lib/auth"

export async function middleware(request: NextRequest) {
  console.log("Middleware")
  // Add your middleware here
  const user = await getUserFromCookies() // get user from cookies
  const pathname = request.nextUrl.pathname
  console.info(
    "logged in as",
    user?.username,
    "pathname",
    pathname,
    "verified",
    user?.verified
  )

  // check if user is logged in and verified before accessing the page
  if (!user && pathname !== "/login") {
    console.info("redirecting to /login")
    return NextResponse.redirect(new URL("/login", request.url))
  } else if (user && user.verified && pathname === "/login") {
    console.info("redirecting to /")
    return NextResponse.redirect(new URL("/", request.url))
  } else if (user && !user?.verified && pathname !== "/verify") {
    console.info("redirecting to /verify")
    return NextResponse.redirect(new URL("/verify", request.url))
  } else {
    return NextResponse.next()
  }

  // if (user) {
  //   if (user.verified) {
  //     if (pathname === "/login")
  //       return NextResponse.redirect(new URL("/", request.url))
  //     else return NextResponse.next()
  //   } else {
  //     if (pathname === "/verify") return NextResponse.next()
  //     else return NextResponse.redirect(new URL("/verify", request.url))
  //   }
  // } else {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)"
    "/((?!api|_next/static|_next/image|.*.png$|.*.ico$).*)",
  ],
}
