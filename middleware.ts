"use server";
 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./utils/sessions";
 
export async function middleware(request: NextRequest) {
  const isAuthorized = await checkAuth();
 
  if (
    request.nextUrl.pathname.startsWith("/mon-compte") &&
    isAuthorized.status >= 300
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
    
  }
  if (
    request.nextUrl.pathname.startsWith("/joconde") &&
    isAuthorized.status >= 300
  ) {
    return NextResponse.redirect(new URL("/login", request.url));

  }
  if (
    request.nextUrl.pathname.startsWith("/liberte") &&
    isAuthorized.status >= 300
  ) {
    return NextResponse.redirect(new URL("/login", request.url));

  }
  if (
    request.nextUrl.pathname.startsWith("/nuitetoilee") &&
    isAuthorized.status >= 300
  ) {
    return NextResponse.redirect(new URL("/login", request.url));

  }
}