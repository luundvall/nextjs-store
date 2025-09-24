import {getDevices} from "@/components/server/queries";
import DevicesView from "./components/devices-view";
import {pageNumber, defaultPageSize} from "@/components/utils/constants";

export type SearchParams = { page?: string; pageSize?: string, q: string | undefined };

export default async function DevicesPage(props: { searchParams: Promise<SearchParams> }) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page ?? pageNumber);
    const pageSize = Number(searchParams?.pageSize ?? defaultPageSize);
    const q = searchParams?.q ?? "";
    const initialSearchParams = { page, pageSize, q };
    const data = await getDevices(initialSearchParams);
    return (
        <div className="w-full h-full bg-muted/30">
            <DevicesView response={data} searchParams={searchParams} />
        </div>
    );
}
