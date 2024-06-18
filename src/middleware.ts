import { NextResponse, type NextRequest } from "next/server"
import { getUserFromCookies, isAuthenticated } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Log the middleware invocation
  console.log("Middleware invoked")

  // Check if the user is authenticated
  const isAuth = await isAuthenticated() // get user authentication status from cookies

  // Extract the current path from the request
  const pathname = request.nextUrl.pathname

  // Define redirection logic
  if (!isAuth && pathname !== "/login") {
    // If the user is not authenticated and not on the login page, redirect to login
    console.info("Redirecting to /login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuth) {
    if (isAuth.verified && pathname === "/login") {
      // If the user is authenticated and verified, and tries to access the login page, redirect to home
      console.info("Redirecting to /")
      return NextResponse.redirect(new URL("/", request.url))
    } else if (!isAuth.verified && pathname !== "/verify") {
      // If the user is authenticated but not verified, and is not on the verification page, redirect to verify
      console.info("Redirecting to /verify")
      return NextResponse.redirect(new URL("/verify", request.url))
    }
  }

  // If none of the above conditions are met, proceed with the request
  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)"
    "/((?!api|_next/static|_next/image|.*.png$|.*.ico$).*)",
  ],
}
