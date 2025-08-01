import { SessionOptions } from "iron-session"
import { UserAuthAttributes } from "./roblox-oauth";

export interface SessionData {
    userId?: string,
    username?: string,
    preferredUsername?: string
    picture?: string;
    profile?: string
    oauth?: UserAuthAttributes;
}

export const sessionOptions: SessionOptions = {
    password: process.env.AUTH_SECRET!,
    cookieName: "session-cookie",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}