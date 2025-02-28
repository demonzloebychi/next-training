import { NextRequest, NextResponse } from "next/server";




export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('home', request.url))
}

export const config = {
    matcher: ['/about/:path*', 'dashboard/:path*'],
}


// app/middleware.ts
import { URL } from 'url';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === '/') {
    return NextResponse.redirect('/moscow', 301);
  }

  return NextResponse.next();
}
