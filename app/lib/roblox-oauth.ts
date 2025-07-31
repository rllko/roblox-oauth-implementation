import { getSession } from "../actions";
import { SessionData } from "./session";

export interface UserInfo {
    sub: string,
    name: string,
    preferred_username: string,
    created_at: string,
    profile: string,
    picture: string,
    refresh_token: string,
    access_token: string,
    expires_in: number;
}


interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}


export interface OauthToken {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: number,
    id_token: string
}


export const refreshRobloxToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const body = new URLSearchParams({
        client_id: process.env.ROBLOX_CLIENT_ID as string,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_secret: process.env.ROBLOX_CLIENT_SECRET as string,
    }).toString()

    const response = await fetch(`${process.env.AUTH_URL}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Roblox token refresh failed:", errorData);
        throw new Error(`Roblox token refresh failed: ${errorData.error_description || response.statusText}`);
    }

    return await response.json();
}

export const fetchToken = async (code: string): Promise<OauthToken> => {
    const body = new URLSearchParams({
        client_id: process.env.ROBLOX_ID as string,
        client_secret: process.env.ROBLOX_SECRET as string,
        grant_type: "authorization_code",
        redirect_uri: process.env.ROBLOX_REDIRECT as string,
        code,
        scope: ["openid", "profile"].join(" "),
    }).toString();

    return await fetch(`${process.env.AUTH_URL}/token`, {
        cache: 'no-store',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
    }).then(async (res) => {
        const resp = await res.json()
        return resp;

    })

}

export const fetchUserProfile = async (access_token: string): Promise<UserInfo> => {
    return await fetch(`${process.env.AUTH_URL}/userinfo`, {
        cache: 'no-store',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${access_token}`
        },
    }).then(async (res) => {
        const resp = await res.json()
        console.log(resp);
        return resp;

    })
}

export const revokeUserSession = async (access_token: string): Promise<UserInfo> => {
    return await fetch(`${process.env.AUTH_URL}/token/revoke`, {
        cache: 'no-store',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${access_token}`
        }
    }).then(async (res) => await res.json())
}