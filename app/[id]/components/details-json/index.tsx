import {Card, CardContent} from "@/components/ui/card";
import {Device} from "@/components/types/device";
import React from "react";

export function DetailsJSON({device}: { device?: Device | null }) {
    const [showJSON, setShowJSON] = React.useState(false);
    const handleClick = (e: any) => {
        e.preventDefault();
        setShowJSON(!showJSON);
    }
    if (!device) return null;
    if (!showJSON) return <a className="text-sm text-gray-500" onClick={handleClick}>See All Details as JSON</a>

    return (
        <>
            <a className="text-sm text-gray-500" onClick={handleClick}>Hide</a>
            <Card className="col-span-2 rounded-3xl px-0 py-0">
                <CardContent className="rounded-3xl bg-gray-900 text-gray-100 p-4">
                <pre className="text-xs">
                    {JSON.stringify(device, null, 2)}
                </pre>
                </CardContent>
            </Card>
        </>
    )
}
