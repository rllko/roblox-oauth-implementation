import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.redirect(createAuthUrl());
}

function createAuthUrl() {
    const url = new URL(`${process.env.AUTH_URL}/authorize` || '')

    url.searchParams.set("client_id", process.env.ROBLOX_ID || '')
    url.searchParams.set("scope", ["openid", "profile"].join(" "))
    url.searchParams.set("redirect_uri", process.env.ROBLOX_REDIRECT || "")
    url.searchParams.set("response_type", "code")

    return url.toString();
}