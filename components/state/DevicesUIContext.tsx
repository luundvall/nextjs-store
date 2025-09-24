"use client";

import React, {useEffect} from "react";
import {DevicesResponse} from "@/components/server/queries";
import {SearchParams} from "@/app/page";

type ViewMode = "list" | "grid";

type DevicesUIState = {
    view: ViewMode;
    setView: (v: ViewMode) => void;
    query: string;
    setQuery: (q: string) => void;
    response: DevicesResponse;
    setResponse: (r: DevicesResponse) => void;
};

const DevicesUIContext = React.createContext<DevicesUIState | null>(null);

export function useDevicesUI() {
    const ctx = React.useContext(DevicesUIContext);
    if (!ctx) throw new Error("useDevicesUI must be used within DevicesUIProvider");
    return ctx;
}

export function DevicesUIProvider({
                                      children,
                                      initialView = "list",
                                      data = {} as DevicesResponse,
                                      searchParams
                                  }: {
    children: React.ReactNode;
    initialView?: ViewMode;
    data?: DevicesResponse;
    searchParams: SearchParams;
}) {
    const [view, setView] = React.useState<ViewMode>(initialView);
    const [query, setQuery] = React.useState(searchParams.q ?? "");
    const [response, setResponse] = React.useState<DevicesResponse>(data);
    useEffect(() => {
        setResponse(data)
    }, [data]);
    return (
        <DevicesUIContext.Provider value={{view, setView, query, setQuery, response, setResponse}}>
            {children}
        </DevicesUIContext.Provider>
    );
}
