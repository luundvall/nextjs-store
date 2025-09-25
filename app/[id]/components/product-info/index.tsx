import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {LabelValue} from "@/components/ui/label-value";
import {useRouter} from "next/navigation";
import {Device} from "@/components/types/device";
import React from "react";

const getProductInfo = (device: Device) => {
    return {
        id: device.id,
        name: device?.product.name,
        lineName: device?.line.name,
        shortName: device?.shortnames.join(', '),
        maxPower: device?.unifi?.network?.radios?.na?.maxPower,
        maxSpeed: device?.unifi?.network?.radios?.na?.maxSpeedMegabitsPerSecond,
        numberOfPorts: device?.unifi?.network?.numberOfPorts,
        previousId: device?.meta?.prevDeviceId,
        nextId: device?.meta?.nextDeviceId,
    }
};

export function ProductInfo({device}: { device: Device }) {
    const {id, name, shortName, maxSpeed, maxPower, numberOfPorts, lineName, nextId, previousId} = getProductInfo(device);
    const router = useRouter();
    return (
        <>
            <div className="absolute right-4 top-4 flex gap-2">
                <Button onClick={() => router.push(`/${previousId}`)} variant="outline" size="icon" className="rounded-xl" aria-label="Previous">
                    <ChevronLeft className="h-4 w-4"/>
                </Button>
                <Button onClick={() => router.push(`/${nextId}`)} variant="outline" size="icon" className="rounded-xl" aria-label="Next">
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            </div>
            <h1 className="mb-1 text-2xl font-semibold text-gray-800">{name}</h1>so
            <p className="mb-6 text-sm text-gray-500">{lineName}</p>
            <Separator/>
            <div className="divide-y">
                <LabelValue label="Product Line" value={lineName}/>
                <LabelValue label="ID" value={id}/>
                <LabelValue label="Name" value={name}/>
                <LabelValue label="Short Name" value={shortName}/>
                {maxPower && <LabelValue label="Max. Power" value={`${maxPower} W`}/>}
                {maxSpeed && <LabelValue label="Speed" value={`${maxSpeed} Mbps`}/>}
                {numberOfPorts && <LabelValue label="Number of Ports" value={numberOfPorts}/>}
            </div>
        </>
    );
}
