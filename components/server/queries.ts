type FetchParams = { page: number; pageSize: number, q?: string };

export type Device = {
    id: string;
    product: { name: string; abbrev: string };
    images: { default: string; nopadding: string; topology: string };
};

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

export async function getDevices(params: FetchParams) {
    const { page, pageSize, q } = params;
    const url = new URL("/api/devices", process.env.APP_URL || window.location.origin);
    if (q) url.searchParams.set("q", q);
    if (page) url.searchParams.set("page", page.toString());
    if (pageSize) url.searchParams.set("pageSize", pageSize.toString());
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as DevicesResponse;
}

