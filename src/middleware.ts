import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // to get all the pathnames
  const path=request.nextUrl.pathname

  // storing the public paths which will protected after login
  const isPublicPath= path === '/login' || path== '/signup' || path=="/verifyemail" || path=="/forgetpassword"

  // getting the token
  const token=request.cookies.get("token")?.value || ''

  // logic - if token is present and we are accesssing the public path then redirect to home page
   if(isPublicPath && token){
    return NextResponse.redirect(new URL("/",request.nextUrl))
   }
// if token is not present and then we cant access non public path
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
   }



}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/",
"/login",
"/signup",
"/profile",
"/verifyemail",
"/forgetpassword",]
}