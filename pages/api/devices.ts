import type {NextApiRequest, NextApiResponse} from 'next'
import {Device} from '@/components/types/device';

const fetchUrl = 'https://static.ui.com/fingerprint/ui/public.json';

type ResponseData = {
    devices: Device[],
    meta: {
        page: number,
        pageSize: number
        total: number;
        totalPages: number;
        hasPrev: boolean;
        hasNext: boolean;
    },
    links?: {
        self: string | null;
        prev: string | null;
        next: string | null;
    }
}

type ResponseError = {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ResponseError>
) {
    try {
        const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
        const {q, page, pageSize} = getQueryParams(url);
        const r = await fetch(fetchUrl, {cache: "force-cache"});
        if (!r.ok) {
            throw new Error()
        }
        const raw = (await r.json()) as { devices?: Device[] };
        let list: Device[] = raw.devices ?? [];

        if (q) {
            list = list.filter(d => matchesQuery(d, q));
        }
        list.sort((a, b) => (a.product?.name || "").localeCompare(b.product?.name || ""));

        // paginate
        const total = list.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const currentPage = Math.min(page, totalPages);
        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, total);
        const slice = list.slice(start, end);

        const links = {
            self: withParams(url, {page: currentPage, pageSize}),
            prev: currentPage > 1 ? withParams(url, {page: currentPage - 1, pageSize}) : null,
            next: currentPage < totalPages ? withParams(url, {page: currentPage + 1, pageSize}) : null,
        };

        res.json({
            devices: slice, // keep your original key
            meta: {
                page: currentPage,
                pageSize,
                total,
                totalPages,
                hasPrev: currentPage > 1,
                hasNext: currentPage < totalPages,
            },
            links,
        });
    } catch (error: any) {
        res.status(500).json({message: `something wen wrong: ${error?.message}`})
    }
}

function getQueryParams(
    url: URL
) {
    return {
        q: (url.searchParams.get("q") || "").trim().toLowerCase(),
        page: clampInt(url.searchParams.get("page"), 1, 1, 100),
        pageSize: clampInt(url.searchParams.get("pageSize"), 50, 1, 200), // cap max page size
    }
}

function clampInt(
    val: string | null,
    fallback: number,
    min: number,
    max: number
) {
    const n = Number(val ?? "");
    if (!Number.isFinite(n)) return fallback;
    return Math.min(Math.max(Math.trunc(n), min), max);
}

function matchesQuery(d: Device, q: string) {
    const haystack = [
        d.product?.name,
        d.product?.abbrev,
        d.sku,
        ...(d.shortnames ?? []),
        d.line?.name,
        d.line?.id,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    return haystack.includes(q);
}

function withParams(url: URL, params: Record<string, string | number>) {
    const u = new URL(url);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)));
    return u.pathname + (u.search ? `?${u.searchParams.toString()}` : "");
}
