import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Redirect to dashboard if trying to access login page while authenticated
    if (req.nextUrl.pathname.startsWith("/auth/signin") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/", "/users", "/products", "/categories", "/settings", "/auth/signin"],
}