import React from "react";
import {Device} from "@/components/server/queries";

export function useDebounced<T>(value: T, delay = 1000) {
    const [debounced, setDebounced] = React.useState(value);
    React.useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

export function apiLinkToPagePath(link: string | null | undefined, basePath: string = "") {
    if (!link) return null;
    try {
        const u = new URL(link, "http://local");
        const page = u.searchParams.get("page") ?? "1";
        const pageSize = u.searchParams.get("pageSize") ?? "25";
        const q = u.searchParams.get("q") ?? "";
        return `${basePath}?page=${page}&pageSize=${pageSize}&q=${encodeURIComponent(q)}`;
    } catch {
        return null;
    }
}

export function getImageSrc(device: Device, size = 64) {
    const domain = "https://images.svc.ui.com"
    const staticUrl = `https://static.ui.com/fingerprint/ui/images/${device.id}/default/${device.images.default}.png`
    const encoded = encodeURIComponent(staticUrl)
    return `${domain}/?u=${encoded}&w=${size}&q=75`
}
