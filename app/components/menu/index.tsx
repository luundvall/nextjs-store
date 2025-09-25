"use client";
import React, {useState, useRef, useEffect} from "react";
import {Separator} from "@/components/ui/separator";
import {Grid3X3, List, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Toggle} from "@/components/ui/toggle";
import {MenuWrapper} from "@/components/ui/menu-wrapper";
import {useDevicesUI} from "@/components/state/DevicesUIContext";
import {getDevices} from "@/components/server/queries";
import {pageNumber, defaultPageSize} from "@/components/utils/constants";
import {useDebounced} from "@/components/hooks/use-debounced";

export function Menu() {
    const {view, setView, query: q, setQuery, response, setResponse} = useDevicesUI();
    const {meta} = response;
    const debouncedQ = useDebounced(q.trim(), 1000);
    const [cleared, setCleared] = useState(false);
    const lastAppliedRef = useRef<string>("");

    useEffect(() => {

        if (!debouncedQ && !cleared) {
            setCleared(true)
            lastAppliedRef.current = "";
            (async () => {
                try {
                    const data = await getDevices({ page: pageNumber, pageSize: defaultPageSize });
                    setResponse(data);
                } catch (error) {
                    throw new Error("Failed to fetch devices");
                }
            })();
            return;
        }

        if (debouncedQ === lastAppliedRef.current) return;
        (async () => {
            try {
                setCleared(false)
                const data = await getDevices({
                    q: debouncedQ,
                    page: pageNumber,
                    pageSize: defaultPageSize
                });
                setResponse(data);
                lastAppliedRef.current = debouncedQ;
            } catch (err: any) {
                if (err?.name === "AbortError") return; // expected on fast re-typing
                throw new Error("Failed to fetch devices");
            }
        })();
    }, [debouncedQ, pageNumber, defaultPageSize, setResponse, response]);

    return (
        <MenuWrapper>
            <div className="text-sm text-muted-foreground">Devices</div>
            <Separator orientation="vertical" className="h-6"/>
            <div className="relative ml-auto w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input
                    value={q}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="pl-9 pr-20"
                />
                <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{meta?.total ?? 0} Devices
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Toggle aria-label="List view" pressed={view === "list"}
                        onPressedChange={() => setView("list")}> <List className="h-4 w-4"/> </Toggle>
                <Toggle aria-label="Grid view" pressed={view === "grid"}
                        onPressedChange={() => setView("grid")}> <Grid3X3 className="h-4 w-4"/> </Toggle>
            </div>
        </MenuWrapper>
    );
}
