"use server"

import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revokeUserSession, UserAuthAttributes, UserInfo } from "@/app/lib/roblox-oauth";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    return session;
}

export const login = async (userInfo: UserInfo, auth: UserAuthAttributes) => {
    const session = await getSession();

    session.preferredUsername = userInfo.preferred_username;
    session.username = userInfo.name;
    session.userId = userInfo.sub;
    session.picture = userInfo.picture;
    session.profile = userInfo.profile;

    session.oauth = auth;

    await session.save();

}
export const logout = async () => {
    const session = await getSession();

    if (!session.userId) {
        return null;
    }

    await revokeUserSession(session.oauth?.access_token as string)

    session.destroy();

    redirect("/")
}

