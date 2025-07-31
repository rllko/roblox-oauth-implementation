"use server"

import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "./lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revokeUserSession, UserInfo } from "./lib/roblox-oauth";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    return session;
}
export const login = async (userInfo: UserInfo) => {
    const session = await getSession();

    session.prefferedUsername = userInfo.preferred_username;
    session.username = userInfo.name;
    session.userId = userInfo.sub;
    session.img = userInfo.picture;
    session.isLoggedIn = true;
    session.refreshToken = userInfo.refresh_token
    session.accessToken = userInfo.access_token

    await session.save();

}
export const logout = async () => {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return null;
    }

    await revokeUserSession(session.accessToken)

    session.destroy();

    redirect("/")
}

