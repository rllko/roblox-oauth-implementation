"use client";
import useSWR from 'swr'
import { useEffect } from 'react';
import { UserInfo } from './roblox-oauth';

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, { ...init, cache: 'no-store' });
    return res.json();
}

function useUser(): { user?: UserInfo, isLoading: boolean } {
    let { data: user, isValidating } = useSWR<UserInfo | unknown>(
        "/api/session", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    });

    useEffect(() => {
        if (isValidating) return;

        user = user as UserInfo;

    }, [user, isValidating]);

    return { user, isLoading: isValidating && !user };
}

export default useUser;