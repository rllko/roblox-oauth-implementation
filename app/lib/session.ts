import { SessionOptions } from "iron-session"

export interface SessionData {
    userId?: string,
    username?: string,
    prefferedUsername?: string
    refreshToken?: string;
    accessToken: string;
    expiresAt?: number
    isLoggedIn?: boolean;
    img?: string
}

export const sessionOptions: SessionOptions = {
    password: process.env.AUTH_SECRET!,
    cookieName: "session-cookie",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}