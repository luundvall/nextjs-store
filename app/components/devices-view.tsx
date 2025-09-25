"use client";
import {DevicesResponse} from "@/components/server/queries";
import {Menu} from "./menu";
import {DevicesTable} from "./table";
import {DevicesUIProvider} from "@/components/state/DevicesUIContext";
import {SearchParams} from "@/app/page";
import {NoData} from "@/app/components/no-data";

export default function DevicesView({response, searchParams}: {
    response?: DevicesResponse | undefined,
    searchParams?: SearchParams | undefined
}) {
    if (!response) return <NoData/>;
    return (
        <DevicesUIProvider data={response} searchParams={searchParams}>
            <Menu/>
            <DevicesTable/>
        </DevicesUIProvider>
    );
}
