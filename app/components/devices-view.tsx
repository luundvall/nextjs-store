"use client";
import {DevicesResponse} from "@/components/server/queries";
import {Menu} from "./menu";
import {DevicesTable} from "./table";
import {DevicesUIProvider} from "@/components/state/DevicesUIContext";
import {SearchParams} from "@/app/page";

export default function DevicesView({response, searchParams}: {
    response: DevicesResponse,
    searchParams: SearchParams
}) {
    return (
        <DevicesUIProvider data={response} searchParams={searchParams}>
            <Menu/>
            <DevicesTable/>
        </DevicesUIProvider>
    );
}
