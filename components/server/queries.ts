import {Device} from "../types/device";
type FetchParams = { page: number; pageSize: number, q?: string };


export type DevicesResponse = {
    devices: Device[];
    meta: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
        hasPrev: boolean;
        hasNext: boolean;
    };
    links: {
        self: string;
        prev?: string | null;
        next?: string | null;
    };
};

type CachedItem<T> = {
    data: T;
    expiresAt: number;
};

const CACHE_TTL = 60 * 1000; // 1 minute

const getCachedResponse = (url: URL) => {
    if (typeof window === "undefined") return null; // guard: only run client-side
    try {
        const cached = localStorage.getItem(url.toString());
        if (!cached) return null;

        const parsed: CachedItem<unknown> = JSON.parse(cached);

        if (Date.now() > parsed.expiresAt) {
            localStorage.removeItem(url.toString());
            return null;
        }
        return parsed.data as DevicesResponse;
    } catch (err) {
        return null;
    }
};

const setCachedResponse = (url: string, data: DevicesResponse) => {
    if (typeof window === "undefined") return null; // guard: only run client-side
    const cached: CachedItem<DevicesResponse> = {
        data,
        expiresAt: Date.now() + CACHE_TTL,
    };
    localStorage.setItem(url, JSON.stringify(cached));
};

export async function getDevices(params: FetchParams) {
    const {page, pageSize, q} = params;
    const url = new URL("/api/devices", process.env.APP_URL || window.location.origin);
    if (q) url.searchParams.set("q", q);
    if (page) url.searchParams.set("page", page.toString());
    if (pageSize) url.searchParams.set("pageSize", pageSize.toString());
    const cachedResponse = getCachedResponse(url);
    if (cachedResponse) return cachedResponse;
    const res = await fetch(url, {cache: "force-cache", next: { revalidate: 60 }});
    if (!res.ok) throw new Error(await res.text());
    const data = (await res.json()) as DevicesResponse
    setCachedResponse(url.toString(), data);
    return data;
}

export async function getDevice(params: { deviceId: string }) {
    try {
        const {deviceId} = params;
        const url = new URL(`/api/device/?id=${deviceId}`, process.env.APP_URL || window.location.origin);
        const res = await fetch(url, {cache: "force-cache", next: { revalidate: 60 }});
        if (!res.ok) throw new Error(await res.text());
        return (await res.json()) as Device;
    } catch (error) {
        throw error;
    }
}

