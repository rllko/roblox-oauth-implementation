import { NextRequest, NextResponse } from "next/server";
import { login } from "@/app/actions";
import { redirect } from "next/navigation";
import { fetchToken, fetchUserProfile, UserInfo } from "@/app/lib/roblox-oauth";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code")

    const error = req.nextUrl.searchParams.get("error");

    const error_description = req.nextUrl.searchParams.get("error_description");

    if (error) {
        return NextResponse.json({
            error, error_description
        })
    }

    if (!code) {
        return new Response(null, { status: 401 })
    }

    const {
        access_token,
        refresh_token,
        expires_in
    } = await fetchToken(code);

    const user: UserInfo = await fetchUserProfile(access_token);

    user.refresh_token = refresh_token;
    user.expires_in = expires_in;

    await login(user)

    return redirect("/");
}

