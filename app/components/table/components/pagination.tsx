import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useRouter} from "next/navigation";
import {useDevicesUI} from "@/components/state/DevicesUIContext";
import {apiLinkToPagePath} from "@/components/utils/helper";

export function Pagination() {
    const router = useRouter();
    const {response: { devices, meta, links }} = useDevicesUI();

    const prevPath = apiLinkToPagePath(links.prev);
    const nextPath = apiLinkToPagePath(links.next);
    return (
        <div className="border-t p-3 flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
                Page {meta?.page ?? 1} / {meta?.totalPages ?? 1} —
                Showing {devices.length} of {meta?.total ?? 0}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => prevPath && router.push(prevPath)}
                    disabled={!meta?.hasPrev}
                >
                    <ChevronLeft className="h-4 w-4"/>
                </Button>
                <div className="tabular-nums">{meta?.page ?? 1}</div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => nextPath && router.push(nextPath)}
                    disabled={!meta?.hasNext}
                >
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
}
