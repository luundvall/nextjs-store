import {getDevice} from "@/components/server/queries";
import {DeviceView} from "./components/device-view";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;
        const data = await getDevice({deviceId: id});
        return <DeviceView response={data}/>;
    } catch (error) {
        return <DeviceView />;
    }
}
