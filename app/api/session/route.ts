import { getSession, logout } from "@/app/lib/actions";
import { refreshRobloxToken } from "@/app/lib/roblox-oauth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getSession();

    if (!session.userId) {
        return NextResponse.json(null)
    }

    const FIVE_MINUTES = (5 * 60)

    if (session.oauth?.expires_at as number < Date.now() + FIVE_MINUTES) {

        try {
            console.log(session.oauth?.refresh_token);

            const newSession = await refreshRobloxToken(session.oauth?.refresh_token as string);

            session.oauth!.access_token = newSession.access_token;
            session.oauth!.refresh_token = newSession.refresh_token;
            session.oauth!.expires_at = Date.now() + (newSession.expires_in * 1000);;

            await session.save();
            console.log("hi");

        } catch (err) {
            await logout();
            return new Response(null, { status: 401 });
        }
    }

    delete session.oauth;
    return Response.json(session, { status: 200 });
}